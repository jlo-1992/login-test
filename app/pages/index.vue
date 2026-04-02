<script setup lang="ts">
const { session } = useUserSession()
</script>

<template>
  <div class="flex h-150 flex-col items-center justify-center gap-y-3">
    <div>首頁</div>
    <div>現在時間 {{ Date.now() }}</div>
    <div>access_token {{ session?.token?.accessToken }}</div>
    <div>access_token_time {{ session?.token?.accessToken_time }}</div>
    <div>refresh_token {{ session?.token?.refreshToken }}</div>
    <div>refresh_token_time {{ session?.token?.refreshToken_time }}</div>

    <ol>
      <li>1. 切換自動登出\登入</li>
      <li>2. 切換重整或打api才會登入\登出</li>
      <li>3. 背景讀秒，自動登出</li>
      <li>4. 切換可在原視窗操作，直到換頁或打 api 才登出</li>
    </ol>
  </div>
</template>
