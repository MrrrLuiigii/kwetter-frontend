import { ProfileMinVM } from "./profile.viewmodel";

export interface FollowVM {
	followers: ProfileMinVM[];
	following: ProfileMinVM[];
}
