//enums
import Gender from "./enums/Gender";

//models
import MunchkinClass from "./MunchkinClass";
import MunchkinRace from "./MunchkinRace";

interface Munchkin {
	id: number;
	name: string;
	gender: Gender;
	level: number;
	gear: number;
	supermunchkin: boolean;
	halfbreed: boolean;
	classes: MunchkinClass[];
	races: MunchkinRace[];
}

export default Munchkin;
