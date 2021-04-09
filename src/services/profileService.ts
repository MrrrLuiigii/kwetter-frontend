import { AxiosResponse } from "axios";
import store from "@/store";
import AxiosRequestHandler from "@/utils/axiosRequestHandler";
import { CreateProfileRequest } from "@/models/dto/profile.dto";

class ProfileService {
	private static serviceUrl = "/profile";

	public static getProfile(id?: string) {
		const url: string = (this.serviceUrl += id ? `/${id}` : "");
		return AxiosRequestHandler.get(url)
			.then((res: AxiosResponse) => {
				store.dispatch("saveProfile", res.data);
				return res;
			})
			.catch((err: any) => {
				throw err;
			});
	}

	public static createProfile(createProfileRequest: CreateProfileRequest) {
		return AxiosRequestHandler.post(this.serviceUrl, createProfileRequest)
			.then((res: AxiosResponse) => {
				store.dispatch("saveProfile", res.data);
				return res;
			})
			.catch((err: any) => {
				throw err;
			});
	}
}

export default ProfileService;
