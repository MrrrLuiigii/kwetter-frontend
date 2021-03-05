import Race from "./enums/Race";
import Ability from "./Ability";

interface MunchkinRace {
	mRace: Race;
	name: string;
	abilities: Ability[];
}

export default MunchkinRace;
