import ava from 'ava';
import { CDN } from '../src';

const base = 'https://klasa.js.org';
const id = '123456';
const hash = 'abcdef';
const animatedHash = 'a_bcdef';
const discriminator = 1234;

const cdn = new CDN(base);

ava('appAsset:default', (test): void => {
	test.is(cdn.appAsset(id, hash), `${base}/app-assets/${id}/${hash}.png`);
});

ava('appIcon:default', (test): void => {
	test.is(cdn.appIcon(id, hash), `${base}/app-icons/${id}/${hash}.png`);
});

ava('defaultAvatar:default', (test): void => {
	test.is(cdn.defaultAvatar(discriminator), `${base}/embed/avatars/${discriminator}.png`);
});

ava('discoverySplash:default', (test): void => {
	test.is(cdn.discoverySplash(id, hash), `${base}/discovery-splashes/${id}/${hash}.png`);
});

ava('emoji:default', (test): void => {
	test.is(cdn.emoji(id), `${base}/emojis/${id}.png`);
});

ava('emoji', (test): void => {
	test.is(cdn.emoji(id, 'gif'), `${base}/emojis/${id}.gif`);
});

ava('emoji:throws on invalid extension', (test): void => {
	// eslint-ignore-next-line ban-ts-comments
	// @ts-expect-error
	test.throws(() => cdn.emoji(id, 'tif'), { instanceOf: RangeError });
});

ava('groupDMIcon:default', (test): void => {
	test.is(cdn.groupDMIcon(id, hash), `${base}/channel-icons/${id}/${hash}.png`);
});

ava('guildBanner:default', (test): void => {
	test.is(cdn.guildBanner(id, hash), `${base}/banners/${id}/${hash}.png`);
});

ava('guildIcon:default', (test): void => {
	test.is(cdn.guildIcon(id, hash), `${base}/icons/${id}/${hash}.png`);
});

ava('splash:default', (test): void => {
	test.is(cdn.splash(id, hash), `${base}/splashes/${id}/${hash}.png`);
});

ava('teamIcon:default', (test): void => {
	test.is(cdn.teamIcon(id, hash), `${base}/team-icons/${id}/${hash}.png`);
});

ava('userAvatar:default', (test): void => {
	test.is(cdn.userAvatar(id, animatedHash), `${base}/avatars/${id}/${animatedHash}.png`);
});

ava('userAvatar:dynamic-animated', (test): void => {
	test.is(cdn.userAvatar(id, animatedHash, { dynamic: true }), `${base}/avatars/${id}/${animatedHash}.gif`);
});

ava('userAvatar:dynamic-not-animated', (test): void => {
	test.is(cdn.userAvatar(id, hash, { dynamic: true }), `${base}/avatars/${id}/${hash}.png`);
});

ava('makeURL:throws on invalid size', (test): void => {
	// eslint-ignore-next-line ban-ts-comments
	// @ts-expect-error
	test.throws(() => cdn.userAvatar(id, animatedHash, { size: 5 }), { instanceOf: RangeError });
});

ava('makeURL:throws on invalid extension', (test): void => {
	// eslint-ignore-next-line ban-ts-comments
	// @ts-expect-error
	test.throws(() => cdn.userAvatar(id, animatedHash, { extension: 'tif' }), { instanceOf: RangeError });
});

ava('makeURL:valid size', (test): void => {
	test.is(cdn.userAvatar(id, animatedHash, { size: 512 }), `${base}/avatars/${id}/${animatedHash}.png?size=512`);
});
