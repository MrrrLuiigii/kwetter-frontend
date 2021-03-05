import axios, { AxiosResponse, AxiosError } from "axios";
import firebase from "firebase/app";
import "firebase/auth";

class AxiosRequestHandler {
	private static api = axios.create({
		baseURL: process.env.VUE_APP_API_HOST
	});

	private static async getFreshToken(): Promise<string> {
		const firebaseUser = firebase.auth().currentUser;
		if (firebaseUser) {
			try {
				return await firebaseUser.getIdToken();
			} catch (err) {
				return "";
			}
		}
		return "";
	}

	public static get(url: string): any {
		return this.getFreshToken().then((token: string) => {
			return this.api
				.get(url, {
					headers: {
						Authorization: token
					}
				})
				.then((res: AxiosResponse) => {
					return res;
				})
				.catch((err: AxiosError) => {
					if (err.response) {
						return err.response;
					}
				});
		});
	}

	public static post(url: string, object: any): any {
		return this.getFreshToken().then((token: string) => {
			return this.api
				.post(url, object, {
					headers: {
						Authorization: token
					}
				})
				.then((res: AxiosResponse) => {
					return res;
				})
				.catch((err: AxiosError) => {
					if (err.response) {
						return err.response;
					}
				});
		});
	}

	public static put(url: string, object: any): any {
		return this.getFreshToken().then((token: string) => {
			return this.api
				.put(url, object, {
					headers: {
						Authorization: token
					}
				})
				.then((res: AxiosResponse) => {
					return res;
				})
				.catch((err: AxiosError) => {
					if (err.response) {
						return err.response;
					}
				});
		});
	}

	public static delete(url: string, object: any): any {
		return this.getFreshToken().then((token: string) => {
			return this.api
				.delete(url, {
					data: object,
					headers: {
						Authorization: token
					}
				})
				.then((res: AxiosResponse) => {
					return res;
				})
				.catch((err: AxiosError) => {
					if (err.response) {
						return err.response;
					}
				});
		});
	}
}

export default AxiosRequestHandler;
