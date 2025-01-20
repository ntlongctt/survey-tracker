import { handleEventCapture } from "../tracking/eventHandler";
import { EVENT_TYPES } from "../tracking/constants";
import { TrackingStrategy } from "./TrackingStrategy";

export class PreSurveyAnswerStrategy extends TrackingStrategy {
	execute() {
		try {
			const form = document.getElementById("rcsrv");
			if (form) {
				const inputs = form.querySelectorAll(
					'input[type="radio"], input[type="checkbox"]',
				);
				for (const input of inputs) {
					input.addEventListener("change", () => {
						this.captureAnswer(input);
					});
				}

				const textarea = form.querySelector(
					'textarea[name="ProfileQuestion[value]"]',
				);
				if (textarea) {
					textarea.addEventListener("change", () => {
						this.captureAnswer(textarea);
					});
				}
			}
		} catch (error) {
			console.error("Error in PreSurveyAnswerStrategy:", error);
		}
	}

	captureAnswer(inputElement) {
		let answers = "";

		if (inputElement.type === "radio" || inputElement.type === "checkbox") {
			const labelElement = inputElement.closest("label");
			if (labelElement) {
				answers = labelElement.textContent.trim();
			}
		} else if (inputElement.tagName.toLowerCase() === "textarea") {
			answers = inputElement.value.trim();
		}

		this.questionTracking.setAnswer(answers);
		handleEventCapture(
			EVENT_TYPES.answer_question,
			{ answers },
			this.questionTracking,
		);
	}
}
