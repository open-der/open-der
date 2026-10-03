<script setup lang="ts">
import { authClient } from "@/lib/auth-client";

definePageMeta({ layout: "public" });

const route = useRoute();
const password = ref("");
const confirmPassword = ref("");
const busy = ref(false);
const complete = ref(false);
const errorMessage = ref("");

async function resetPassword() {
	errorMessage.value = "";
	if (password.value !== confirmPassword.value) {
		errorMessage.value = "Passwords do not match.";
		return;
	}
	const token = route.query.token;
	if (typeof token !== "string" || !token) {
		errorMessage.value = "This reset link is invalid or has expired.";
		return;
	}

	busy.value = true;
	try {
		const result = await authClient.resetPassword({
			newPassword: password.value,
			token,
		});
		if (result.error) {
			errorMessage.value = result.error.message || "Unable to reset your password.";
			return;
		}
		complete.value = true;
	} catch {
		errorMessage.value = "Unable to reset your password. Please request a new link.";
	} finally {
		busy.value = false;
	}
}
</script>

<template>
	<AuthPanel title="Choose a new password" description="Use at least 8 characters for your new password.">
		<div v-if="complete" class="space-y-4">
			<p class="text-sm text-muted-foreground" role="status">Your password has been updated.</p>
			<Button as-child class="w-full"><NuxtLink to="/login">Sign in</NuxtLink></Button>
		</div>
		<form v-else class="space-y-4" @submit.prevent="resetPassword">
			<div v-if="errorMessage" class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
				{{ errorMessage }}
			</div>
			<div class="space-y-2">
				<Label for="password">New password</Label>
				<Input id="password" v-model="password" type="password" autocomplete="new-password" minlength="8" required />
			</div>
			<div class="space-y-2">
				<Label for="confirm-password">Confirm password</Label>
				<Input id="confirm-password" v-model="confirmPassword" type="password" autocomplete="new-password" minlength="8" required />
			</div>
			<Button class="w-full" type="submit" :disabled="busy">
				{{ busy ? "Updating…" : "Update password" }}
			</Button>
		</form>
	</AuthPanel>
</template>
