import AuthVM from "./auth.viewmodel";

interface ProfileVM {
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

export default ProfileVM;
