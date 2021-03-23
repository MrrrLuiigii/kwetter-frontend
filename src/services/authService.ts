import { LoginRequest, RegisterRequest } from "@/models/dto/auth.dto";
import AxiosRequestHandler from "@/utils/axiosRequestHandler";
import { AxiosResponse } from "axios";
import store from "@/store/index";

class AuthService {
	public static register(registerRequest: RegisterRequest) {
		const url: string = "/auth/register";

		return AxiosRequestHandler.post(url, registerRequest)
			.then((res: AxiosResponse) => {
				if (res.status >= 200 && res.status < 300) {
					store.dispatch("saveUser", res.data);
					return res;
				}
			})
			.catch(err => {
				throw err;
			});
	}

	public static login(loginRequest: LoginRequest) {
		const url: string = "auth/login";

		return AxiosRequestHandler.post(url, loginRequest)
			.then((res: AxiosResponse) => {
				if (res.status >= 200 && res.status < 300) {
					store.dispatch("saveUser", res.data);
					return res;
				}
			})
			.catch(err => {
				throw err;
			});
	}
}

export default AuthService;
