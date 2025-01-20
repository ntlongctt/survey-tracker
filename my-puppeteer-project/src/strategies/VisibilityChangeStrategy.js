import { handleEventCapture } from "../tracking/eventHandler";
import { EVENT_TYPES } from "../tracking/constants";
import { TrackingStrategy } from "./TrackingStrategy";

export class VisibilityChangeStrategy extends TrackingStrategy {
	execute() {
		try {
			document.addEventListener("visibilitychange", () => {
				const eventType = document.hidden
					? EVENT_TYPES.focus_out
					: EVENT_TYPES.focus_in;
				handleEventCapture(eventType, {}, this.questionTracking);
			});
		} catch (error) {
			console.error("Error in VisibilityChangeStrategy:", error);
		}
	}
}
