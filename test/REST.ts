import ava from 'ava';
import nock = require('nock');
import { Snowflake } from '@klasa/snowflake';
import { REST, Routes, RestOptionsDefaults } from '../src';

const newSnowflake = Snowflake.generate().toString();

const api = new REST();

api.token = 'A-Very-Fake-Token';

nock(`${RestOptionsDefaults.api}/v${RestOptionsDefaults.version}`)
	.get('/simpleGet')
	.reply(200, { test: true })
	.delete('/simpleDelete')
	.reply(200, { test: true })
	.patch('/simplePatch')
	.reply(200, { test: true })
	.put('/simplePut')
	.reply(200, { test: true })
	.post('/simplePost')
	.reply(200, { test: true })
	.get('/getQuery')
	.query({ foo: 'bar', hello: 'world' })
	.reply(200, { test: true })
	.get('/getAuth')
	.times(3)
	.reply(200, function handler() {
		// eslint-disable-next-line no-invalid-this
		return { auth: this.req.headers.authorization?.[0] ?? null };
	})
	.get('/getReason')
	.times(3)
	.reply(200, function handler() {
		// eslint-disable-next-line no-invalid-this
		return { reason: this.req.headers['x-audit-log-reason']?.[0] ?? null };
	})
	.post('/postEcho')
	.reply(200, (__, body) => body)
	.post('/postAttachment')
	.times(3)
	.reply(200, (__, body) => ({ body: body.replace(/\r\n/g, '\n').replace(/-+\d+-*\n?/g, '').trim() }))
	.delete('/channels/339942739275677727/messages/392063687801700356')
	.reply(200, { test: true })
	.delete(`/channels/339942739275677727/messages/${newSnowflake}`)
	.reply(200, { test: true });

ava('simpleGet', async (test): Promise<void> => {
	test.deepEqual(await api.get('/simpleGet'), { test: true });
});

ava('simpleDelete', async (test): Promise<void> => {
	test.deepEqual(await api.delete('/simpleDelete'), { test: true });
});

ava('simplePatch', async (test): Promise<void> => {
	test.deepEqual(await api.patch('/simplePatch'), { test: true });
});

ava('simplePut', async (test): Promise<void> => {
	test.deepEqual(await api.put('/simplePut'), { test: true });
});

ava('simplePost', async (test): Promise<void> => {
	test.deepEqual(await api.post('/simplePost'), { test: true });
});

ava('getQuery', async (test): Promise<void> => {
	test.deepEqual(await api.get('/getQuery', { query: [['foo', 'bar'], ['hello', 'world']] }), { test: true });
});

ava('getAuth:default', async (test): Promise<void> => {
	test.deepEqual(await api.get('/getAuth'), { auth: 'Bot A-Very-Fake-Token' });
});

ava('getAuth:false', async (test): Promise<void> => {
	test.deepEqual(await api.get('/getAuth', { auth: false }), { auth: null });
});

ava('getAuth:true', async (test): Promise<void> => {
	test.deepEqual(await api.get('/getAuth', { auth: true }), { auth: 'Bot A-Very-Fake-Token' });
});

ava('getReason:default', async (test): Promise<void> => {
	test.deepEqual(await api.get('/getReason'), { reason: null });
});

ava('getReason:plain-text', async (test): Promise<void> => {
	test.deepEqual(await api.get('/getReason', { reason: 'Hello' }), { reason: 'Hello' });
});

ava('getReason:encoded', async (test): Promise<void> => {
	test.deepEqual(await api.get('/getReason', { reason: '😄' }), { reason: '%F0%9F%98%84' });
});

ava('postAttachment:no-files', async (test): Promise<void> => {
	test.deepEqual(await api.post('/postAttachment', { files: [] }), {
		body: ''
	});
});

ava('postAttachment:files', async (test): Promise<void> => {
	// @ts-expect-error
	test.deepEqual(await api.post('/postAttachment', { files: [{ name: 'out.txt', file: Buffer.from('Hello') }, { name: 'justAName.txt' }] }), {
		body: [
			'Content-Disposition: form-data; name="out.txt"; filename="out.txt"',
			'Content-Type: text/plain',
			'',
			'Hello'
		].join('\n')
	});
});

ava('postAttachment:files-and-json', async (test): Promise<void> => {
	test.deepEqual(await api.post('/postAttachment', { files: [{ name: 'out.txt', file: Buffer.from('Hello') }], data: { foo: 'bar' } }), {
		body: [
			'Content-Disposition: form-data; name="out.txt"; filename="out.txt"',
			'Content-Type: text/plain',
			'',
			'Hello',
			'Content-Disposition: form-data; name="payload_json"',
			'',
			'{"foo":"bar"}'
		].join('\n')
	});
});

ava('postEcho', async (test): Promise<void> => {
	test.deepEqual(await api.post('/postEcho', { data: { foo: 'bar' } }), { foo: 'bar' });
});

ava('Old Message Delete Edge-Case:old message', async (test): Promise<void> => {
	test.deepEqual(await api.delete(Routes.channelMessage('339942739275677727', '392063687801700356')), { test: true });
});

ava('Old Message Delete Edge-Case:new message', async (test): Promise<void> => {
	test.deepEqual(await api.delete(Routes.channelMessage('339942739275677727', newSnowflake)), { test: true });
});
