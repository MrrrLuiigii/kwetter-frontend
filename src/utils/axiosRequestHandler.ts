import axios, { AxiosResponse, AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import BadRequestException from "./exceptions/badRequest.exception";
import HttpException from "./exceptions/httpException";
import InternalServerException from "./exceptions/internalServer.exception";
import UnauthorizedException from "./exceptions/unauthorized.exception";
import store from "@/store/index";

class AxiosRequestHandler {
	private static api = axios.create({
		baseURL: process.env.VUE_APP_GATEWAY_HOST,
		headers: {
			Authorization: AxiosRequestHandler.getAuthHeaders()
		}
	});

	private static getAuthHeaders() {
		if (store.getters.getUser) {
			const authHeaders = "Bearer " + store.getters.getUser.token;
			if (this.api) this.api.defaults.headers["Authorization"] = authHeaders;
			return authHeaders;
		} else if (this.api) delete this.api.defaults.headers["Authorization"];
	}

	public static get(
		url: string,
		pagination?: { skip: number; take: number }
	): any {
		this.getAuthHeaders();
		return this.api
			.get(
				url,
				pagination
					? {
							params: {
								skip: pagination.skip,
								take: pagination.take
							}
					  }
					: {}
			)
			.then((res: AxiosResponse) => {
				if (!this.checkResponseOK(res))
					throw this.checkStatusCode(res.status, res.data);
				return res;
			})
			.catch((err: AxiosError) => {
				if (err.response) {
					throw this.checkStatusCode(
						err.response.status,
						err.response.data.message
					);
				}
			});
	}

	public static post(url: string, object: any): any {
		this.getAuthHeaders();
		return this.api
			.post(url, object)
			.then((res: AxiosResponse) => {
				if (!this.checkResponseOK(res))
					throw this.checkStatusCode(res.status, res.data);
				return res;
			})
			.catch((err: AxiosError) => {
				throw this.checkStatusCode(
					err.response.status,
					err.response.data.message
				);
			});
	}

	public static put(url: string, object: any): any {
		this.getAuthHeaders();
		return this.api
			.put(url, object)
			.then((res: AxiosResponse) => {
				if (!this.checkResponseOK(res))
					throw this.checkStatusCode(res.status, res.data);
				return res;
			})
			.catch((err: AxiosError) => {
				if (err.response) {
					throw this.checkStatusCode(
						err.response.status,
						err.response.data.message
					);
				}
			});
	}

	public static patch(url: string, object: any): any {
		this.getAuthHeaders();
		return this.api
			.patch(url, object)
			.then((res: AxiosResponse) => {
				if (!this.checkResponseOK(res))
					throw this.checkStatusCode(res.status, res.data);
				return res;
			})
			.catch((err: AxiosError) => {
				if (err.response) {
					throw this.checkStatusCode(
						err.response.status,
						err.response.data.message
					);
				}
			});
	}

	public static delete(url: string, object: any): any {
		this.getAuthHeaders();
		return this.api
			.delete(url, {
				data: object
			})
			.then((res: AxiosResponse) => {
				if (!this.checkResponseOK(res))
					throw this.checkStatusCode(res.status, res.data);
				return res;
			})
			.catch((err: AxiosError) => {
				if (err.response) {
					throw this.checkStatusCode(
						err.response.status,
						err.response.data.message
					);
				}
			});
	}

	private static checkResponseOK(res: AxiosResponse): boolean {
		return res.status >= 200 && res.status < 300;
	}

	private static checkStatusCode(
		status: number,
		message: string
	): HttpException {
		switch (status) {
			case StatusCodes.UNAUTHORIZED:
				//TODO: get new token and perform request again
				store.dispatch("logout");
				return new UnauthorizedException(message);
			case StatusCodes.BAD_REQUEST:
				return new BadRequestException(message);
			case StatusCodes.INTERNAL_SERVER_ERROR:
				return new InternalServerException(message);
		}
	}
}

export default AxiosRequestHandler;
