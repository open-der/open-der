<template>
  <footer class="border-t bg-background">
    <div class="mx-auto flex min-h-16 w-full max-w-6xl flex-col justify-center gap-3 px-4 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <NuxtLink to="/" class="font-heading font-semibold tracking-tight text-foreground">der<span class="text-muted-foreground">.my.id</span></NuxtLink>
      <nav class="flex items-center gap-5 text-muted-foreground" aria-label="Footer navigation">
        <NuxtLink to="/about" class="transition-colors hover:text-foreground">About</NuxtLink>
        <span>© {{ new Date().getFullYear() }} der.my.id</span>
      </nav>
    </div>
  </footer>
</template>