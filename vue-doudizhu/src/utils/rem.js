// 基准大小 100px
const baseSize = 100;
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750px 宽的缩放比例
  const scale = document.documentElement.clientWidth / 750;
  // 设置页面根节点字体大小（最小为50px，最大为100px）
  const fontSize = Math.min(Math.max(baseSize * scale, 50), 100);
  document.documentElement.style.fontSize = fontSize + "px";
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem();
};

// 添加页面显示/隐藏的监听，避免页面切换时计算错误
document.addEventListener("DOMContentLoaded", setRem);
document.addEventListener("visibilitychange", setRem);
