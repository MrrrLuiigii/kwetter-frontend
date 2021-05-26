import { KweetLikesVM } from "./like.viewmodel";

interface KweetVM {
	id: string;
	body: string;
	profile: any; //TODO type
	trends: any; //TODO type
	mentions: any; //TODO type
	likes: KweetLikesVM;
	createdAt: Date;
}

export default KweetVM;
