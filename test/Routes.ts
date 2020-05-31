import ava from 'ava';
import { Routes } from '../src';

const enum Assets {
	channel = '123456',
	user = '172839643197',
	message = '654321',
	emoji = '💩',
	role = '37198246',
	guild = '456789',
	overwrite = '725641',
	invite = 'abc123',
	webhook = '547896321',
	token = 'foobar',
	integration = '987654321'
}

ava('channel', (test): void => {
	test.is(Routes.channel(Assets.channel), `/channels/${Assets.channel}`);
});

ava('channelInvites', (test): void => {
	test.is(Routes.channelInvites(Assets.channel), `/channels/${Assets.channel}/invites`);
});

ava('channelMessage', (test): void => {
	test.is(Routes.channelMessage(Assets.channel, Assets.message), `/channels/${Assets.channel}/messages/${Assets.message}`);
});

ava('channelMessages', (test): void => {
	test.is(Routes.channelMessages(Assets.channel), `/channels/${Assets.channel}/messages`);
});

ava('channelPermissions', (test): void => {
	test.is(Routes.channelPermissions(Assets.channel, Assets.overwrite), `/channels/${Assets.channel}/permissions/${Assets.overwrite}`);
});

ava('channelPin', (test): void => {
	test.is(Routes.channelPin(Assets.channel, Assets.message), `/channels/${Assets.channel}/pins/${Assets.message}`);
});

ava('channelPins', (test): void => {
	test.is(Routes.channelPins(Assets.channel), `/channels/${Assets.channel}/pins`);
});

ava('channelTyping', (test): void => {
	test.is(Routes.channelTyping(Assets.channel), `/channels/${Assets.channel}/typing`);
});

ava('channelWebhooks', (test): void => {
	test.is(Routes.channelWebhooks(Assets.channel), `/channels/${Assets.channel}/webhooks`);
});
ava('crosspostMessage', (test): void => {
	test.is(Routes.crosspostMessage(Assets.channel, Assets.message), `/channels/${Assets.channel}/messages/${Assets.message}/crosspost`);
});

ava('dms', (test): void => {
	test.is(Routes.dms(), `/users/@me/channels`);
});

ava('followChannel', (test): void => {
	test.is(Routes.followChannel(Assets.channel), `/channels/${Assets.channel}/followers`);
});

ava('gateway', (test): void => {
	test.is(Routes.gateway(), `/gateway`);
});

ava('gatewayBot', (test): void => {
	test.is(Routes.gatewayBot(), `/gateway/bot`);
});

ava('groupDMRecipient', (test): void => {
	test.is(Routes.groupDMRecipient(Assets.channel, Assets.user), `/channels/${Assets.channel}/recipients/${Assets.user}`);
});

ava('guild', (test): void => {
	test.is(Routes.guild(Assets.guild), `/guilds/${Assets.guild}`);
});

ava('guildAuditLog', (test): void => {
	test.is(Routes.guildAuditLog(Assets.guild), `/guilds/${Assets.guild}/audit-logs`);
});

ava('guildBan', (test): void => {
	test.is(Routes.guildBan(Assets.guild, Assets.user), `/guilds/${Assets.guild}/bans/${Assets.user}`);
});

ava('guildBans', (test): void => {
	test.is(Routes.guildBans(Assets.guild), `/guilds/${Assets.guild}/bans`);
});

ava('guildChannels', (test): void => {
	test.is(Routes.guildChannels(Assets.guild), `/guilds/${Assets.guild}/channels`);
});

ava('guildEmoji', (test): void => {
	test.is(Routes.guildEmoji(Assets.guild, Assets.emoji), `/guilds/${Assets.guild}/emojis/${Assets.emoji}`);
});

ava('guildEmojis', (test): void => {
	test.is(Routes.guildEmojis(Assets.guild), `/guilds/${Assets.guild}/emojis`);
});

ava('guildIntegration', (test): void => {
	test.is(Routes.guildIntegration(Assets.guild, Assets.integration), `/guilds/${Assets.guild}/integrations/${Assets.integration}`);
});

ava('guildIntegrations', (test): void => {
	test.is(Routes.guildIntegrations(Assets.guild), `/guilds/${Assets.guild}/integrations`);
});

ava('guildIntegrationSync', (test): void => {
	test.is(Routes.guildIntegrationSync(Assets.guild, Assets.integration), `/guilds/${Assets.guild}/integrations/${Assets.integration}/sync`);
});

ava('guildInvites', (test): void => {
	test.is(Routes.guildInvites(Assets.guild), `/guilds/${Assets.guild}/invites`);
});

ava('guildMember', (test): void => {
	test.is(Routes.guildMember(Assets.guild, Assets.user), `/guilds/${Assets.guild}/members/${Assets.user}`);
});

