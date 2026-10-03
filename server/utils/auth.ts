import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import { schema } from "../database/schema";
import { sendTransactionalEmail } from "./email";
import { createPlatformAdapter } from "./platform";

export function createAuth(env: Env) {
	const { bindings, vars, secrets } = createPlatformAdapter(env);

	if (!secrets.BETTER_AUTH_SECRET) {
		throw new Error("BETTER_AUTH_SECRET must be configured.");
	}

	const githubClientId = vars.GITHUB_CLIENT_ID;
	const githubClientSecret = secrets.GITHUB_CLIENT_SECRET;
	if (Boolean(githubClientId) !== Boolean(githubClientSecret)) {
		throw new Error(
		"GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must be configured together.",
		);
	}

	const db = drizzle(bindings.D1, { schema });
	const socialProviders =
		githubClientId && githubClientSecret
		? {
			github: {
				clientId: githubClientId,
				clientSecret: githubClientSecret,
			},
		}
		: {};

	return betterAuth({
		baseURL: vars.APP_URL,
		secret: secrets.BETTER_AUTH_SECRET,
		database: drizzleAdapter(db, {
			provider: "sqlite",
			schema: {
				user: schema.user,
				account: schema.account,
				session: schema.session,
				verification: schema.verification,
			},
		}),
		secondaryStorage: {
			get: (key) => bindings.KV.get(key),
			set: async (key, value, ttl) => {
				if (ttl === undefined) {
					await bindings.KV.put(key, value);
					return;
				}

				await bindings.KV.put(key, value, {
					expirationTtl: Math.max(60, Math.ceil(ttl)),
				});
			},
			delete: (key) => bindings.KV.delete(key),
		},
		emailAndPassword: {
			enabled: true,
			requireEmailVerification: true,
			sendResetPassword: async ({ user, url }) => {
				await sendTransactionalEmail(env, {
					to: user.email,
					subject: "Reset your OpenDer password",
					text: `Reset your password by visiting this link: ${url}`,
					html: `<p>Hello ${escapeHtml(user.name)},</p><p>Reset your OpenDer password by clicking <a href="${escapeHtml(url)}">this link</a>.</p><p>If you did not request this, you can ignore this email.</p>`,
				});
			},
		},
		socialProviders,
		user: {
			additionalFields: {
				role: {
					type: "string",
					required: false,
					defaultValue: "user",
					input: false,
				},
				status: {
					type: "string",
					required: false,
					defaultValue: "active",
					input: false,
				},
			},
		},
		session: {
			storeSessionInDatabase: false,
		},
		verification: {
			storeInDatabase: true,
		},
		emailVerification: {
			sendOnSignUp: true,
			sendOnSignIn: true,
			autoSignInAfterVerification: true,
			sendVerificationEmail: async ({ user, url }) => {
				await sendTransactionalEmail(env, {
					to: user.email,
					subject: "Verify your OpenDer email",
					text: `Verify your email address by visiting this link: ${url}`,
					html: `<p>Hello ${escapeHtml(user.name)},</p><p>Verify your email address by clicking <a href="${escapeHtml(url)}">this link</a>.</p>`,
				});
			},
		},
	});
}

function escapeHtml(value: string) {
	return value.replace(/[&<>"']/g, (character) => {
		const entities: Record<string, string> = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
		};
		return entities[character];
	});
}
