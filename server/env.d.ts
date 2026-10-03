/// <reference types="../_cloudflare/env.d.ts" />

import type {
	PlatformEnvironment,
} from "./utils/platform";

declare global {
	interface Env extends PlatformEnvironment {}
}

export {};
