import { handleEventCapture } from "../tracking/eventHandler";
import { EVENT_TYPES } from "../tracking/constants";
import { TrackingStrategy } from "./TrackingStrategy";
import { extractQuestionText } from "../tracking/utils";

export class NextQuestionButtonStrategy extends TrackingStrategy {
	execute() {
		this.initObserver();
	}

	initObserver() {
		try {
			let nextButton = document.querySelector(
				".btnPreviewNext.questionPreview__btn_right",
			);
			if (!nextButton) {
				nextButton = document.getElementById("rcsrv-submit-btn");
			}
			if (!nextButton) return;

			const observer = new MutationObserver(() => {
				if (nextButton.disabled) {
					this.handleNextQuestion();
					observer.disconnect();
				}
			});

			observer.observe(nextButton, {
				attributes: true,
				attributeFilter: ["disabled"],
			});
		} catch (error) {
			console.error("Error in NextQuestionButtonStrategy:", error);
		}
	}

	handleNextQuestion() {
		const questionText = extractQuestionText();
		const answers = this.questionTracking.answer;
		const startTime = this.questionTracking.startTime;
		const endTime = new Date();
		this.questionTracking.setEndTime(endTime);

		handleEventCapture(
			EVENT_TYPES.question_end,
			{
				answers,
				questionText,
				startTime,
				endTime,
			},
			this.questionTracking,
		);

		this.initObserver();
		this.questionTracking.reinitializeStrategies();
	}
}
