import { handleEventCapture } from "../tracking/eventHandler";
import { EVENT_TYPES } from "../tracking/constants";
import { TrackingStrategy } from "./TrackingStrategy";

export class TextCopyStrategy extends TrackingStrategy {
	execute() {
		try {
			document.addEventListener("copy", (event) => {
				const details = {
					selection: window.getSelection().toString(),
				};
				handleEventCapture(
					EVENT_TYPES.text_copy,
					details,
					this.questionTracking,
				);
			});
		} catch (error) {
			console.error("Error in TextCopyStrategy:", error);
		}
	}
}
