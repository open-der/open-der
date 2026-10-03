export default defineNuxtRouteMiddleware(async () => {
	try {
		await useRequestFetch()("/api/auth/session");
	} catch (error) {
		if (
			error &&
			typeof error === "object" &&
			"statusCode" in error &&
			(error.statusCode === 401 || error.statusCode === 403)
		) {
			return navigateTo("/login?redirect=/console");
		}
		throw error;
	}
});
