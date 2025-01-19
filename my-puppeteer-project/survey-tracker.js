// export type TrackingType =
//   | 'click'
//   | 'load'
//   | 'text-select'
//   | 'input'
//   | 'submit'
//   | 'resize'
//   | 'focus-in'
//   | 'focus-out'
//   | 'first-interaction'
//   | 'answer-question'
//   | 'answer-select'
//   | 'question-select'
//   | 'answer-copy'
//   | 'question-copy'
//   | 'text-copy'
//   | 'text-paste';

// export type TrackingInfo = {
//   questionId: string;
//   questionText: string;
//   answerText: string;
//   startTime: number;
//   endTime: number;
//   finished: boolean;
//   timelines: UserAction[];
// };

// const api_end_point = "https://tgm-backend.onrender.com/api";
const api_end_point = "https://reshldz.link:3010/api";

const NEXT_QUESTION_BTN_ID = "sg_NextButton";

// Define a constant for event types
const EVENT_TYPES = {
	dev_tools_opened: "dev-tools-opened",
	focus_in: "focus-in",
	focus_out: "focus-out",
	resolution_change: "resolution-change",
	text_selection: "text-selection",
	text_copy: "text-copy",
	text_paste: "text-paste",
	user_click: "user-click",
	next_button_click: "next-button-click",
	question_end: "question-end",
};

// Function to get a cookie by name
const getCookie = (name) => {
	const matches = document.cookie.match(
		new RegExp(
			`(?:^|; )${name.replace(/([\.$?*|{}\\\/+^])/g, "\\$1")}=([^;]*)`,
		),
	);
	return matches ? decodeURIComponent(matches[1]) : undefined;
};

// Function to generate or retrieve sessionId
const generateSessionId = async (projectId, useCookie = false) => {
	if (useCookie) {
		// Retrieve sessionId from cookie
		const sessionId = getCookie("sessionId");
		if (!sessionId) throw new Error("SessionId not found in cookies");
		console.log(`Retrieved sessionId from cookie: ${sessionId}`);
		return sessionId;
	}

	// Generate sessionId via API call
	console.log(`Generating sessionId for projectId: ${projectId}`);
	const response = await postRequest(`${api_end_point}/respondent-session`, {
		projectId,
	});
	console.log(`Received sessionId: ${response.data.sessionId}`);
	return response.data.sessionId;
};

const updateSessionData = async (sessionId, data) => {
	console.log(`Updating session data for sessionId: ${sessionId}`);
	const response = await putRequest(
		`${api_end_point}/respondent-session/updateSessionInteraction/${sessionId}`,
		data,
	);
	console.log(`Session data updated: ${response.data}`);
	return response.data;
};

// Utility function for making fetch requests
const fetchRequest = async (url, method, data = null) => {
	try {
		const options = {
			method,
			headers: {
				"Content-Type": "application/json",
			},
		};

		if (data) {
			options.body = JSON.stringify(data);
		}

		const response = await fetch(url, options);
		return response.ok ? await response.json() : Promise.reject(response);
	} catch (error) {
		console.error(`Error in ${method} request:`, error);
		throw error;
	}
};

// Utility function for POST requests
const postRequest = (url, data) => fetchRequest(url, "POST", data);

// Utility function for PUT requests
const putRequest = (url, data) => fetchRequest(url, "PUT", data);

// Default event capture handler implementation
const defaultEventCaptureHandler = async (trackingData, questionTracking) => {
	try {
		// Add event to the timeline
		questionTracking.addTimelineEvent({
			type: trackingData.eventType,
			timestamp: new Date(),
			details: trackingData.data,
		});

		if (trackingData.eventType === EVENT_TYPES.question_end) {
			// Gather all relevant data from questionTracking
			const dataToSend = {
				sessionId: questionTracking.sessionId,
				questionText: questionTracking.questionText,
				startTime: questionTracking.startTime,
				endTime: questionTracking.endTime,
				nextQuestionBtnClick: questionTracking.nextQuestionBtnClick,
				timeline: questionTracking.timeline.timeline,
				answer: questionTracking.answer,
			};

			// Send the complete data to the server
			const response = await updateSessionData(
				questionTracking.sessionId,
				dataToSend,
			);
			return !!response;
		}

		return true;
	} catch (error) {
		console.error("Error handling event capture:", error);
		return false;
	}
};

