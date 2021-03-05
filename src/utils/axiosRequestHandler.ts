import axios, { AxiosResponse, AxiosError } from "axios";
import "firebase/auth";

class AxiosRequestHandler {
	private static api = axios.create({
		baseURL: process.env.VUE_APP_API_HOST
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
				if (err.response) {
					return err.response;
				}
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
}

export default AxiosRequestHandler;
