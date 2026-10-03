<script setup lang="ts">
defineProps<{
	title: string;
	description: string;
}>();
</script>

<template>
	<main class="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
		<Card class="w-full max-w-md">
			<CardHeader class="space-y-1">
				<CardTitle class="text-2xl">{{ title }}</CardTitle>
				<CardDescription>{{ description }}</CardDescription>
			</CardHeader>
			<CardContent>
				<slot />
			</CardContent>
		</Card>
	</main>
</template>
