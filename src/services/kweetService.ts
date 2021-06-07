import { AxiosResponse } from "axios";
import store from "@/store";
import AxiosRequestHandler from "@/utils/axiosRequestHandler";
import { PostKweetRequest } from "@/models/dto/kweet.dto";

class KweetService {
	private static serviceUrl = "/kweet";

	public static getKweetsByProfileId(profileId: string) {
		const params: { skip: number; take: number } =
			store.getters["kweetModule/getPagination"];
		const url: string = `${this.serviceUrl}/${profileId}`;
		return AxiosRequestHandler.get(url, params)
			.then((res: AxiosResponse) => {
				store.dispatch("kweetModule/saveKweets", res.data);
				return res;
			})
			.catch((err: any) => {
				throw err;
			});
	}

	public static getFeedByProfileId(profileId: string) {
		const params: { skip: number; take: number } =
			store.getters["kweetModule/getPagination"];
		const url: string = `${this.serviceUrl}/feed/${profileId}`;
		return AxiosRequestHandler.get(url, params)
			.then((res: AxiosResponse) => {
				store.dispatch("kweetModule/saveKweets", res.data);
				return res;
			})
			.catch((err: any) => {
				throw err;
			});
	}

	public static postKweet(kweet: PostKweetRequest) {
		return AxiosRequestHandler.post(this.serviceUrl, kweet)
			.then((res: AxiosResponse) => {
				//TODO store kweet
				return res;
			})
			.catch((err: any) => {
				throw err;
			});
	}

	public static deleteKweet(kweetId: string) {
		const url: string = `${this.serviceUrl}/${kweetId}`;
		return AxiosRequestHandler.delete(url)
			.then((res: AxiosResponse) => {
				return res;
			})
			.catch((err: any) => {
				throw err;
			});
	}
}

export default KweetService;