const mockServerSender = async (data) => {
	// Check if this is a question end event
	if (data.eventType === EVENT_TYPES.question_end) {
		try {
			// Get existing tracking data from localStorage or initialize empty array
			const existingData = JSON.parse(
				sessionStorage.getItem("questionTrackingData") || "[]",
			);

			// Add new tracking data
			existingData.push({
				questionText: data.data.questionText,
				startTime: data.data.startTime,
				endTime: data.data.endTime,
				nextQuestionBtnClick: data.data.nextQuestionBtnClick,
				timeline: data.data.timeline,
			});

			// Save back to localStorage
			sessionStorage.setItem(
				"questionTrackingData",
				JSON.stringify(existingData),
			);
		} catch (error) {
			console.error("Error saving tracking data to localStorage:", error);
		}
	}

	// console.log("Mock sender received:", data);
	return true;
};

// Event handler factory with dependency injection
const createEventHandler = (
	eventCaptureHandler = defaultEventCaptureHandler,
) => {
	return async (eventType, eventData, questionTracking) => {
		console.log("eventType", eventType);
		const trackingData = {
			eventType,
			timestamp: new Date().toISOString(),
			data: eventData,
			url: window.location.href,
		};

		try {
			const success = await eventCaptureHandler(trackingData, questionTracking);
			if (!success) {
				console.error("Failed to handle event capture:", trackingData);
			}
		} catch (error) {
			console.error("Error in handleEventCapture:", error);
		}
	};
};

// Initialize the handler with default implementation
// const handleEventCapture = createEventHandler(mockServerSender);
const handleEventCapture = createEventHandler();

// Base strategy class that all tracking strategies will extend
class TrackingStrategy {
	constructor(questionTracking) {
		this.questionTracking = questionTracking;
	}

	execute() {
		throw new Error("Strategy must implement execute method");
	}
}

class DevToolsStrategy extends TrackingStrategy {
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

class VisibilityChangeStrategy extends TrackingStrategy {
	execute() {
		try {
			document.addEventListener("visibilitychange", () => {
				const eventType = document.hidden
					? EVENT_TYPES.focus_out
					: EVENT_TYPES.focus_in;
				handleEventCapture(eventType, {}, this.questionTracking);
			});
		} catch (error) {
			console.error("Error in TabChangeStrategy:", error);
		}
	}
}

class ResolutionChangeStrategy extends TrackingStrategy {
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
				// Clear the previous timeout
				clearTimeout(resizeTimeout);

				// Set a new timeout to capture the resize event after 200ms
				resizeTimeout = setTimeout(captureResize, 200);
			});
		} catch (error) {
			console.error("Error in ResolutionChangeStrategy:", error);
		}
	}
}

class TextSelectionStrategy extends TrackingStrategy {
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

			// Capture selection on mouseup
			document.addEventListener("mouseup", captureSelection);

			// Capture selection on keyup (for keyboard-based selection)
			document.addEventListener("keyup", (event) => {
				// Check if the Shift key is involved in the selection
				if (event.key === "Shift" || event.key.startsWith("Arrow")) {
					captureSelection();
				}
			});
		} catch (error) {
			console.error("Error in TextSelectionStrategy:", error);
		}
	}
}

