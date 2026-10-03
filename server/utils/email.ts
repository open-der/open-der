import { BrevoClient } from "@getbrevo/brevo";
import { Resend } from "resend";
import { createPlatformAdapter, type PlatformEnvironment } from "./platform";

interface TransactionalEmail {
	to: string;
	subject: string;
	html: string;
	text: string;
}

export async function sendTransactionalEmail(
	env: PlatformEnvironment,
	email: TransactionalEmail,
) {
	const { vars, secrets } = createPlatformAdapter(env);
	const sender = `${vars.EMAIL_SENDER_NAME} <${vars.EMAIL_SENDER_ADDRESS}>`;
	const senderDetails = {
		name: vars.EMAIL_SENDER_NAME,
		email: vars.EMAIL_SENDER_ADDRESS,
	};
	const errors: Error[] = [];

	if (secrets.RESEND_API_KEY) {
		try {
			const { error } = await new Resend(secrets.RESEND_API_KEY).emails.send(
				{
					from: sender,
					to: email.to,
					subject: email.subject,
					html: email.html,
					text: email.text,
				},
			);

			if (error) {
				throw new Error(`Resend rejected the email: ${error.message}`);
			}

			return;
		} catch (error) {
			errors.push(
				error instanceof Error ? error : new Error(String(error)),
			);
			console.warn("Resend email delivery failed; trying Brevo.");
		}
	}

	if (secrets.BREVO_API_KEY) {
		try {
			await new BrevoClient({
				apiKey: secrets.BREVO_API_KEY,
				maxRetries: 0,
			}).transactionalEmails.sendTransacEmail({
				sender: senderDetails,
				to: [{ email: email.to }],
				subject: email.subject,
				htmlContent: email.html,
				textContent: email.text,
			});
			return;
		} catch (error) {
			errors.push(error instanceof Error ? error : new Error(String(error)));
		}
	}

	if (errors.length > 0) {
		throw new AggregateError(errors, "All configured email providers failed.");
	}

	throw new Error("Configure RESEND_API_KEY or BREVO_API_KEY to send email.");
}
