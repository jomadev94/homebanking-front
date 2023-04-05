<template>
  <main class="bg-gradient-to-br from-gray-900 to-blue-500 main-height p-6">
    <router-view></router-view>
  </main>
</template>

<style scoped>
.main-height {
  height: calc(100vh - 4rem);
  overflow: scroll;
}
</style>