class TextCopyStrategy extends TrackingStrategy {
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

class TextPasteStrategy extends TrackingStrategy {
	execute() {
		try {
			document.addEventListener("paste", (event) => {
				// Get the pasted text from the clipboard
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

class MouseClickStrategy extends TrackingStrategy {
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

class UserAnswerStrategy extends TrackingStrategy {
	execute() {
		try {
			const form = document.querySelector(".sg-survey-form");
			if (form) {
				form.addEventListener("submit", (event) => {
					// event.preventDefault(); // Prevent actual form submission for tracking

					const formData = new FormData(form);
					const answers = {};
					for (const [key, value] of formData.entries()) {
						answers[key] = value;
					}

					this.questionTracking.setAnswer(answers);
					handleEventCapture(
						EVENT_TYPES.answer_question,
						{ answers },
						this.questionTracking,
					);

					// form.submit();
				});
			}
		} catch (error) {
			console.error("Error in UserAnswerStrategy:", error);
		}
	}
}

class NextQuestionButtonStrategy extends TrackingStrategy {
	execute() {
		try {
			const nextButton = document.getElementById(NEXT_QUESTION_BTN_ID);
			if (nextButton) {
				nextButton.addEventListener("click", () => {
					const clickTime = new Date();
					this.questionTracking.setNextQuestionBtnClick(clickTime);
					const details = {
						buttonId: NEXT_QUESTION_BTN_ID,
						attempt:
							this.questionTracking.timeline.timeline.filter(
								(event) => event.type === "NEXT_BUTTON_CLICK",
							).length + 1,
					};
					handleEventCapture(
						EVENT_TYPES.next_button_click,
						details,
						this.questionTracking,
					);
				});
			}
		} catch (error) {
			console.error("Error in NextQuestionButtonStrategy:", error);
		}
	}
}

class PageUnloadStrategy extends TrackingStrategy {
	execute() {
		try {
			window.addEventListener("beforeunload", () => {
				const unloadTime = new Date();
				this.questionTracking.setEndTime(unloadTime);
				const details = { reason: "page_unload" };
				handleEventCapture(
					EVENT_TYPES.question_end,
					details,
					this.questionTracking,
				);
			});
		} catch (error) {
			console.error("Error in PageUnloadStrategy:", error);
		}
	}
}

class Timeline {
	timeline = [];

	addEvent = (event) => {
		this.timeline.push(event);
		return this;
	};
}

class QuestionTracking {
	questionText;
	timeline = new Timeline();
	startTime;
	endTime;
	nextQuestionBtnClick;
	strategies = [];
	sessionId;
	projectId;
	answer;

	constructor(questionText, sessionId, projectId) {
		this.questionText = questionText;
		this.sessionId = sessionId;
		this.projectId = projectId;
		this.startTime = new Date();
		this.addTimelineEvent({
			type: "QUESTION_START",
			timestamp: this.startTime,
			details: { questionText },
		});
	}

	addTimelineEvent = (event) => {
		this.timeline.addEvent(event);
		return this;
	};

	setStartTime = (startTime) => {
		this.startTime = startTime;
		return this;
	};

	setEndTime = (endTime) => {
		this.endTime = endTime;
		return this;
	};

	addStrategy = (StrategyClass) => {
		const strategy = new StrategyClass(this);
		this.strategies.push(strategy);
		return this;
	};

	runStrategies = () => {
		for (const strategy of this.strategies) {
			strategy.execute();
		}
		return this;
	};

	setNextQuestionBtnClick = (time) => {
		this.nextQuestionBtnClick = time;
		return this;
	};

	setAnswer = (answer) => {
		this.answer = answer;
		return this;
	};
}

// Add utility function to extract question text
const extractQuestionText = () => {
	try {
		const questionElement = document.querySelector(".sg-question-title");
		if (!questionElement) return "Unknown Question";

		// Get all text content
		let text = questionElement.textContent || "";

		// Remove question number (e.g., "1.")
		text = text.replace(/^\d+\.\s*/, "");

		// Remove required asterisk and screen reader text
		text = text.replace(/\*This question is required\./, "");

		// Clean up extra whitespace
		text = text.trim();

		return text;
	} catch (error) {
		console.error("Error extracting question text:", error);
		return "Unknown Question";
	}
};

// Function to start the survey and get sessionId
const startSurvey = async (projectId) => {
	try {
		console.log(`Starting survey for projectId: ${projectId}`);
		const storedData = JSON.parse(sessionStorage.getItem(projectId)) || {};

		// Check if sessionId exists and is not expired (e.g., 30 minutes expiry)
		if (storedData[projectId]) {
			console.log(`Found existing sessionId for projectId: ${projectId}`);
			return storedData[projectId];
		}

		const response = await postRequest(`${api_end_point}/respondent-session`, {
			projectId,
		});
		const sessionId = response.data.sessionId;
		console.log(`New sessionId generated: ${sessionId}`);

		storedData[projectId] = sessionId;
		sessionStorage.setItem(projectId, JSON.stringify(storedData));

		return sessionId;
	} catch (error) {
		console.error("Error starting survey:", error);
		throw error;
	}
};

// Function to send survey data to the server
const sendSurveyData = async (data) => {
	const sessionId = data.sessionId;
	if (!sessionId) {
		console.error("No sessionId found. Please start the survey first.");
		return;
	}
	try {
		console.log(`Sending survey data for sessionId: ${sessionId}`);
		await putRequest(
			`${api_end_point}/respondent-session/updateSessionInteraction/${sessionId}`,
			data,
		);
		console.log("Survey data sent successfully");
	} catch (error) {
		console.error("Error sending survey data:", error);
	}
};

// Utility function to extract projectId from the URL
const getProjectIdFromUrl = () => {
	try {
		console.log("Extracting projectId from URL");
		const urlParts = window.location.pathname.split("/");
		const projectIdIndex = urlParts.indexOf("s3") + 1;
		if (projectIdIndex > 0 && projectIdIndex < urlParts.length) {
			const projectId = urlParts[projectIdIndex];
			console.log(`Extracted projectId: ${projectId}`);
			return projectId;
		}
		throw new Error("ProjectId not found in URL");
	} catch (error) {
		console.error("Error extracting projectId from URL:", error);
		return null;
	}
};

// Update startTracking to pass sessionId to QuestionTracking
const startTracking = async (projectId, useCookie = false) => {
	try {
		console.log(`Starting tracking for projectId: ${projectId}`);
		const sessionId = await generateSessionId(projectId, useCookie);
		const questionText = extractQuestionText();
		console.log(`Tracking question: ${questionText}`);
		const questionTracking = new QuestionTracking(
			questionText,
			sessionId,
			projectId,
		);

		questionTracking
			.addStrategy(MouseClickStrategy)
			.addStrategy(DevToolsStrategy)
			.addStrategy(VisibilityChangeStrategy)
			.addStrategy(ResolutionChangeStrategy)
			.addStrategy(TextSelectionStrategy)
			.addStrategy(TextCopyStrategy)
			.addStrategy(TextPasteStrategy)
			.addStrategy(UserAnswerStrategy)
			.addStrategy(NextQuestionButtonStrategy)
			.addStrategy(PageUnloadStrategy)
			.runStrategies();

		return questionTracking;
	} catch (error) {
		console.error("Error initializing tracking functions:", error);
	}
};

// Example usage
try {
	const projectId = getProjectIdFromUrl();
	if (projectId) {
		startTracking(projectId);
	} else {
		console.error("Failed to start tracking: projectId is null");
	}
} catch (error) {
	console.error("Error initializing tracking functions:", error);
}

// each tracking survey is stored with a unique id which called sessionId.
// the sessionId is generated by the server and sent to the client in the response of the survey.
// 1. the client sends a request to the server to start the survey. (call API POST)
// 2. the server generates a sessionId and sends it to the client.
// 3. the client stored the sessionId in localStorage.
// 4. the client starts the survey tracker with the sessionId.
// 5. the client sends the survey tracker data to the server. (call API PUT)
// 6. the server stores the survey tracker data with the sessionId.
// 7. the client can send the survey tracker data to the server at any time.
// 8. the client can get the survey tracker data from the server at any time.
