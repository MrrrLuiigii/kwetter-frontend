//enums
import BattleStatus from "./enums/BattleStatus";

//models
import Lobby from "./Lobby";
import Monster from "./Monster";
import BattleMunchkin from "./BattleMunchkin";

interface Battle {
	id: number;
	status: BattleStatus;
	createdAt: Date;
	lobby: Lobby;
	munchkins: BattleMunchkin[];
	monsters: Monster[];
}

export default Battle;
