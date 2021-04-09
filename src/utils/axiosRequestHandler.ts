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
			Authorization:
				"Bearer " + store.getters.getUser !== undefined &&
				store.getters.getUser !== null
					? store.getters.getUser.token
					: ""
		}
	});

	public static get(url: string): any {
		return this.api
			.get(url)
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
