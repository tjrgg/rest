/* eslint-disable no-invalid-this */
import ava from 'ava';
import nock = require('nock');
import { REST, RestOptionsDefaults, HTTPError, DiscordAPIError } from '../src';

const api = new REST({ timeout: 2000 });

api.token = 'A-Very-Fake-Token';

let resetAfter = 0;
let serverOutage = true;
let unexpected429 = true;
let unexpected429cf = true;

nock(`${RestOptionsDefaults.api}/v${RestOptionsDefaults.version}`)
	.replyDate()
	.get('/standard')
	.times(3)
	// eslint-disable-next-line prefer-arrow-callback
	.reply(function handler(): nock.ReplyFnResult {
		const response = Date.now() >= resetAfter ? 204 : 429;
		resetAfter = Date.now() + 250;
		if (response === 204) {
			return [204, undefined, {
				'x-ratelimit-limit': '1',
				'x-ratelimit-remaining': '0',
				'x-ratelimit-reset-after': ((resetAfter - Date.now()) / 1000).toString(),
				'x-ratelimit-bucket': '80c17d2f203122d936070c88c8d10f33',
				via: '1.1 google'
			}];
		} else {
			return [429, {
				limit: '1',
				remaining: '0',
				resetAfter: (resetAfter / 1000).toString(),
				bucket: '80c17d2f203122d936070c88c8d10f33',
				retryAfter: (resetAfter - Date.now()).toString()
			}, {
				'x-ratelimit-limit': '1',
				'x-ratelimit-remaining': '0',
				'x-ratelimit-reset-after': ((resetAfter - Date.now()) / 1000).toString(),
				'x-ratelimit-bucket': '80c17d2f203122d936070c88c8d10f33',
				'retry-after': (resetAfter - Date.now()).toString(),
				via: '1.1 google'
			}];
		}
	})
	.get('/triggerGlobal')
	// eslint-disable-next-line prefer-arrow-callback
	.reply(function handler(): nock.ReplyFnResult {
		return [
			204,
			{ test: true },
			{
				'x-ratelimit-global': 'true',
				'retry-after': '1000',
				via: '1.1 google'
			}
		];
	})
	.get('/regularRequest')
	// eslint-disable-next-line prefer-arrow-callback
	.reply(204, { test: true })
	.get('/unexpected')
	.times(2)
	// eslint-disable-next-line prefer-arrow-callback
	.reply(function handler(): nock.ReplyFnResult {
		if (unexpected429) {
			unexpected429 = false;
			return [429, undefined, {
				'retry-after': '1000',
				via: '1.1 google'
			}];
		} else {
			return [204, { test: true }];
		}
	})
	.get('/unexpected-cf')
	.times(2)
	// eslint-disable-next-line prefer-arrow-callback
	.reply(function handler(): nock.ReplyFnResult {
		if (unexpected429cf) {
			unexpected429cf = false;
			return [429, undefined, {
				'retry-after': '1'
			}];
		} else {
			return [204, { test: true }];
		}
	})
	.get('/temp')
	.times(2)
	// eslint-disable-next-line prefer-arrow-callback
	.reply(function handler(): nock.ReplyFnResult {
		if (serverOutage) {
			serverOutage = false;
			return [500];
		} else {
			return [204, { test: true }];
		}
	})
	.get('/outage')
	.times(2)
	.reply(500)
	.get('/slow')
	.times(2)
	.delay(3000)
	.reply(200)
	.get('/badRequest')
	.reply(403, { message: 'Missing Permissions', code: 50013 })
	.get('/malformedRequest')
	.reply(601);

ava('Handle standard ratelimits', async (test): Promise<void> => {
	test.plan(5);

	const [a, b, c] = [api.get('/standard'), api.get('/standard'), api.get('/standard')];

	test.deepEqual(await a, Buffer.alloc(0));
	const previous1 = Date.now();
	test.deepEqual(await b, Buffer.alloc(0));
	const previous2 = Date.now();
	test.deepEqual(await c, Buffer.alloc(0));
	const now = Date.now();
	test.true(previous2 >= previous1 + 250);
	test.true(now >= previous2 + 250);
});

ava('Handle global ratelimits', async (test): Promise<void> => {
	test.plan(3);

	test.deepEqual(await api.get('/triggerGlobal'), { test: true });
	const previous = Date.now();
	test.deepEqual(await api.get('/regularRequest'), { test: true });
	const now = Date.now();
	test.true(now >= previous + 1000);
});

ava('Handle unexpected 429', async (test): Promise<void> => {
	test.plan(2);

	const previous = Date.now();
	test.deepEqual(await api.get('/unexpected'), { test: true });
	const now = Date.now();
	test.true(now >= previous + 1000);
});

ava('Handle unexpected 429 cloudflare', async (test): Promise<void> => {
	test.plan(2);

	const previous = Date.now();
	test.deepEqual(await api.get('/unexpected-cf'), { test: true });
	const now = Date.now();
	test.true(now >= previous + 1000);
});

ava('Handle temp server outage', async (test): Promise<void> => {
	test.deepEqual(await api.get('/temp'), { test: true });
});

ava('perm server outage', async (test): Promise<void> => {
	await test.throwsAsync(api.get('/outage'), { instanceOf: HTTPError });
});

ava('server responding too slow', async (test): Promise<void> => {
	await test.throwsAsync(api.get('/slow'));
});

ava('Bad Request', async (test): Promise<void> => {
	await test.throwsAsync(api.get('/badRequest'), { instanceOf: DiscordAPIError, message: 'Missing Permissions' });
});

ava('malformedRequest', async (test): Promise<void> => {
	test.is(await api.get('/malformedRequest'), null);
});
