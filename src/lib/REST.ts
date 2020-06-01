import { EventEmitter } from 'events';
import { Snowflake } from '@klasa/snowflake';

import { RESTManager, RESTOptions } from './RESTManager';
import { CDN } from './CDN';

export interface RouteIdentifier {
	route: string;
	majorParameter: string;
}

export interface RequestOptions {
	query?: [string, unknown][];
	headers?: Record<string, unknown>;
	data?: any;
	files?: File[];
	reason?: string;
	auth?: boolean;
}

export interface File {
	name: string;
	file: Buffer;
}

export interface Request extends RequestOptions {
	method: string;
	endpoint: string;
}

/**
 * The route builder class
 */
export class REST extends EventEmitter {

	/**
	 * The CDN link builder
	 */
	public cdn: CDN;

	/**
	 * The rest manager for handling requests
	 */
	private manager: RESTManager;

	/**
	 * @param options The options for rest requests
	 */
	public constructor(options: Partial<RESTOptions> = {}) {
		super();
		this.manager = new RESTManager(this, options);
		this.cdn = new CDN(this.manager.options.cdn);
	}

	/**
	 * Set token for rest requests
	 */
	public set token(token: string) {
		this.manager.token = token;
	}

	/**
	 * Gets data from the api
	 * @param endpoint The endpoint to get from
	 * @param options The request options
	 */
	public get(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.manager.queueRequest(REST.generateRouteIdentifiers(endpoint, 'get'), { ...options, method: 'get', endpoint });
	}

	/**
	 * Deletes data from the api
	 * @param endpoint The endpoint to delete from
	 * @param options The request options
	 */
	public delete(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.manager.queueRequest(REST.generateRouteIdentifiers(endpoint, 'delete'), { ...options, method: 'delete', endpoint });
	}

	/**
	 * Patches data on the api
	 * @param endpoint The endpoint to patch
	 * @param options The request options
	 */
	public patch(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.manager.queueRequest(REST.generateRouteIdentifiers(endpoint, 'patch'), { ...options, method: 'patch', endpoint });
	}

	/**
	 * Puts data into the api
	 * @param endpoint The endpoint to put in
	 * @param options The request options
	 */
	public put(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.manager.queueRequest(REST.generateRouteIdentifiers(endpoint, 'put'), { ...options, method: 'put', endpoint });
	}

	/**
	 * Posts to the api
	 * @param endpoint The endpoint to post to
	 * @param options The request options
	 */
	public post(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.manager.queueRequest(REST.generateRouteIdentifiers(endpoint, 'post'), { ...options, method: 'post', endpoint });
	}

	/**
	 * Generalizes the endpoint into a api route with only "major parameters"
	 * @param endpoint The endpoint we are generalizing
	 */
	private static generateRouteIdentifiers(endpoint: string, method: string): RouteIdentifier {
		const result = /^\/(?:channels|guilds|webhooks)\/(\d{16,19})/.exec(endpoint);
		// If there is no major parameter, all requests should be bucketed together globally across the api
		const majorParameter = result ? result[1] : 'global';
		// Convert all specific ids to a general string so the route is generic
		const baseRoute = endpoint.replace(/\d{16,19}/g, ':id');

		// Add-on strings to split route identifiers apart where discord has made rate-limiting exceptions
		let exceptions = '';

		// Hard-Code Old Message Deletion Exception (2 week+ old messages are a different bucket)
		// https://github.com/discordapp/discord-api-docs/issues/1295
		if (method === 'delete' && baseRoute === '/channels/:id/messages/:id') {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const id = /\d{16,19}$/.exec(endpoint)![0];
			const snowflake = new Snowflake(id);
			if ((Date.now() - snowflake.timestamp) > 1000 * 60 * 60 * 24 * 14) exceptions += '[Delete Old Message]';
		}

		return { route: baseRoute + exceptions, majorParameter };
	}

}
