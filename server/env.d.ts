/// <reference types="../_cloudflare/env.d.ts" />

import type {
	PlatformBindings,
	PlatformSecrets,
	PlatformVariables,
} from "./utils/platform";

declare global {
	interface Env extends PlatformBindings, PlatformVariables, PlatformSecrets {}
}

export {};
