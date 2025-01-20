import { handleEventCapture } from "../tracking/eventHandler";
import { EVENT_TYPES } from "../tracking/constants";
import { TrackingStrategy } from "./TrackingStrategy";

export class MouseClickStrategy extends TrackingStrategy {
	execute() {
		try {
			document.addEventListener("click", (event) => {
				const details = {
					x: event.clientX,
					y: event.clientY,
					target: event.target.tagName,
				};
				handleEventCapture(
					EVENT_TYPES.user_click,
					details,
					this.questionTracking,
				);
			});
		} catch (error) {
			console.error("Error in MouseClickStrategy:", error);
		}
	}
}
