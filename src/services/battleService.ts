import { AxiosResponse } from "axios";

//models
import Lobby from "@/models/Lobby";
import Munchkin from "@/models/Munchkin";
import JoinBattle from "@/models/dto/JoinBattle";

//utils
import AxiosHandler from "@/utils/axiosRequestHandler";

class BattleService {
	public static getActiveBattle(
		lobby: Lobby,
		munchkin: Munchkin,
		addIfUndefined: boolean = false
	): any {
		const url: string = "battles/active";

		return AxiosHandler.post(url, {
			munchkinId: munchkin.id,
			lobbyId: lobby.id,
			addIfUndefined
		}).then((res: AxiosResponse) => {
			return res;
		});
	}

	public static addBattle(lobby: Lobby, munchkin: Munchkin): any {
		const url: string = "battles";
		const joinBattle: JoinBattle = {
			lobbyId: lobby.id,
			munchkinId: munchkin.id
		};
		return AxiosHandler.post(url, joinBattle).then((res: AxiosResponse) => {
			return res;
		});
	}
}

export default BattleService;
