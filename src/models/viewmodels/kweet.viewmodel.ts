import { KweetLikesVM } from "./like.viewmodel";
import { KweetProfileVM } from "./profile.viewmodel";
import { KweetTrendVM } from "./trend.viewmodel";

interface KweetVM {
	id: string;
	body: string;
	profile: KweetProfileVM;
	trends: KweetTrendVM;
	mentions: string[];
	likes: KweetLikesVM;
	createdAt: Date;
}

export default KweetVM;
