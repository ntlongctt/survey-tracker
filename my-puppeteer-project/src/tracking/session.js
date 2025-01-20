import { postRequest, putRequest } from "../utils/http";
import { api_end_point } from "./constants";

export const generateSessionId = async (projectId) => {
	console.log(`Generating sessionId for projectId: ${projectId}`);
	const response = await postRequest(`${api_end_point}/respondent-session`, {
		projectId,
	});
	console.log(`Received sessionId: ${response.data.sessionId}`);
	return response.data.sessionId;
};

export const updateSessionData = async (sessionId, data) => {
	console.log(`Updating session data for sessionId: ${sessionId}`);
	const response = await putRequest(
		`${api_end_point}/respondent-session/updateSessionInteraction/${sessionId}`,
		data,
	);
	console.log(`Session data updated: ${response.data}`);
	return response.data;
};
