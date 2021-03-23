import axios, { AxiosResponse, AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import BadRequestException from "./exceptions/badRequest.exception";
import HttpException from "./exceptions/httpException";
import InternalServerException from "./exceptions/internalServer.exception";
import UnauthorizedException from "./exceptions/unauthorized.exception";

class AxiosRequestHandler {
	private static api = axios.create({
		baseURL: process.env.VUE_APP_GATEWAY_HOST
	});

	public static get(url: string): any {
		return this.api
			.get(url, {
				// headers: {
				// 	Authorization: token
				// }
			})
			.then((res: AxiosResponse) => {
				return res;
			})
			.catch((err: AxiosError) => {
				if (err.response) {
					return err.response;
				}
			});
	}

	public static post(url: string, object: any): any {
		return this.api
			.post(url, object, {
				// headers: {
				// 	Authorization: token
				// }
			})
			.then((res: AxiosResponse) => {
				return res;
			})
			.catch((err: AxiosError) => {
				throw this.checkStatusCode(err);
			});
	}

	public static put(url: string, object: any): any {
		return this.api
			.put(url, object, {
				// headers: {
				// 	Authorization: token
				// }
			})
			.then((res: AxiosResponse) => {
				return res;
			})
			.catch((err: AxiosError) => {
				if (err.response) {
					return err.response;
				}
			});
	}

	public static delete(url: string, object: any): any {
		return this.api
			.delete(url, {
				data: object
				// headers: {
				// 	Authorization: token
				// }
			})
			.then((res: AxiosResponse) => {
				return res;
			})
			.catch((err: AxiosError) => {
				if (err.response) {
					return err.response;
				}
			});
	}

	private static checkStatusCode(err: AxiosError<any>): HttpException {
		const message: string = err.response.data.message;
		switch (err.response.status) {
			case StatusCodes.UNAUTHORIZED:
				return new UnauthorizedException(message);
			case StatusCodes.BAD_REQUEST:
				return new BadRequestException(message);
			case StatusCodes.INTERNAL_SERVER_ERROR:
				return new InternalServerException(message);
		}
	}
}

export default AxiosRequestHandler;
