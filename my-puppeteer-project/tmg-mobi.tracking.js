// ==UserScript==
// @name         Long Test
// @namespace    http://tampermonkey.net/
// @version      2025-01-08
// @description  TGM Mobi no BE
// @author       You
// @match        *://tgm.mobi/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

/**
  the survey is separated into 2 parts:
  1: the pre-survey which the user will answer some trap questions,
  2: the main survey which the user will answer the real questions
 
  the pre-survey is build with the normal js code so the page will reload when the user answer the questions
  the main survey is build with the react js code so the page will not reload when the user answer the questions
 
  we should track the pre-survey and the main survey also
  the pre-survey and the main survey is has different DOM structure to display questions, so we should have strategies to get the question content
  and the answer from the DOM for both surveys
  the example DOM of the pre-survey is:
    <form id="rcsrv" class="form-vertical" action="/rcs/VCD9207" method="post">
    <input type="hidden" name="_csrf" value="zJTQmwd1PYmQkQeWyxmnmd6cM935JS_VLCvaSJqcVFC9x_3QcyYEv-j3ZvyZbejxv9d-qchMRr1tHpAtwNYWBw=="><div class="form-group highlight-addon field-profilequestion-uuid">
    <input type="hidden" id="profilequestion-uuid" class="form-control" name="ProfileQuestion[uuid]" value="e988c45b-2dd8-11e9-a731-309c232a16d8">
    <div class="help-block"></div>
    </div><input type="hidden" id="data" name="data" value="">    <div class="" style="">
            <div class="form-group highlight-addon field-profilequestion-value required">
    <label class="control-label has-star"><b>Are you?</b></label>
    <input type="hidden" name="ProfileQuestion[value]" value=""><div id="profilequestion-value" role="radiogroup" aria-required="true"><div class="radio"><label><input type="radio" id="profilequestion-value--0" name="ProfileQuestion[value]" value="0" data-index="0" data-sharkid="__0"> Male</label></div>
    <div class="radio"><label><input type="radio" id="profilequestion-value--1" name="ProfileQuestion[value]" value="1" data-index="1" data-sharkid="__1"> Female</label></div></div>
    <div class="help-block"></div>

    </div>    </div>
        <button type="submit" id="rcsrv-submit-btn" class="btn btn-primary form-control recruitment-btn">Next</button>
    </form>
 */

const api_end_point = "https://tgm-backend.onrender.com/api";

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
	answer_question: "answer-question",
};

const generateSessionId = async (projectId) => {
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
		const storedData =
			JSON.parse(sessionStorage.getItem("surveySession")) || {};

		// Check if sessionId exists and is not expired (e.g., 30 minutes expiry)
		if (storedData.sessionId) {
			console.log(`Found existing sessionId: ${storedData.sessionId}`);
			return storedData.sessionId;
		}

		const response = await postRequest(`${api_end_point}/respondent-session`, {
			projectId,
		});
		const sessionId = response.data.sessionId;
		console.log(`New sessionId generated: ${sessionId}`);

		// Store the sessionId under the fixed key "surveySession"
		sessionStorage.setItem("surveySession", JSON.stringify({ sessionId }));

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
		// const projectIdIndex = urlParts.indexOf("survey") + 1;
		if (urlParts.length > 2) {
			const projectId = urlParts.at(2);
			console.log(`Extracted projectId: ${projectId}`);
			return projectId;
		}
		throw new Error("ProjectId not found in URL");
	} catch (error) {
		console.error("Error extracting projectId from URL:", error);
		return null;
	}
};

// Add the PreSurveyAnswerStrategy class
class PreSurveyAnswerStrategy extends TrackingStrategy {
	execute() {
		try {
			const form = document.getElementById("rcsrv");
			if (form) {
				form.addEventListener("submit", (event) => {
					// Optionally prevent form submission for testing
					// event.preventDefault();

					const formData = new FormData(form);
					let answers = "";

					for (const [key, value] of formData.entries()) {
						if (key === "ProfileQuestion[value]") {
							// Check if the input is a radio or checkbox
							const inputElement = form.querySelector(
								`input[name="${key}"][value="${value}"]`,
							);
							if (
								inputElement &&
								(inputElement.type === "radio" ||
									inputElement.type === "checkbox")
							) {
								// Get the label text for the radio or checkbox
								const labelElement = inputElement.closest("label");
								if (labelElement) {
									answers = labelElement.textContent.trim();
								}
							} else {
								// For other input types, use the value directly
								answers = value;
							}
						}
					}

					this.questionTracking.setAnswer(answers);
					handleEventCapture(
						EVENT_TYPES.answer_question,
						{ answers },
						this.questionTracking,
					);

					// Optionally, you can submit the form after capturing the data
					// form.submit();
				});
			}
		} catch (error) {
			console.error("Error in PreSurveyAnswerStrategy:", error);
		}
	}
}

// Update startTracking to include PreSurveyAnswerStrategy
const startTracking = async (projectId) => {
	try {
		console.log(`Starting tracking for projectId: ${projectId}`);
		const sessionId = await startSurvey(projectId);
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
			.addStrategy(PreSurveyAnswerStrategy)
			.addStrategy(NextQuestionButtonStrategy)
			.addStrategy(PageUnloadStrategy)
			.runStrategies();

		return questionTracking;
	} catch (error) {
		console.error("Error initializing tracking functions:", error);
	}
};
