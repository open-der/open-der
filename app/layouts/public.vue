<script setup lang="ts">
import PublicFooter from '@/components/public/PublicFooter.vue'
import PublicHeader from '@/components/public/PublicHeader.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background text-foreground">
    <PublicHeader />
    <main class="flex-1"><slot /></main>
    <PublicFooter />
  </div>
</template>