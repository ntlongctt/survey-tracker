import { handleEventCapture } from "../tracking/eventHandler";
import { EVENT_TYPES } from "../tracking/constants";
import { TrackingStrategy } from "./TrackingStrategy";

export class DevToolsStrategy extends TrackingStrategy {
	execute() {
		try {
			const element = new Image();
			Object.defineProperty(element, "id", {
				get: () => {
					handleEventCapture(
						EVENT_TYPES.dev_tools_opened,
						{},
						this.questionTracking,
					);
				},
			});
			console.log(element);
		} catch (error) {
			console.error("Error in DevToolsStrategy:", error);
		}
	}
}
