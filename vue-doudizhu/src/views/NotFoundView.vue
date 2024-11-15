<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <p>抱歉，您访问的页面不存在</p>
      <div class="actions">
        <button @click="$router.push('/')">返回首页</button>
        <button @click="$router.go(-1)">返回上一页</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>

<style scoped>
.not-found {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #f5f5f5;
}

.content {
  padding: 20px;
}

h1 {
  font-size: 72px;
  color: #42b983;
  margin: 0;
}

p {
  font-size: 18px;
  color: #666;
  margin: 20px 0;
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #42b983;
  color: white;
  font-size: 16px;
}

button:hover {
  opacity: 0.9;
}
</style>
