import { AxiosResponse } from "axios";
import store from "@/store";
import AxiosRequestHandler from "@/utils/axiosRequestHandler";
import { LikeKweetRequest } from "@/models/dto/like.dto";

class LikeService {
	private static serviceUrl = "/like";

	public static likeKweet(kweetId: string, profileId: string) {
		const likeKweetRequest: LikeKweetRequest = { kweetId, profileId };

		return AxiosRequestHandler.post(this.serviceUrl, likeKweetRequest)
			.then((res: AxiosResponse) => {
				store.dispatch("kweetModule/setLikes", { likes: res.data, kweetId });
				return res.data;
			})
			.catch((err: any) => {
				throw err;
			});
	}

	public static unlikeKweet(kweetId: string, profileId: string) {
		const unlikeKweetRequest: LikeKweetRequest = { kweetId, profileId };
		return AxiosRequestHandler.delete(this.serviceUrl, unlikeKweetRequest)
			.then((res: AxiosResponse) => {
				store.dispatch("kweetModule/setLikes", { likes: res.data, kweetId });
				return res.data;
			})
			.catch((err: any) => {
				throw err;
			});
	}
}

export default LikeService;
