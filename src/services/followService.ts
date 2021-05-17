import { AxiosResponse } from "axios";
import store from "@/store";
import AxiosRequestHandler from "@/utils/axiosRequestHandler";
import { FollowRequest, UnfollowRequest } from "@/models/dto/follow.dto";

class FollowService {
	private static serviceUrl = "/follow";

	public static getFollowsByProfileId(id: string) {
		const url: string = `${this.serviceUrl}/${id}`;
		return AxiosRequestHandler.get(url)
			.then((res: AxiosResponse) => {
				store.dispatch("profileModule/saveFollows", res.data);
				return res;
			})
			.catch((err: any) => {
				throw err;
			});
	}

	public static isFollowing(profileId: string, followingId: string) {
		const url: string = `${this.serviceUrl}/${profileId}/${followingId}`;
		return AxiosRequestHandler.get(url)
			.then((res: AxiosResponse) => {
				return res.data;
			})
			.catch((err: any) => {
				throw err;
			});
	}

	public static follow(profileId: string, followId: string) {
		const followRequest: FollowRequest = { profileId, followId };
		return AxiosRequestHandler.post(this.serviceUrl, followRequest)
			.then((res: AxiosResponse) => {
				store.dispatch("profileModule/follow", res.data);
				return res.data;
			})
			.catch((err: any) => {
				throw err;
			});
	}

	public static unfollow(profileId: string, followId: string) {
		const unfollowRequest: UnfollowRequest = { profileId, followId };
		return AxiosRequestHandler.delete(this.serviceUrl, unfollowRequest)
			.then((res: AxiosResponse) => {
				store.dispatch("profileModule/unfollow", res.data);
				return res.data;
			})
			.catch((err: any) => {
				throw err;
			});
	}
}

export default FollowService;
