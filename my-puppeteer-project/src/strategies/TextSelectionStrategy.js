import { handleEventCapture } from "../tracking/eventHandler";
import { EVENT_TYPES } from "../tracking/constants";
import { TrackingStrategy } from "./TrackingStrategy";

export class TextSelectionStrategy extends TrackingStrategy {
	execute() {
		try {
			const captureSelection = () => {
				const selection = window.getSelection().toString().trim();
				if (selection) {
					const details = { selection };
					handleEventCapture(
						EVENT_TYPES.text_selection,
						details,
						this.questionTracking,
					);
				}
			};

			document.addEventListener("mouseup", captureSelection);
			document.addEventListener("keyup", (event) => {
				if (event.key === "Shift" || event.key.startsWith("Arrow")) {
					captureSelection();
				}
			});
		} catch (error) {
			console.error("Error in TextSelectionStrategy:", error);
		}
	}
}
