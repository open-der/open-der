import { toWebRequest } from "h3";
import { createAuth } from "../../utils/auth";

export default defineEventHandler(async (event) => {
	const auth = createAuth(event.context.cloudflare.env);
	const result = await auth.api.getSession({
		headers: toWebRequest(event).headers,
	});

	if (!result || result.user.status !== "active") {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	if (result.user.role !== "user" && result.user.role !== "admin") {
		throw createError({ statusCode: 403, statusMessage: "Forbidden" });
	}

	return result;
});
