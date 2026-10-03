import { toWebRequest } from "h3";
import { createAuth } from "../../utils/auth";
import { getPlatformEnvironment } from "../../utils/platform";

export default defineEventHandler((event) => {
	const env = getPlatformEnvironment(event.context.cloudflare.env);
	const auth = createAuth(env);
	return auth.handler(toWebRequest(event));
});
