export class TrackingStrategy {
	constructor(questionTracking) {
		this.questionTracking = questionTracking;
	}

	execute() {
		throw new Error("Strategy must implement execute method");
	}
}
