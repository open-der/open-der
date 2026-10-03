<script setup lang="ts">
import { ArrowRight, Globe2, Menu, Monitor, Moon, Sun, X } from '@lucide/vue'
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const colorMode = useColorMode()
const theme = computed({
  get: () => colorMode.preference,
  set: (value: string) => {
    colorMode.preference = value
  },
})
const menuOpen = ref(false)
</script>

<template>
  <header class="relative z-20 border-b bg-background">
    <div class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-5 px-4 sm:px-6">
      <NuxtLink to="/" class="inline-flex shrink-0 items-center gap-2.5 font-heading text-lg font-semibold tracking-tight text-foreground" aria-label="der.my.id home">
        <span class="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground"><Globe2 :size="18" /></span>
        <span>der<span class="text-muted-foreground">.my.id</span></span>
      </NuxtLink>
      <nav class="hidden items-center gap-7 md:flex" aria-label="Main navigation">
        <NuxtLink to="/" class="text-sm text-muted-foreground transition-colors hover:text-foreground">Home</NuxtLink>
        <NuxtLink to="/about" class="text-sm text-muted-foreground transition-colors hover:text-foreground">About</NuxtLink>
      </nav>
      <div class="flex items-center gap-2 sm:gap-3">
        <ToggleGroup v-model="theme" type="single" variant="outline" size="sm" class="gap-0.5" aria-label="Color theme">
          <ToggleGroupItem value="system" aria-label="Use system theme" title="System theme"><Monitor :size="15" /></ToggleGroupItem>
          <ToggleGroupItem value="light" aria-label="Use light theme" title="Light theme"><Sun :size="15" /></ToggleGroupItem>
          <ToggleGroupItem value="dark" aria-label="Use dark theme" title="Dark theme"><Moon :size="15" /></ToggleGroupItem>
        </ToggleGroup>
        <Button as-child size="sm" class="hidden sm:inline-flex"><NuxtLink to="/register">Get started <ArrowRight :size="15" /></NuxtLink></Button>
        <Button class="md:hidden" :aria-expanded="menuOpen" aria-controls="mobile-navigation" :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'" variant="outline" size="icon" @click="menuOpen = !menuOpen">
          <X v-if="menuOpen" :size="18" /><Menu v-else :size="18" />
        </Button>
      </div>
      <nav v-if="menuOpen" id="mobile-navigation" class="absolute inset-x-4 top-[calc(100%+1px)] grid gap-1 rounded-md border bg-popover p-2 text-popover-foreground shadow-md md:hidden" aria-label="Mobile navigation">
        <NuxtLink to="/" class="rounded-sm px-3 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground" @click="menuOpen = false">Home</NuxtLink>
        <NuxtLink to="/about" class="rounded-sm px-3 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground" @click="menuOpen = false">About</NuxtLink>
        <NuxtLink to="/register" class="flex items-center justify-between rounded-sm px-3 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground" @click="menuOpen = false">Get started <ArrowRight :size="15" /></NuxtLink>
      </nav>
    </div>
  </header>
</template>