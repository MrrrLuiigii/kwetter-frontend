//enums
import LobbyStatus from "./enums/LobbyStatus";

//models
import Munchkin from "./Munchkin";
import Battle from "./Battle";

interface Lobby {
	id: number;
	status: LobbyStatus;
	createdAt: Date;
	owner: Munchkin;
	munchkins: Munchkin[];
	battles: Battle[];
	winner: Munchkin | null;
}

export default Lobby;
