<script setup lang="ts">
import { authClient } from "@/lib/auth-client";

definePageMeta({ layout: "public" });

const route = useRoute();
const email = ref(typeof route.query.email === "string" ? route.query.email : "");
const busy = ref(false);
const sent = ref(false);
const errorMessage = ref("");

async function resendVerification() {
	busy.value = true;
	errorMessage.value = "";
	try {
		const result = await authClient.sendVerificationEmail({
			email: email.value,
			callbackURL: "/console",
		});
		if (result.error) {
			errorMessage.value = result.error.message || "Unable to send a verification email.";
			return;
		}
		sent.value = true;
	} catch {
		errorMessage.value = "Unable to send a verification email. Please try again.";
	} finally {
		busy.value = false;
	}
}
</script>

<template>
	<AuthPanel title="Verify your email" description="Check your inbox for a verification link.">
		<div v-if="sent" class="space-y-4">
			<p class="text-sm text-muted-foreground" role="status">If this address has an account, a verification link will be sent.</p>
			<Button as-child class="w-full" variant="outline"><NuxtLink to="/login">Back to sign in</NuxtLink></Button>
		</div>
		<form v-else class="space-y-4" @submit.prevent="resendVerification">
			<div v-if="errorMessage" class="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
				{{ errorMessage }}
			</div>
			<div class="space-y-2">
				<Label for="email">Email</Label>
				<Input id="email" v-model="email" type="email" autocomplete="email" required />
			</div>
			<Button class="w-full" type="submit" :disabled="busy">
				{{ busy ? "Sending…" : "Resend verification email" }}
			</Button>
		</form>
	</AuthPanel>
</template>
