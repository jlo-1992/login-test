<script setup lang="ts">
definePageMeta({
  // layout: false,
})
</script>

<template>
  <div class="flex h-150 flex-col items-center justify-center gap-y-3">
    <div>首頁</div>
    <ol>
      <li>基礎登入功能</li>
      <li>頁面擋身份，導致首頁或登入頁</li>
      <li>重整 refresh token</li>
      <li>沒 token 重整自動登出，導至登入頁面</li>
      <li>背景讀秒自動登出</li>
    </ol>
  </div>
</template>
