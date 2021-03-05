import Class from "./enums/Class";
import Ability from "./Ability";

interface MunchkinClass {
	mClass: Class;
	name: string;
	abilities: Ability[];
}

export default MunchkinClass;
