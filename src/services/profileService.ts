import { AxiosResponse } from "axios";
import store from "@/store";
import AxiosRequestHandler from "@/utils/axiosRequestHandler";
import { CreateProfileRequest } from "@/models/dto/profile.dto";

class ProfileService {
	private static serviceUrl = "/profile";

	public static getProfile(id?: string) {
		const url: string = `${this.serviceUrl}/id${id ? `/${id}` : ""}`;
		return AxiosRequestHandler.get(url)
			.then((res: AxiosResponse) => {
				store.dispatch("profileModule/saveProfile", res.data);
				return res;
			})
			.catch((err: any) => {
				throw err;
			});
	}

	public static getProfiles(username: string) {
		const url: string = this.serviceUrl;
		const params = { username };
		return AxiosRequestHandler.get(url, params)
			.then((res: AxiosResponse) => {
				return res.data;
			})
			.catch((err: any) => {
				throw err;
			});
	}

	public static getProfileByUsername(username: string) {
		const url: string = `${this.serviceUrl}/username/${username}`;
		return AxiosRequestHandler.get(url)
			.then((res: AxiosResponse) => {
				return res.data;
			})
			.catch((err: any) => {
				throw err;
			});
	}

	public static createProfile(createProfileRequest: CreateProfileRequest) {
		return AxiosRequestHandler.post(this.serviceUrl, createProfileRequest)
			.then((res: AxiosResponse) => {
				store.dispatch("profileModule/saveProfile", res.data);
				return res;
			})
			.catch((err: any) => {
				throw err;
			});
	}
}

export default ProfileService;
