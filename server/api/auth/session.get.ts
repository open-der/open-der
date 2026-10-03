import { toWebRequest } from "h3";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { schema } from "../../database/schema";
import { createAuth } from "../../utils/auth";
import { getPlatformEnvironment } from "../../utils/platform";

export default defineEventHandler(async (event) => {
	const env = getPlatformEnvironment(event.context.cloudflare.env);
	const auth = createAuth(env);
	const result = await auth.api.getSession({
		headers: toWebRequest(event).headers,
	});

	if (!result) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	const db = drizzle(env.D1, { schema });
	const user = await db.query.user.findFirst({
		columns: { role: true, status: true },
		where: eq(schema.user.id, result.user.id),
	});

	if (!user || user.status !== "active") {
		throw createError({ statusCode: 403, statusMessage: "Account is inactive." });
	}

	if (user.role !== "user" && user.role !== "admin") {
		throw createError({ statusCode: 403, statusMessage: "Forbidden" });
	}

	return {
		...result,
		user: {
			...result.user,
			role: user.role,
			status: user.status,
		},
	};
});
