const { ipcRenderer } = require("electron");

const projectStates = new Map();

async function loadProjects() {
  const projects = await ipcRenderer.invoke("scan-projects");
  const container = document.getElementById("projects");
  container.innerHTML = "";

  projects.forEach((project) => {
    const isRunning = projectStates.get(project.path);

    const div = document.createElement("div");
    div.className = "project-card";

    div.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h3 style="margin: 0">
            ${project.name}
            <button 
              class="btn-star ${project.isFavorite ? "active" : ""}"
              onclick="toggleFavorite('${project.path}')"
            >
              ${project.isFavorite ? "★" : "☆"}
            </button>
          </h3>
          <span class="status-tag ${
            isRunning ? "status-running" : "status-stopped"
          }">
            ${isRunning ? "运行中" : "已停止"}
          </span>
        </div>
        <button 
          class="btn ${isRunning ? "btn-danger" : "btn-primary"}"
          onclick="toggleProject('${project.path}', '${project.startCommand}')"
        >
          ${isRunning ? "停止" : "启动"}
        </button>
      </div>
      ${
        isRunning
          ? `<div class="output-container" id="output-${project.path}"></div>`
          : ""
      }
    `;

    container.appendChild(div);
  });
}

async function toggleProject(path, startCommand) {
  const isRunning = projectStates.get(path);

  if (isRunning) {
    await ipcRenderer.invoke("stop-project", path);
  } else {
    await ipcRenderer.invoke("start-project", { path, command: startCommand });
  }

  projectStates.set(path, !isRunning);
  loadProjects();
}

async function toggleFavorite(path) {
  await ipcRenderer.invoke("toggle-favorite", path);
  loadProjects();
}

ipcRenderer.on("project-output", (event, data) => {
  const outputDiv = document.getElementById(`output-${data.path}`);
  if (outputDiv) {
    const lines = data.output.split("\n");
    const formattedOutput = lines
      .map((line) => {
        if (line.includes("Local:") || line.includes("Network:")) {
          return `<div style="color: #67c23a; font-weight: bold; cursor: pointer;" onclick="window.open('${
            line.match(/http[s]?:\/\/[^\s]+/)[0]
          }')">${line}</div>`;
        }
        return `<div>${line}</div>`;
      })
      .join("");

    outputDiv.innerHTML += formattedOutput;
    outputDiv.scrollTop = outputDiv.scrollHeight;
  }
});

async function selectWorkDir() {
  const dir = await ipcRenderer.invoke("select-work-dir");
  if (dir) {
    await loadProjects();
  }
}

function renderHeader() {
  const header = document.createElement("div");
  header.className = "header";
  header.innerHTML = `
    <div class="header-content">
      <h2>NPM项目启动器</h2>
      <button class="btn btn-primary" onclick="selectWorkDir()">选择工作目录</button>
    </div>
  `;
  document.body.insertBefore(header, document.getElementById("projects"));
}

renderHeader();
loadProjects();

window.toggleProject = toggleProject;
window.toggleFavorite = toggleFavorite;
window.selectWorkDir = selectWorkDir;
