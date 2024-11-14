const {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  dialog,
} = require("electron");
const path = require("path");
const fs = require("fs-extra");
const { spawn } = require("child_process");

let mainWindow;
const runningProcesses = new Map();

// 使用用户数据目录来存储收藏配置
const favoritesPath = path.join(app.getPath("userData"), "favorites.json");

// 添加工作目录的存储和读取
const configPath = path.join(app.getPath("userData"), "config.json");

function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
  } catch {
    return { workDir: "" };
  }
}

function saveConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config));
}

let config = loadConfig();

// 读取收藏数据
function loadFavorites() {
  try {
    return new Set(JSON.parse(fs.readFileSync(favoritesPath, "utf8")));
  } catch {
    return new Set();
  }
}

// 保存收藏数据
function saveFavorites(favorites) {
  fs.writeFileSync(favoritesPath, JSON.stringify([...favorites]));
}

const favorites = loadFavorites();

// 清理所有运行的进程
function cleanupProcesses() {
  for (const [path, process] of runningProcesses.entries()) {
    try {
      // 获取进程的 PID
      const pid = process.pid;

      // 在 macOS 上使用 lsof 找到并关闭相关端口
      if (process.platform === "darwin") {
        require("child_process").execSync(
          `lsof -P -p ${pid} | grep LISTEN | awk '{print $2}' | xargs kill -9`,
          {
            stdio: "ignore",
          }
        );
      }

      process.kill("SIGTERM");
    } catch (err) {
      console.error(`清理进程失败: ${path}`, err);
    }
  }
  runningProcesses.clear();
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("src/index.html");

  // 监听窗口刷新
  mainWindow.webContents.on("did-start-loading", () => {
    cleanupProcesses();
  });
}

// 添加选择目录的 IPC 处理
ipcMain.handle("select-work-dir", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
    title: "选择工作目录",
  });

  if (!result.canceled) {
    config.workDir = result.filePaths[0];
    saveConfig(config);
    return config.workDir;
  }
  return null;
});

// 修改扫描项目的方法
ipcMain.handle("scan-projects", async () => {
  if (!config.workDir) {
    return [];
  }

  const projects = [];
  const dirs = await fs.readdir(config.workDir);

  for (const dir of dirs) {
    const fullPath = path.join(config.workDir, dir);
    const packageJsonPath = path.join(fullPath, "package.json");

    try {
      if (await fs.exists(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);
        const scripts = packageJson.scripts || {};

        let startCommand;
        if (scripts.dev) {
          startCommand = "dev";
        } else if (scripts.serve) {
          startCommand = "serve";
        } else if (scripts.start) {
          startCommand = "start";
        }

        if (startCommand) {
          projects.push({
            name: dir,
            path: fullPath,
            startCommand,
            isRunning: runningProcesses.has(fullPath),
            isFavorite: favorites.has(fullPath),
          });
        }
      }
    } catch (err) {
      console.error(`读取 ${dir} 失败:`, err);
    }
  }

  return projects.sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return 0;
  });
});

ipcMain.handle("start-project", async (event, { path, command }) => {
  if (runningProcesses.has(path)) {
    return { status: "already-running" };
  }

  // 使用完整的 npm 路径
  const npmPath = process.platform === "win32" ? "npm.cmd" : "npm";

  const npmProcess = spawn(npmPath, ["run", command], {
    cwd: path,
    shell: true,
    stdio: ["pipe", "pipe", "pipe"],
    env: {
      ...process.env,
      PATH: `/usr/local/bin:${process.env.PATH}`, // 确保能找到系统命令
      FORCE_COLOR: "true",
    },
    detached: false,
  });

  runningProcesses.set(path, npmProcess);

  return new Promise((resolve) => {
    let isStarted = false;

    npmProcess.stdout.on("data", (data) => {
      const output = data.toString();
      mainWindow.webContents.send("project-output", { path, output });

      // 检查是否成功启动
      if (
        !isStarted &&
        (output.includes("localhost:") || output.includes("127.0.0.1:"))
      ) {
        isStarted = true;
        // 验证端口是否真的在监听
        const portMatch = output.match(/:(\d+)/);
        if (portMatch) {
          const port = portMatch[1];
          require("child_process").exec(`lsof -i :${port}`, (error, stdout) => {
            if (!error && stdout) {
              console.log(`端口 ${port} 已成功启动`);
              mainWindow.webContents.send("project-output", {
                path,
                output: `\n✅ 服务已成功启动在端口 ${port}\n`,
              });
            } else {
              console.error(`端口 ${port} 启动失败`);
              mainWindow.webContents.send("project-error", {
                path,
                output: `\n❌ 端口 ${port} 启动失败\n`,
              });
            }
          });
        }
        resolve({ status: "started" });
      }
    });

    npmProcess.stderr.on("data", (data) => {
      const output = data.toString();
      mainWindow.webContents.send("project-error", { path, output });
    });

    npmProcess.on("error", (error) => {
      console.error("启动错误:", error);
      mainWindow.webContents.send("project-error", {
        path,
        output: `启动错误: ${error.message}`,
      });
      resolve({ status: "error", error: error.message });
    });

    // 设置超时
    setTimeout(() => {
      if (!isStarted) {
        resolve({ status: "timeout" });
      }
    }, 30000);
  });
});

ipcMain.handle("stop-project", async (event, path) => {
  const process = runningProcesses.get(path);
  if (process) {
    process.kill("SIGTERM");
    runningProcesses.delete(path);
    return { status: "stopped" };
  }
  return { status: "not-running" };
});

ipcMain.handle("toggle-favorite", async (event, projectPath) => {
  if (favorites.has(projectPath)) {
    favorites.delete(projectPath);
  } else {
    favorites.add(projectPath);
  }

  saveFavorites(favorites);
  return [...favorites];
});

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register("F12", () => {
    if (mainWindow) {
      mainWindow.webContents.toggleDevTools();
    }
  });
});

app.on("before-quit", () => {
  cleanupProcesses();
});

app.on("window-all-closed", () => {
  cleanupProcesses();
  globalShortcut.unregisterAll();
  if (process.platform !== "darwin") {
    app.quit();
  }
});
