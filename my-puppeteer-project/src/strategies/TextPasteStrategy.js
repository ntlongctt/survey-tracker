import { handleEventCapture } from "../tracking/eventHandler";
import { EVENT_TYPES } from "../tracking/constants";
import { TrackingStrategy } from "./TrackingStrategy";

export class TextPasteStrategy extends TrackingStrategy {
	execute() {
		try {
			document.addEventListener("paste", (event) => {
				const pastedText = (
					event.clipboardData || window.clipboardData
				).getData("text");
				const details = { pastedText };
				handleEventCapture(
					EVENT_TYPES.text_paste,
					details,
					this.questionTracking,
				);
			});
		} catch (error) {
			console.error("Error in TextPasteStrategy:", error);
		}
	}
}
