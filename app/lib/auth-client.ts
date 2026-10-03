import { createAuthClient } from "better-auth/vue";

export const authClient = createAuthClient({
	baseURL: import.meta.client ? window.location.origin : undefined,
});
