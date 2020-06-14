import { EventEmitter } from 'events';

import { RESTManager, RESTOptions } from './RESTManager';
import { CDN } from './CDN';

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

export const enum APIRequestMethods {
	GET = 'get',
	DELETE = 'delete',
	PATCH = 'patch',
	PUT = 'put',
	POST = 'post',
}

export interface Request extends RequestOptions {
	method: APIRequestMethods;
	endpoint: string;
}

export const enum RESTManagerEvents {
	Debug = 'debug',
	Ratelimited = 'ratelimited',
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
		return this.manager.queueRequest({ ...options, method: APIRequestMethods.GET, endpoint });
	}

	/**
	 * Deletes data from the api
	 * @param endpoint The endpoint to delete from
	 * @param options The request options
	 */
	public delete(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.manager.queueRequest({ ...options, method: APIRequestMethods.DELETE, endpoint });
	}

	/**
	 * Patches data on the api
	 * @param endpoint The endpoint to patch
	 * @param options The request options
	 */
	public patch(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.manager.queueRequest({ ...options, method: APIRequestMethods.PATCH, endpoint });
	}

	/**
	 * Puts data into the api
	 * @param endpoint The endpoint to put in
	 * @param options The request options
	 */
	public put(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.manager.queueRequest({ ...options, method: APIRequestMethods.PUT, endpoint });
	}

	/**
	 * Posts to the api
	 * @param endpoint The endpoint to post to
	 * @param options The request options
	 */
	public post(endpoint: string, options: RequestOptions = {}): Promise<unknown> {
		return this.manager.queueRequest({ ...options, method: APIRequestMethods.POST, endpoint });
	}

}
