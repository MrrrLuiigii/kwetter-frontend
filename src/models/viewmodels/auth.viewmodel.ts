import { Role } from "@/models/enums/auth.enum";

interface AuthVM {
	id: number;
	username: string;
	role: Role;
	token: string;
}

export default AuthVM;
