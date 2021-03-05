import { AxiosResponse } from "axios";

//models
import Munchkin from "@/models/Munchkin";

//utils
import AxiosHandler from "@/utils/axiosRequestHandler";
import Race from "@/models/enums/Race";
import Class from "@/models/enums/Class";

export enum UpdatedValue {
	Gender,
	Level,
	Gear,
	Supermunchkin,
	Halfbreed
}

class MunchkinService {
	private static baseURL: string = "munchkins";

	public static updateMunchkin(munchkin: Munchkin, updatedValue: UpdatedValue) {
		switch (updatedValue) {
			case UpdatedValue.Halfbreed:
				return this.updateMunchkinHalfbreed(munchkin);
			case UpdatedValue.Supermunchkin:
				return this.updateMunchkinSupermunchkin(munchkin);
			default:
				return this.updateMunchkinDefault(munchkin);
		}
	}

	//TODO add catches

	public static updateMunchkinRace(
		munchkin: Munchkin,
		index: number,
		newRace: Race
	) {
		const url: string = `${this.baseURL}/races`;
		return AxiosHandler.put(url, {
			munchkinId: munchkin.id,
			index,
			newRace
		}).then((res: AxiosResponse) => {
			return res;
		});
	}

	public static updateMunchkinClass(
		munchkin: Munchkin,
		index: number,
		newClass: Class
	) {
		const url: string = `${this.baseURL}/classes`;
		return AxiosHandler.put(url, {
			munchkinId: munchkin.id,
			index,
			newClass
		}).then((res: AxiosResponse) => {
			return res;
		});
	}

	public static deleteMunchkinClass(munchkin: Munchkin, index: number) {
		const url: string = `${this.baseURL}/classes`;
		return AxiosHandler.delete(url, {
			munchkinId: munchkin.id,
			index
		}).then((res: AxiosResponse) => {
			return res;
		});
	}

	private static updateMunchkinHalfbreed(munchkin: Munchkin): AxiosResponse {
		const url: string = `${this.baseURL}/halfbreed`;
		return AxiosHandler.put(url, munchkin).then((res: AxiosResponse) => {
			return res;
		});
		// .catch((err: Error) => {

		// });
	}

	private static updateMunchkinSupermunchkin(munchkin: Munchkin) {
		const url: string = `${this.baseURL}/supermunchkin`;
		return AxiosHandler.put(url, munchkin).then((res: AxiosResponse) => {
			return res;
		});
	}

	private static updateMunchkinDefault(munchkin: Munchkin) {
		return AxiosHandler.put(this.baseURL, munchkin).then(
			(res: AxiosResponse) => {
				return res;
			}
		);
	}
}

export default MunchkinService;
