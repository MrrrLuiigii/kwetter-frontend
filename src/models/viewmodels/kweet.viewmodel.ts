interface KweetVM {
	id: string;
	body: string;
	profile: any; //TODO type
	trends: any; //TODO type
	mentions: any; //TODO type
	likes: any; //TODO type
	createdAt: Date;
}

export default KweetVM;
