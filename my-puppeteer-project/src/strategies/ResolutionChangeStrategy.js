import { handleEventCapture } from "../tracking/eventHandler";
import { EVENT_TYPES } from "../tracking/constants";
import { TrackingStrategy } from "./TrackingStrategy";

export class ResolutionChangeStrategy extends TrackingStrategy {
	execute() {
		try {
			let resizeTimeout;

			const captureResize = () => {
				const details = {
					width: window.innerWidth,
					height: window.innerHeight,
				};
				handleEventCapture(
					EVENT_TYPES.resolution_change,
					details,
					this.questionTracking,
				);
			};

			window.addEventListener("resize", () => {
				clearTimeout(resizeTimeout);
				resizeTimeout = setTimeout(captureResize, 200);
			});
		} catch (error) {
			console.error("Error in ResolutionChangeStrategy:", error);
		}
	}
}
