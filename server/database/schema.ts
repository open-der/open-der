import { relations, sql } from "drizzle-orm";
import {
	check,
	index,
	integer,
	sqliteTable,
	text,
	uniqueIndex,
} from "drizzle-orm/sqlite-core";

const timestamps = {
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
};

export const user = sqliteTable(
	"user",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		email: text("email").notNull().unique(),
		emailVerified: integer("email_verified", { mode: "boolean" })
			.notNull()
			.default(false),
		image: text("image"),
		role: text("role").notNull().default("user"),
		status: text("status").notNull().default("active"),
		...timestamps,
	},
	(table) => [
		check("user_role_check", sql`${table.role} IN ('user', 'admin')`),
		check(
			"user_status_check",
			sql`${table.status} IN ('active', 'suspended', 'banned')`,
		),
	],
);

export const account = sqliteTable(
	"account",
	{
		id: text("id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		accessTokenExpiresAt: integer("access_token_expires_at", {
			mode: "timestamp",
		}),
		refreshTokenExpiresAt: integer("refresh_token_expires_at", {
			mode: "timestamp",
		}),
		scope: text("scope"),
		password: text("password"),
		...timestamps,
	},
	(table) => [index("account_user_id_idx").on(table.userId)],
);

export const session = sqliteTable(
	"session",
	{
		id: text("id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		token: text("token").notNull().unique(),
		expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		...timestamps,
	},
	(table) => [index("session_user_id_idx").on(table.userId)],
);

export const verification = sqliteTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
	...timestamps,
});

