<script setup lang="ts">
import { authClient } from "@/lib/auth-client";

definePageMeta({ layout: "public" });

const name = ref("");
const email = ref("");
const password = ref("");
const busy = ref(false);
const errorMessage = ref("");

async function register() {
	busy.value = true;
	errorMessage.value = "";
	try {
		const result = await authClient.signUp.email({
			name: name.value,
			email: email.value,
			password: password.value,
			callbackURL: "/console",
		});
		if (result.error) {
			errorMessage.value = result.error.message || "Unable to create your account.";
			return;
		}
		await navigateTo({ path: "/login", query: { registered: "1" } });
	} catch {
		errorMessage.value = "Unable to create your account. Please try again.";
	} finally {
		busy.value = false;
	}
}
</script>

<template>
	<AuthPanel title="Create an account" description="Sign up to claim and manage your der.my.id domain.">
		<form class="space-y-4" @submit.prevent="register">
			<div v-if="errorMessage" class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
				{{ errorMessage }}
			</div>
			<div class="space-y-2">
				<Label for="name">Name</Label>
				<Input id="name" v-model="name" autocomplete="name" required />
			</div>
			<div class="space-y-2">
				<Label for="email">Email</Label>
				<Input id="email" v-model="email" type="email" autocomplete="email" required />
			</div>
			<div class="space-y-2">
				<Label for="password">Password</Label>
				<Input id="password" v-model="password" type="password" autocomplete="new-password" minlength="8" required />
			</div>
			<Button class="w-full" type="submit" :disabled="busy">
				{{ busy ? "Creating account…" : "Create account" }}
			</Button>
			<p class="text-center text-sm text-muted-foreground">
				Already registered?
				<NuxtLink to="/login" class="text-primary hover:underline">Sign in</NuxtLink>
			</p>
		</form>
	</AuthPanel>
</template>
