export interface PlatformBindings {
	D1: D1Database;
	KV: KVNamespace;
	R2: R2Bucket;
}

export interface PlatformVariables {
	APP_URL: string;
	EMAIL_SENDER_NAME: string;
	EMAIL_SENDER_ADDRESS: string;
	ADMIN_EMAIL?: string;
	GITHUB_CLIENT_ID?: string;
	DOMAIN_CLOUDFLARE_ZONE_ID?: string;
	DOMAIN_CLOUDFLARE_ACCOUNT_ID?: string;
	WORKERS_CLOUDFLARE_ACCOUNT_ID?: string;
	CLOUDFLARE_ACCOUNT_ID?: string;
}

export interface PlatformSecrets {
	BETTER_AUTH_SECRET: string;
	GITHUB_CLIENT_SECRET?: string;
	RESEND_API_KEY?: string;
	BREVO_API_KEY?: string;
	DOMAIN_CLOUDFLARE_API_TOKEN?: string;
	WORKERS_CLOUDFLARE_API_TOKEN?: string;
	CLOUDFLARE_API_TOKEN?: string;
}

export type PlatformEnvironment = PlatformBindings &
	PlatformVariables &
	PlatformSecrets;

export interface PlatformAdapter {
	bindings: PlatformBindings;
	vars: PlatformVariables;
	secrets: PlatformSecrets;
}

function isPlatformEnvironment(env: unknown): env is PlatformEnvironment {
	if (!env || typeof env !== "object") {
		return false;
	}

	const candidate = env as Record<string, unknown>;
	const d1 = candidate.D1;
	const kv = candidate.KV;
	const r2 = candidate.R2;
	const requiredStrings = [
		"APP_URL",
		"EMAIL_SENDER_NAME",
		"EMAIL_SENDER_ADDRESS",
		"BETTER_AUTH_SECRET",
	];

	if (
		!d1 ||
		typeof d1 !== "object" ||
		!("prepare" in d1) ||
		typeof d1.prepare !== "function" ||
		!("batch" in d1) ||
		typeof d1.batch !== "function" ||
		!kv ||
		typeof kv !== "object" ||
		!("get" in kv) ||
		typeof kv.get !== "function" ||
		!("put" in kv) ||
		typeof kv.put !== "function" ||
		!("delete" in kv) ||
		typeof kv.delete !== "function" ||
		!r2 ||
		typeof r2 !== "object" ||
		!("put" in r2) ||
		typeof r2.put !== "function" ||
		!("get" in r2) ||
		typeof r2.get !== "function"
	) {
		return false;
	}

	for (const key of requiredStrings) {
		if (typeof candidate[key] !== "string" || !candidate[key]) {
			return false;
		}
	}

	for (const key of [
		"ADMIN_EMAIL",
		"GITHUB_CLIENT_ID",
		"GITHUB_CLIENT_SECRET",
		"DOMAIN_CLOUDFLARE_ZONE_ID",
		"DOMAIN_CLOUDFLARE_ACCOUNT_ID",
		"WORKERS_CLOUDFLARE_ACCOUNT_ID",
		"CLOUDFLARE_ACCOUNT_ID",
		"RESEND_API_KEY",
		"BREVO_API_KEY",
		"DOMAIN_CLOUDFLARE_API_TOKEN",
		"WORKERS_CLOUDFLARE_API_TOKEN",
		"CLOUDFLARE_API_TOKEN",
	]) {
		if (candidate[key] !== undefined && typeof candidate[key] !== "string") {
			return false;
		}
	}

	return true;
}

export function getPlatformEnvironment(env: unknown): PlatformEnvironment {
	if (!isPlatformEnvironment(env)) {
		throw new Error(
			"Cloudflare bindings and required environment variables must be configured.",
		);
	}

	return env;
}

export function createPlatformAdapter(
	env: PlatformEnvironment,
): PlatformAdapter {
	return {
		bindings: {
			D1: env.D1,
			KV: env.KV,
			R2: env.R2,
		},
		vars: {
			APP_URL: env.APP_URL,
			EMAIL_SENDER_NAME: env.EMAIL_SENDER_NAME,
			EMAIL_SENDER_ADDRESS: env.EMAIL_SENDER_ADDRESS,
			ADMIN_EMAIL: env.ADMIN_EMAIL,
			GITHUB_CLIENT_ID: env.GITHUB_CLIENT_ID,
			DOMAIN_CLOUDFLARE_ZONE_ID: env.DOMAIN_CLOUDFLARE_ZONE_ID,
			DOMAIN_CLOUDFLARE_ACCOUNT_ID: env.DOMAIN_CLOUDFLARE_ACCOUNT_ID,
			WORKERS_CLOUDFLARE_ACCOUNT_ID: env.WORKERS_CLOUDFLARE_ACCOUNT_ID,
			CLOUDFLARE_ACCOUNT_ID: env.CLOUDFLARE_ACCOUNT_ID,
		},
		secrets: {
			BETTER_AUTH_SECRET: env.BETTER_AUTH_SECRET,
			GITHUB_CLIENT_SECRET: env.GITHUB_CLIENT_SECRET,
			RESEND_API_KEY: env.RESEND_API_KEY,
			BREVO_API_KEY: env.BREVO_API_KEY,
			DOMAIN_CLOUDFLARE_API_TOKEN: env.DOMAIN_CLOUDFLARE_API_TOKEN,
			WORKERS_CLOUDFLARE_API_TOKEN: env.WORKERS_CLOUDFLARE_API_TOKEN,
			CLOUDFLARE_API_TOKEN: env.CLOUDFLARE_API_TOKEN,
		},
	};
}
