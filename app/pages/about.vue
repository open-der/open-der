<script setup lang="ts">
import { ArrowRight, Globe2 } from '@lucide/vue'

definePageMeta({ layout: 'public' })

const steps = [
  { number: '01', title: 'Choose your name', description: 'Find a name that represents you or your project.' },
  { number: '02', title: 'Register it', description: 'Create an account and submit your domain request.' },
  { number: '03', title: 'Make it yours', description: 'Manage your domain and point it to your destination.' },
]
</script>

<template>
  <div>
    <section class="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[0.8fr_1.2fr] md:items-start">
      <div><p class="text-sm font-semibold text-primary">About der.my.id</p><h1 class="mt-3 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">A little space to build something big.</h1></div>
      <div class="max-w-2xl">
        <div class="flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary"><Globe2 :size="23" /></div>
        <p class="mt-5 text-lg leading-8 text-muted-foreground">der.my.id makes it easier to give your ideas a home on the internet. We provide free subdomains and the tools to manage ownership and DNS delegation without getting in the way of what you want to create.</p>
        <Button as-child class="mt-7"><NuxtLink to="/register">Get started <ArrowRight :size="16" /></NuxtLink></Button>
      </div>
    </section>
    <section class="border-y bg-muted/40">
      <div class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p class="text-sm font-semibold text-primary">How it works</p><h2 class="mt-2 font-heading text-3xl font-semibold tracking-tight">From idea to online</h2>
        <div class="mt-10 grid gap-8 md:grid-cols-3">
          <article v-for="step in steps" :key="step.number" class="border-t-2 border-primary pt-5">
            <p class="text-sm font-semibold text-muted-foreground">{{ step.number }}</p><h3 class="mt-3 text-lg font-semibold">{{ step.title }}</h3><p class="mt-2 text-sm leading-6 text-muted-foreground">{{ step.description }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>