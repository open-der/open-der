<script setup lang="ts">
import { ArrowRight, Globe2, ShieldCheck, SlidersHorizontal } from '@lucide/vue'

definePageMeta({ layout: 'public' })

const benefits = [
  { icon: Globe2, title: 'A name that travels', description: 'Use your domain for a portfolio, a project, or anything you are building.' },
  { icon: SlidersHorizontal, title: 'DNS in your hands', description: 'Point your domain where it needs to go with shared or custom nameservers.' },
  { icon: ShieldCheck, title: 'Clear ownership', description: 'Manage your domains and account from one straightforward dashboard.' },
]
</script>

<template>
  <div>
    <section class="border-b bg-muted/40">
      <div class="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="max-w-2xl">
          <p class="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-foreground"><Globe2 :size="16" />Your corner of the internet</p>
          <h1 class="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">A domain for every idea.</h1>
          <p class="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">Claim a free name on der.my.id and give your project, portfolio, or community a home of its own.</p>
          <div class="mt-8 flex flex-wrap gap-3">
            <Button as-child size="lg"><NuxtLink to="/register">Get started <ArrowRight :size="17" /></NuxtLink></Button>
            <Button as-child size="lg" variant="outline"><NuxtLink to="/about">How it works</NuxtLink></Button>
          </div>
        </div>
        <div class="relative mx-auto w-full max-w-md">
          <div class="relative rounded-lg border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
            <p class="text-sm font-medium text-muted-foreground">Your new address</p>
            <p class="mt-3 break-all font-heading text-3xl font-semibold tracking-tight sm:text-4xl"><span class="text-primary">yourname</span><span class="text-muted-foreground">.der.my.id</span></p>
            <div class="mt-8 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground sm:text-sm">
              <div class="rounded-md bg-muted px-2 py-3">Choose a name</div><div class="rounded-md bg-muted px-2 py-3">Make it yours</div><div class="rounded-md bg-muted px-2 py-3">Go live</div>
            </div>
          </div>
          <div class="absolute -bottom-2 -right-2 -z-10 size-16 rounded-full bg-primary/10 blur-xl" />
        </div>
      </div>
    </section>
    <section class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div class="max-w-xl"><p class="text-sm font-semibold text-primary">Built for your next thing</p><h2 class="mt-2 font-heading text-3xl font-semibold tracking-tight">Simple to start. Yours to shape.</h2></div>
      <div class="mt-10 grid gap-8 md:grid-cols-3">
        <article v-for="benefit in benefits" :key="benefit.title" class="flex gap-4">
          <div class="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><component :is="benefit.icon" :size="20" /></div>
          <div><h3 class="font-semibold">{{ benefit.title }}</h3><p class="mt-2 text-sm leading-6 text-muted-foreground">{{ benefit.description }}</p></div>
        </article>
      </div>
    </section>
    <section class="border-y bg-muted/40">
      <div class="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 sm:py-20 md:flex-row md:items-center">
        <div><h2 class="font-heading text-2xl font-semibold tracking-tight">Ready to put your name on it?</h2><p class="mt-2 text-muted-foreground">Create an account and start with your first domain.</p></div>
        <Button as-child><NuxtLink to="/register">Create your account <ArrowRight :size="16" /></NuxtLink></Button>
      </div>
    </section>
  </div>
</template>