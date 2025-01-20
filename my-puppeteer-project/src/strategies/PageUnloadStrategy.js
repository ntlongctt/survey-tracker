import { handleEventCapture } from "../tracking/eventHandler";
import { EVENT_TYPES } from "../tracking/constants";
import { TrackingStrategy } from "./TrackingStrategy";
import { extractQuestionText } from "../tracking/utils";

export class PageUnloadStrategy extends TrackingStrategy {
	execute() {
		try {
			window.addEventListener("beforeunload", () => {
				this.handlePageUnload();
			});
		} catch (error) {
			console.error("Error in PageUnloadStrategy:", error);
		}
	}

	handlePageUnload() {
		const questionText = extractQuestionText();
		const answers = this.questionTracking.answer;
		const startTime = this.questionTracking.startTime;
		const endTime = new Date();

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
	}
}
