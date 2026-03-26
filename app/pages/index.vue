<script setup lang="ts"></script>

<template>
  <div class="p-5 flex flex-col gap-y-3">
    <div>首頁</div>
    <div class="flex gap-x-2">
      <UButton to="/guest-only">訪客專屬頁</UButton>
      <UButton to="/member-one">會員一</UButton>
      <UButton to="/member-two">會員二</UButton>
      <UButton to="/login">登入頁</UButton>
    </div>
    <ol>
      <li>基礎登入功能</li>
      <li>頁面擋身份，導致首頁或登入頁</li>
      <li>重整 refresh token</li>
      <li>沒 token 重整自動登出，導至登入頁面</li>
      <li>背景讀秒自動登出</li>
    </ol>
  </div>
</template>
