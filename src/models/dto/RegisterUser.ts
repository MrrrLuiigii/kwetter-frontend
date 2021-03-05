import Gender from "../enums/Gender";

interface RegisterUser {
	username: string;
	gender: Gender;
	email: string;
}

export default RegisterUser;