export const apiToken = sqliteTable(
	"api_token",
	{
		id: text("id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		name: text("name").notNull(),
		tokenHash: text("token_hash").notNull(),
		tokenPrefix: text("token_prefix").notNull(),
		lastUsedAt: integer("last_used_at", { mode: "timestamp" }),
		expiresAt: integer("expires_at", { mode: "timestamp" }),
		revokedAt: integer("revoked_at", { mode: "timestamp" }),
		...timestamps,
	},
	(table) => [
		uniqueIndex("api_token_token_hash_unique").on(table.tokenHash),
		index("api_token_user_id_idx").on(table.userId),
	],
);

export const contact = sqliteTable(
	"contact",
	{
		id: text("id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		name: text("name").notNull(),
		organization: text("organization"),
		email: text("email").notNull(),
		phone: text("phone"),
		address: text("address"),
		city: text("city"),
		state: text("state"),
		postalCode: text("postal_code"),
		country: text("country"),
		...timestamps,
	},
	(table) => [uniqueIndex("contact_user_id_unique").on(table.userId)],
);

export const domain = sqliteTable(
	"domain",
	{
		id: text("id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		name: text("name").notNull(),
		label: text("label").notNull(),
		status: text("status").notNull().default("pending"),
		dnsMode: text("dns_mode").notNull().default("shared"),
		approvedAt: integer("approved_at", { mode: "timestamp" }),
		suspendedAt: integer("suspended_at", { mode: "timestamp" }),
		revokedAt: integer("revoked_at", { mode: "timestamp" }),
		...timestamps,
	},
	(table) => [
		uniqueIndex("domain_name_unique").on(table.name),
		index("domain_user_id_idx").on(table.userId),
		check(
			"domain_status_check",
			sql`${table.status} IN ('pending', 'approved', 'rejected', 'suspended', 'revoked')`,
		),
		check(
			"domain_dns_mode_check",
			sql`${table.dnsMode} IN ('shared', 'custom')`,
		),
	],
);

export const domainSubmission = sqliteTable(
	"domain_submission",
	{
		id: text("id").primaryKey(),
		domainId: text("domain_id")
			.notNull()
			.references(() => domain.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		dnsMode: text("dns_mode").notNull(),
		status: text("status").notNull().default("pending"),
		reason: text("reason"),
		adminNote: text("admin_note"),
		reviewedBy: text("reviewed_by").references(() => user.id, {
			onDelete: "set null",
		}),
		reviewedAt: integer("reviewed_at", { mode: "timestamp" }),
		...timestamps,
	},
	(table) => [
		index("domain_submission_domain_id_idx").on(table.domainId),
		index("domain_submission_user_id_idx").on(table.userId),
		check(
			"domain_submission_dns_mode_check",
			sql`${table.dnsMode} IN ('shared', 'custom')`,
		),
		check(
			"domain_submission_status_check",
			sql`${table.status} IN ('pending', 'approved', 'rejected', 'cancelled')`,
		),
	],
);

export const domainNameserver = sqliteTable(
	"domain_nameserver",
	{
		id: text("id").primaryKey(),
		domainId: text("domain_id")
			.notNull()
			.references(() => domain.id, { onDelete: "cascade" }),
		nameserver: text("nameserver").notNull(),
		position: integer("position").notNull(),
		...timestamps,
	},
	(table) => [
		index("domain_nameserver_domain_id_idx").on(table.domainId),
		uniqueIndex("domain_nameserver_domain_position_unique").on(
			table.domainId,
			table.position,
		),
	],
);

export const domainEvent = sqliteTable(
	"domain_event",
	{
		id: text("id").primaryKey(),
		domainId: text("domain_id")
			.notNull()
			.references(() => domain.id, { onDelete: "cascade" }),
		actorUserId: text("actor_user_id").references(() => user.id, {
			onDelete: "set null",
		}),
		event: text("event").notNull(),
		fromStatus: text("from_status"),
		toStatus: text("to_status"),
		metadata: text("metadata", { mode: "json" }).$type<
			Record<string, unknown>
		>(),
		createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	},
	(table) => [
		index("domain_event_domain_id_idx").on(table.domainId),
		index("domain_event_actor_user_id_idx").on(table.actorUserId),
	],
);

export const auditLog = sqliteTable(
	"audit_log",
	{
		id: text("id").primaryKey(),
		actorUserId: text("actor_user_id").references(() => user.id, {
			onDelete: "set null",
		}),
		action: text("action").notNull(),
		entityType: text("entity_type").notNull(),
		entityId: text("entity_id"),
		metadata: text("metadata", { mode: "json" }).$type<
			Record<string, unknown>
		>(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	},
	(table) => [
		index("audit_log_actor_user_id_idx").on(table.actorUserId),
		index("audit_log_entity_idx").on(table.entityType, table.entityId),
	],
);

export const userRelations = relations(user, ({ many, one }) => ({
	accounts: many(account),
	sessions: many(session),
	apiTokens: many(apiToken),
	contact: one(contact),
	domains: many(domain),
	submissions: many(domainSubmission, { relationName: "submissionUser" }),
	reviewedSubmissions: many(domainSubmission, {
		relationName: "submissionReviewer",
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const apiTokenRelations = relations(apiToken, ({ one }) => ({
	user: one(user, { fields: [apiToken.userId], references: [user.id] }),
}));

export const contactRelations = relations(contact, ({ one }) => ({
	user: one(user, { fields: [contact.userId], references: [user.id] }),
}));

export const domainRelations = relations(domain, ({ many, one }) => ({
	user: one(user, { fields: [domain.userId], references: [user.id] }),
	submissions: many(domainSubmission),
	nameservers: many(domainNameserver),
	events: many(domainEvent),
}));

export const domainSubmissionRelations = relations(
	domainSubmission,
	({ one }) => ({
		domain: one(domain, {
			fields: [domainSubmission.domainId],
			references: [domain.id],
		}),
		user: one(user, {
			fields: [domainSubmission.userId],
			references: [user.id],
			relationName: "submissionUser",
		}),
		reviewer: one(user, {
			fields: [domainSubmission.reviewedBy],
			references: [user.id],
			relationName: "submissionReviewer",
		}),
	}),
);

export const domainNameserverRelations = relations(
	domainNameserver,
	({ one }) => ({
		domain: one(domain, {
			fields: [domainNameserver.domainId],
			references: [domain.id],
		}),
	}),
);

export const domainEventRelations = relations(domainEvent, ({ one }) => ({
	domain: one(domain, {
		fields: [domainEvent.domainId],
		references: [domain.id],
	}),
	actor: one(user, {
		fields: [domainEvent.actorUserId],
		references: [user.id],
	}),
}));

export const auditLogRelations = relations(auditLog, ({ one }) => ({
	actor: one(user, {
		fields: [auditLog.actorUserId],
		references: [user.id],
	}),
}));

export const schema = {
	user,
	account,
	session,
	verification,
	apiToken,
	contact,
	domain,
	domainSubmission,
	domainNameserver,
	domainEvent,
	auditLog,
	userRelations,
	accountRelations,
	sessionRelations,
	apiTokenRelations,
	contactRelations,
	domainRelations,
	domainSubmissionRelations,
	domainNameserverRelations,
	domainEventRelations,
	auditLogRelations,
};
