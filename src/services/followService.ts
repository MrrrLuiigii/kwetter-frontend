import { AxiosResponse } from "axios";
import store from "@/store";
import AxiosRequestHandler from "@/utils/axiosRequestHandler";

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
}

export default FollowService;