ava('guildMemberNickname:default', (test): void => {
	test.is(Routes.guildMemberNickname(Assets.guild), `/guilds/${Assets.guild}/members/@me/nick`);
});

ava('guildMemberNickname', (test): void => {
	test.is(Routes.guildMemberNickname(Assets.guild, Assets.user), `/guilds/${Assets.guild}/members/${Assets.user}/nick`);
});

ava('guildMemberRole', (test): void => {
	test.is(Routes.guildMemberRole(Assets.guild, Assets.user, Assets.role), `/guilds/${Assets.guild}/members/${Assets.user}/roles/${Assets.role}`);
});

ava('guildMembers', (test): void => {
	test.is(Routes.guildMembers(Assets.guild), `/guilds/${Assets.guild}/members`);
});

ava('guildMembersSearch', (test): void => {
	test.is(Routes.guildMembersSearch(Assets.guild), `/guilds/${Assets.guild}/members/search`);
});

ava('guildPreview', (test): void => {
	test.is(Routes.guildPreview(Assets.guild), `/guilds/${Assets.guild}/preview`);
});

ava('guildPrune', (test): void => {
	test.is(Routes.guildPrune(Assets.guild), `/guilds/${Assets.guild}/prune`);
});

ava('guildRole', (test): void => {
	test.is(Routes.guildRole(Assets.guild, Assets.role), `/guilds/${Assets.guild}/roles/${Assets.role}`);
});

ava('guildRoles', (test): void => {
	test.is(Routes.guildRoles(Assets.guild), `/guilds/${Assets.guild}/roles`);
});

ava('guilds', (test): void => {
	test.is(Routes.guilds(), `/guilds`);
});

ava('guildVanityURL', (test): void => {
	test.is(Routes.guildVanityURL(Assets.guild), `/guilds/${Assets.guild}/vanity-url`);
});

ava('guildVoiceRegions', (test): void => {
	test.is(Routes.guildVoiceRegions(Assets.guild), `/guilds/${Assets.guild}/regions`);
});

ava('guildWebhooks', (test): void => {
	test.is(Routes.guildWebhooks(Assets.guild), `/guilds/${Assets.guild}/webhooks`);
});

ava('guildWidget', (test): void => {
	test.is(Routes.guildWidget(Assets.guild), `/guilds/${Assets.guild}/widget`);
});

ava('guildWidgetImage', (test): void => {
	test.is(Routes.guildWidgetImage(Assets.guild), `/guilds/${Assets.guild}/widget.png`);
});

ava('invite', (test): void => {
	test.is(Routes.invite(Assets.invite), `/invites/${Assets.invite}`);
});

ava('leaveGuild', (test): void => {
	test.is(Routes.leaveGuild(Assets.guild), `/users/@me/guilds/${Assets.guild}`);
});

ava('messageReaction', (test): void => {
	test.is(Routes.messageReaction(Assets.channel, Assets.message, Assets.emoji), `/channels/${Assets.channel}/messages/${Assets.message}/reactions/${Assets.emoji}`);
});

ava('messageReactions', (test): void => {
	test.is(Routes.messageReactions(Assets.channel, Assets.message), `/channels/${Assets.channel}/messages/${Assets.message}/reactions`);
});

ava('messageReactionUser:default', (test): void => {
	test.is(Routes.messageReactionUser(Assets.channel, Assets.message, Assets.emoji), `/channels/${Assets.channel}/messages/${Assets.message}/reactions/${Assets.emoji}/@me`);
});

ava('messageReactionUser', (test): void => {
	test.is(Routes.messageReactionUser(Assets.channel, Assets.message, Assets.emoji, Assets.user), `/channels/${Assets.channel}/messages/${Assets.message}/reactions/${Assets.emoji}/${Assets.user}`);
});

ava('oauthApplication', (test): void => {
	test.is(Routes.oauthApplication(), `/oauth2/applications/@me`);
});

ava('user:default', (test): void => {
	test.is(Routes.user(), `/users/@me`);
});

ava('user', (test): void => {
	test.is(Routes.user(Assets.user), `/users/${Assets.user}`);
});

ava('voiceRegions', (test): void => {
	test.is(Routes.voiceRegions(), `/voice/regions`);
});

ava('webhook', (test): void => {
	test.is(Routes.webhook(Assets.webhook), `/webhooks/${Assets.webhook}`);
});

ava('webhookGithub', (test): void => {
	test.is(Routes.webhookGithub(Assets.webhook, Assets.token), `/webhooks/${Assets.webhook}/${Assets.token}/github`);
});

ava('webhookSlack', (test): void => {
	test.is(Routes.webhookSlack(Assets.webhook, Assets.token), `/webhooks/${Assets.webhook}/${Assets.token}/slack`);
});

ava('webhookTokened', (test): void => {
	test.is(Routes.webhookTokened(Assets.webhook, Assets.token), `/webhooks/${Assets.webhook}/${Assets.token}`);
});
