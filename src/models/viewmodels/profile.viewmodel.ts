import AuthVM from "./auth.viewmodel";

export interface ProfileVM {
	id: string;
	user: AuthVM;
	name: string;
	web: string;
	bio: string;
	followers: any[];
	followed: any[];
	likes: any[];
	mentions: any[];
	kweets: any[];
	trends: any[];
}

export interface ProfileSearchVM {
	id: string;
	username: string;
	name: string;
	following: boolean;
}
