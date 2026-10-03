<script setup lang="ts">
import { authClient } from "@/lib/auth-client";

definePageMeta({ layout: "public" });

const email = ref("");
const busy = ref(false);
const sent = ref(false);
const errorMessage = ref("");

async function requestReset() {
	busy.value = true;
	errorMessage.value = "";
	try {
		const result = await authClient.requestPasswordReset({
			email: email.value,
			redirectTo: "/reset-password",
		});
		if (result.error) {
			errorMessage.value = result.error.message || "Unable to send a reset email.";
			return;
		}
		sent.value = true;
	} catch {
		errorMessage.value = "Unable to send a reset email. Please try again.";
	} finally {
		busy.value = false;
	}
}
</script>

<template>
	<AuthPanel title="Reset your password" description="We'll email you a link to choose a new password.">
		<div v-if="sent" class="space-y-4">
			<p class="text-sm text-muted-foreground" role="status">If an account exists for that email, a password reset link is on its way.</p>
			<Button as-child class="w-full" variant="outline"><NuxtLink to="/login">Back to sign in</NuxtLink></Button>
		</div>
		<form v-else class="space-y-4" @submit.prevent="requestReset">
			<div v-if="errorMessage" class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
				{{ errorMessage }}
			</div>
			<div class="space-y-2">
				<Label for="email">Email</Label>
				<Input id="email" v-model="email" type="email" autocomplete="email" required />
			</div>
			<Button class="w-full" type="submit" :disabled="busy">
				{{ busy ? "Sending…" : "Send reset link" }}
			</Button>
		</form>
	</AuthPanel>
</template>
