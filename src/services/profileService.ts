import { CreateProfileRequest } from "@/models/dto/profile.dto";
import store from "@/store";
import AxiosRequestHandler from "@/utils/axiosRequestHandler";
import { AxiosResponse } from "axios";

class ProfileService {
	public static createProfile(createProfileRequest: CreateProfileRequest) {
		const url: string = "/profile";

		return AxiosRequestHandler.post(url, createProfileRequest)
			.then((res: AxiosResponse) => {
				if (res.status >= 200 && res.status < 300) {
					store.dispatch("saveProfile", res.data);
					return res;
				}
			})
			.catch((err: any) => {
				throw err;
			});
	}
}

export default ProfileService;
