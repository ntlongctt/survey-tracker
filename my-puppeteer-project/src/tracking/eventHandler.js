import { updateSessionData } from "./session";
import { EVENT_TYPES } from "./constants";

export const handleEventCapture = async (trackingData, questionTracking) => {
	try {
		questionTracking.addTimelineEvent({
			type: trackingData.eventType,
			timestamp: new Date(),
			details: trackingData.data,
		});

		if (trackingData.eventType === EVENT_TYPES.question_end) {
			const dataToSend = {
				sessionId: questionTracking.sessionId,
				questionText: questionTracking.questionText,
				startTime: questionTracking.startTime,
				endTime: questionTracking.endTime,
				nextQuestionBtnClick: questionTracking.nextQuestionBtnClick,
				timeline: questionTracking.timeline.timeline,
				answer: questionTracking.answer,
			};

			const response = await updateSessionData(
				questionTracking.sessionId,
				dataToSend,
			);
			return !!response;
		}

		return true;
	} catch (error) {
		console.error("Error handling event capture:", error);
		return false;
	}
};
