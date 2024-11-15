<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
}

.app-container {
  width: 100%;
  height: 100vh;
  background: #1a4f2d;
  color: #fff;
  font-family: Arial, sans-serif;
}

button {
  cursor: pointer;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.3s ease;
}

button:hover {
  opacity: 0.9;
  transform: scale(1.05);
}
</style>
