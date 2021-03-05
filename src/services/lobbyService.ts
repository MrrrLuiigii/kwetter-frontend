import { AxiosResponse } from "axios";

//models
import User from "@/models/User";

//utils
import AxiosHandler from "@/utils/axiosRequestHandler";

class LobbyService {
	public static getLobbies(): any {
		const url: string = "lobbies";
		return AxiosHandler.get(url).then((res: AxiosResponse) => {
			return res;
		});
	}

	public static addLobby(user: User): any {
		const url: string = "lobbies";
		return AxiosHandler.post(url, user).then((res: AxiosResponse) => {
			return res;
		});
	}
}

export default LobbyService;
