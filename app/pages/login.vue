<script setup lang="ts">
import { authClient } from "@/lib/auth-client";

definePageMeta({ layout: "public" });

const route = useRoute();
const email = ref("");
const password = ref("");
const busy = ref(false);
const errorMessage = ref("");

async function signIn() {
	busy.value = true;
	errorMessage.value = "";
	try {
		const result = await authClient.signIn.email({
			email: email.value,
			password: password.value,
			callbackURL: "/console",
		});
		if (result.error) {
			errorMessage.value = result.error.message || "Sign in failed.";
			return;
		}
		await navigateTo("/console");
	} catch {
		errorMessage.value = "Unable to sign in. Please try again.";
	} finally {
		busy.value = false;
	}
}

async function signInWithGitHub() {
	busy.value = true;
	errorMessage.value = "";
	try {
		const result = await authClient.signIn.social({
			provider: "github",
			callbackURL: "/console",
		});
		if (result.error) {
			errorMessage.value = result.error.message || "GitHub sign in failed.";
		}
	} catch {
		errorMessage.value = "Unable to sign in with GitHub. Please try again.";
	} finally {
		busy.value = false;
	}
}
</script>

<template>
	<AuthPanel title="Welcome back" description="Sign in to manage your der.my.id account.">
		<form class="space-y-4" @submit.prevent="signIn">
			<div v-if="route.query.registered === '1'" class="rounded-md border px-3 py-2 text-sm" role="status">
				Your account was created. Check your email to verify it before signing in.
			</div>
			<div v-if="errorMessage" class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
				{{ errorMessage }}
			</div>
			<div class="space-y-2">
				<Label for="email">Email</Label>
				<Input id="email" v-model="email" type="email" autocomplete="email" required />
			</div>
			<div class="space-y-2">
				<div class="flex items-center justify-between">
					<Label for="password">Password</Label>
					<NuxtLink to="/forgot-password" class="text-sm text-primary hover:underline">Forgot password?</NuxtLink>
				</div>
				<Input id="password" v-model="password" type="password" autocomplete="current-password" required />
			</div>
			<Button class="w-full" type="submit" :disabled="busy">
				{{ busy ? "Signing in…" : "Sign in" }}
			</Button>
			<Button class="w-full" type="button" variant="outline" :disabled="busy" @click="signInWithGitHub">
				Continue with GitHub
			</Button>
			<p class="text-center text-sm text-muted-foreground">
				Need to verify your email?
				<NuxtLink :to="{ path: '/verify-email', query: { email } }" class="text-primary hover:underline">Resend verification</NuxtLink>
			</p>
			<p class="text-center text-sm text-muted-foreground">
				Don't have an account?
				<NuxtLink to="/register" class="text-primary hover:underline">Create one</NuxtLink>
			</p>
		</form>
	</AuthPanel>
</template>
