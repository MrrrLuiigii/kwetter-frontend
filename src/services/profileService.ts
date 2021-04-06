import { CreateProfileRequest } from "@/models/dto/profile.dto";
import AxiosRequestHandler from "@/utils/axiosRequestHandler";
import { AxiosResponse } from "axios";

class ProfileService {
	public static createProfile(createProfileRequest: CreateProfileRequest) {
		const url: string = "/profile";

		return AxiosRequestHandler.post(url, createProfileRequest)
			.then((res: AxiosResponse) => {
				if (res.status >= 200 && res.status < 300) {
					//TODO do something with profile
					return res;
				}
			})
			.catch((err: any) => {
				throw err;
			});
	}
}

export default ProfileService;
