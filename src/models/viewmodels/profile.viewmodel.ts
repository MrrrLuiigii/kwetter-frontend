import AuthVM from "./auth.viewmodel";

export interface ProfileVM {
	id: string;
	user: AuthVM;
	name: string;
	web: string;
	bio: string;
	followers: ProfileMinVM[];
	following: ProfileMinVM[];
}

export interface KweetProfileVM {
	id: string;
	username: string;
}

export interface ProfileSearchVM {
	id: string;
	username: string;
	name: string;
}

export interface ProfileMinVM {
	id: string;
	username: string;
	name: string;
	web: string;
	bio: string;
}
