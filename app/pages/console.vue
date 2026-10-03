<script setup lang="ts">
import { authClient } from "@/lib/auth-client";

definePageMeta({
	layout: "public",
	middleware: "auth",
});

interface AuthenticatedSession {
	session: {
		expiresAt: string;
	};
	user: {
		id: string;
		name: string;
		email: string;
		role: "admin" | "user";
		status: string;
	};
}

const { data: result, error } = await useRequestFetch()<AuthenticatedSession>(
	"/api/auth/session",
);

if (error.value || !result.value) {
	throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
}

const auth = computed(() => result.value!);
const busy = ref(false);
const errorMessage = ref("");

async function signOut() {
	busy.value = true;
	errorMessage.value = "";
	try {
		const result = await authClient.signOut();
		if (result.error) {
			errorMessage.value = result.error.message || "Unable to sign out.";
			return;
		}
		await navigateTo("/login");
	} catch {
		errorMessage.value = "Unable to sign out. Please try again.";
	} finally {
		busy.value = false;
	}
}
</script>

<template>
	<main class="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
		<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
			<div>
				<p class="text-sm font-medium text-primary">OpenDer Console</p>
				<h1 class="mt-1 font-heading text-3xl font-semibold tracking-tight">Welcome, {{ auth.user.name }}</h1>
				<p class="mt-2 text-muted-foreground">Manage your account and domains from one place.</p>
			</div>
			<Button variant="outline" :disabled="busy" @click="signOut">
				{{ busy ? "Signing out…" : "Sign out" }}
			</Button>
		</div>

		<div v-if="errorMessage" class="mt-6 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
			{{ errorMessage }}
		</div>

		<div class="mt-8 grid gap-4 md:grid-cols-2">
			<Card>
				<CardHeader>
					<CardTitle>Account</CardTitle>
					<CardDescription>Your signed-in profile.</CardDescription>
				</CardHeader>
				<CardContent class="space-y-3">
					<div>
						<p class="text-sm text-muted-foreground">Name</p>
						<p class="font-medium">{{ auth.user.name }}</p>
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Email</p>
						<p class="font-medium">{{ auth.user.email }}</p>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Access</CardTitle>
					<CardDescription>Account role and status.</CardDescription>
				</CardHeader>
				<CardContent class="space-y-3">
					<div>
						<p class="text-sm text-muted-foreground">Role</p>
						<p class="font-medium capitalize">{{ auth.user.role }}</p>
					</div>
					<div>
						<p class="text-sm text-muted-foreground">Status</p>
						<p class="font-medium capitalize">{{ auth.user.status }}</p>
					</div>
				</CardContent>
			</Card>
		</div>

		<Card class="mt-4">
			<CardHeader>
				<CardTitle>Your domains</CardTitle>
				<CardDescription>Domain management will be available here.</CardDescription>
			</CardHeader>
			<CardContent>
				<p class="text-sm text-muted-foreground">You are signed in and can use the console as a {{ auth.user.role }}.</p>
			</CardContent>
		</Card>
	</main>
</template>
