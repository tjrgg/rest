// eslint-disable-next-line @typescript-eslint/no-var-requires
const Package = require('../../../package.json');

import type { RESTOptions } from '../lib/RESTManager';

export const UserAgent = `DiscordBot (${Package.repository.url}, ${Package.version})`;

export const RestOptionsDefaults: Required<RESTOptions> = {
	userAgentAppendix: `Node.js/${process.version}`,
	offset: 50,
	retries: 1,
	timeout: 15000,
	version: 7,
	api: 'https://discord.com/api',
	cdn: 'https://cdn.discordapp.com'
};

export const Routes = {
	channel: (channelID: string): string => `/channels/${channelID}`,
	channelInvites: (channelID: string): string => `/channels/${channelID}/invites`,
	channelMessage: (channelID: string, messageID: string): string => `/channels/${channelID}/messages/${messageID}`,
	channelMessages: (channelID: string): string => `/channels/${channelID}/messages`,
	bulkDelete: (channelID: string): string => `/channels/${channelID}/messages/bulk-delete`,
	channelPermissions: (channelID: string, overwriteID: string): string => `/channels/${channelID}/permissions/${overwriteID}`,
	channelPin: (channelID: string, messageID: string): string => `/channels/${channelID}/pins/${messageID}`,
	channelPins: (channelID: string): string => `/channels/${channelID}/pins`,
	channelTyping: (channelID: string): string => `/channels/${channelID}/typing`,
	channelWebhooks: (channelID: string): string => `/channels/${channelID}/webhooks`,
	crosspostMessage: (channelID: string, messageID: string): string => `/channels/${channelID}/messages/${messageID}/crosspost`,
	dms: (): string => `/users/@me/channels`,
	followChannel: (channelID: string): string => `/channels/${channelID}/followers`,
	gateway: (): string => `/gateway`,
	gatewayBot: (): string => `/gateway/bot`,
	groupDMRecipient: (channelID: string, userID: string): string => `/channels/${channelID}/recipients/${userID}`,
	guild: (guildID: string): string => `/guilds/${guildID}`,
	guildAuditLog: (guildID: string): string => `/guilds/${guildID}/audit-logs`,
	guildBan: (guildID: string, userID: string): string => `/guilds/${guildID}/bans/${userID}`,
	guildBans: (guildID: string): string => `/guilds/${guildID}/bans`,
	guildChannels: (guildID: string): string => `/guilds/${guildID}/channels`,
	guildEmoji: (guildID: string, emojiID: string): string => `/guilds/${guildID}/emojis/${emojiID}`,
	guildEmojis: (guildID: string): string => `/guilds/${guildID}/emojis`,
	guildIntegration: (guildID: string, integrationID: string): string => `/guilds/${guildID}/integrations/${integrationID}`,
	guildIntegrations: (guildID: string): string => `/guilds/${guildID}/integrations`,
	guildIntegrationSync: (guildID: string, integrationID: string): string => `/guilds/${guildID}/integrations/${integrationID}/sync`,
	guildInvites: (guildID: string): string => `/guilds/${guildID}/invites`,
	guildMember: (guildID: string, userID: string): string => `/guilds/${guildID}/members/${userID}`,
	guildMemberNickname: (guildID: string, userID = '@me'): string => `/guilds/${guildID}/members/${userID}/nick`,
	guildMemberRole: (guildID: string, userID: string, roleID: string): string => `/guilds/${guildID}/members/${userID}/roles/${roleID}`,
	guildMembers: (guildID: string): string => `/guilds/${guildID}/members`,
	guildMembersSearch: (guildID: string): string => `/guilds/${guildID}/members/search`,
	guildPreview: (guildID: string): string => `/guilds/${guildID}/preview`,
	guildPrune: (guildID: string): string => `/guilds/${guildID}/prune`,
	guildRole: (guildID: string, roleID: string): string => `/guilds/${guildID}/roles/${roleID}`,
	guildRoles: (guildID: string): string => `/guilds/${guildID}/roles`,
	guilds: (): string => `/guilds`,
	guildVanityURL: (guildID: string): string => `/guilds/${guildID}/vanity-url`,
	guildVoiceRegions: (guildID: string): string => `/guilds/${guildID}/regions`,
	guildWebhooks: (guildID: string): string => `/guilds/${guildID}/webhooks`,
	guildWidget: (guildID: string): string => `/guilds/${guildID}/widget`,
	guildWidgetImage: (guildID: string): string => `/guilds/${guildID}/widget.png`,
	invite: (inviteCode: string): string => `/invites/${inviteCode}`,
	leaveGuild: (guildID: string): string => `/users/@me/guilds/${guildID}`,
	messageReaction: (channelID: string, messageID: string, emojiID: string): string => `/channels/${channelID}/messages/${messageID}/reactions/${emojiID}`,
	messageReactions: (channelID: string, messageID: string): string => `/channels/${channelID}/messages/${messageID}/reactions`,
	messageReactionUser: (channelID: string, messageID: string, emojiID: string, userID = '@me'): string => `/channels/${channelID}/messages/${messageID}/reactions/${emojiID}/${userID}`,
	oauthApplication: (): string => `/oauth2/applications/@me`,
	user: (userID = '@me'): string => `/users/${userID}`,
	voiceRegions: (): string => `/voice/regions`,
	webhook: (webhookID: string): string => `/webhooks/${webhookID}`,
	webhookGithub: (webhookID: string, webhookToken: string): string => `/webhooks/${webhookID}/${webhookToken}/github`,
	webhookSlack: (webhookID: string, webhookToken: string): string => `/webhooks/${webhookID}/${webhookToken}/slack`,
	webhookTokened: (webhookID: string, webhookToken: string): string => `/webhooks/${webhookID}/${webhookToken}`
};
