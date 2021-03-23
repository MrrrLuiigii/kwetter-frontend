export class RegisterRequest {
	username: string;
	email: string;
	password: string;
	passwordVerify: string;
}

export class LoginRequest {
	username: string;
	password: string;
}
