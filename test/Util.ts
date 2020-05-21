import ava from 'ava';
import { Routes } from '../src';

ava('sample test', (test): void => {
	test.is(Routes.oauthApplication(), '/oauth2/applications/@me');
});
