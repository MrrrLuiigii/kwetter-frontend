import { cleanEnv, str, port } from "envalid";

function validateEnv() {
	cleanEnv(process.env, {
		VUE_APP_PORT: port(),
		VUE_APP_GATEWAY_HOST: str()
	});
}

export default validateEnv;
