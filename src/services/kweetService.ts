import { AxiosResponse } from "axios";
import store from "@/store";
import AxiosRequestHandler from "@/utils/axiosRequestHandler";

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
}

export default KweetService;
