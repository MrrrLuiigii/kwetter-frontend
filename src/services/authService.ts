import { LoginRequest, RegisterRequest } from "@/models/dto/auth.dto";
import AxiosRequestHandler from "@/utils/axiosRequestHandler";
import { AxiosResponse } from "axios";
import store from "@/store/index";

class AuthService {
	public static register(registerRequest: RegisterRequest) {
		const url: string = "/auth/register";

		return AxiosRequestHandler.post(url, registerRequest)
			.then((res: AxiosResponse) => {
				store.dispatch("saveUser", res.data);
				return res;
			})
			.catch((err: any) => {
				throw err;
			});
	}

	public static login(loginRequest: LoginRequest) {
		const url: string = "auth/login";

		return AxiosRequestHandler.post(url, loginRequest)
			.then((res: AxiosResponse) => {
				store.dispatch("saveUser", res.data);
				return res;
			})
			.catch((err: any) => {
				throw err;
			});
	}

	public static verify() {
		const url: string = "auth/verify";

		return AxiosRequestHandler.patch(url, {})
			.then((res: AxiosResponse) => {
				store.dispatch("saveUser", res.data);
				return res;
			})
			.catch((err: any) => {
				throw err;
			});
	}

	public static validate() {
		if (store.getters.getUser) {
			const url: string = "auth/validate";
			return AxiosRequestHandler.get(url);
		}
		store.dispatch("logout");
	}
}

export default AuthService;
