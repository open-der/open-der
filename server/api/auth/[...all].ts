import { toWebRequest } from "h3";
import { createAuth } from "../../utils/auth";

export default defineEventHandler((event) => {
	const auth = createAuth(event.context.cloudflare.env);
	return auth.handler(toWebRequest(event));
});
