export interface KweetLikesVM {
	count: number;
	likes: LikeVM[];
}

export interface LikeVM {
	profileId: string;
	createdAt: Date;
}
