import { cleanEnv, str, port } from "envalid";

function validateEnv() {
	cleanEnv(process.env, {
		VUE_APP_PORT: port(),
		VUE_APP_API_HOST: str(),
		VUE_APP_SOCKET_HOST: str(),
		VUE_APP_FB_API_KEY: str(),
		VUE_APP_FB_AUTH_DOMAIN: str(),
		VUE_APP_FB_DATABASE_URL: str(),
		VUE_APP_FB_PROJECT_ID: str(),
		VUE_APP_FB_STORAGE_BUCKET: str(),
		VUE_APP_FB_MESSAGING_SENDER_ID: str(),
		VUE_APP_FB_APP_ID: str(),
		VUE_APP_FB_MEASUREMENT_ID: str()
	});
}

export default validateEnv;
