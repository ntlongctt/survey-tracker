import { handleEventCapture } from "../tracking/eventHandler";
import { EVENT_TYPES } from "../tracking/constants";
import { TrackingStrategy } from "./TrackingStrategy";

export class UserAnswerStrategy extends TrackingStrategy {
	execute() {
		try {
			const form = document.querySelector(".sg-survey-form");
			if (form) {
				form.addEventListener("submit", (event) => {
					const formData = new FormData(form);
					const answers = {};
					for (const [key, value] of formData.entries()) {
						answers[key] = value;
					}

					this.questionTracking.setAnswer(answers);
					handleEventCapture(
						EVENT_TYPES.answer_question,
						{ answers },
						this.questionTracking,
					);
				});
			}
		} catch (error) {
			console.error("Error in UserAnswerStrategy:", error);
		}
	}
}
