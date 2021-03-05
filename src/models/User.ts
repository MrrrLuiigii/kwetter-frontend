import Gender from "./enums/Gender";

interface User {
	id: number;
	username: string;
	gender: Gender;
	email: string;
}

export default User;
