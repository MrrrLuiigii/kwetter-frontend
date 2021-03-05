//enums
import Gender from "./enums/Gender";
import Class from "./enums/Class";
import Race from "./enums/Race";

interface BattleMunchkin {
	id: number;
	name: string;
	gender: Gender;
	level: number;
	gear: number;
	modifier: number;
	supermunchkin: boolean;
	halfbreed: boolean;
	classes: Class[];
	races: Race[];
}

export default BattleMunchkin;
