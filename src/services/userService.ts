import { AxiosResponse } from "axios";

//models
import RegisterUserDTO from "@/models/dto/RegisterUser";

//utils
import AxiosHandler from "@/utils/axiosRequestHandler";

class UserService {
	public static getUserByEmail(email: string): any {
		const url: string = `users/email/${email}`;
		return AxiosHandler.get(url).then((res: AxiosResponse) => {
			return res;
		});
	}

	public static addUser(user: RegisterUserDTO) {
		const url: string = "users";
		return AxiosHandler.post(url, user).then((res: AxiosResponse) => {
			return res;
		});
	}
}

export default UserService;
