import { handleEventCapture } from "../tracking/eventHandler";
import { EVENT_TYPES } from "../tracking/constants";
import { TrackingStrategy } from "./TrackingStrategy";
import { extractQuestionText } from "../tracking/utils";

export class MainSurveyAnswerStrategy extends TrackingStrategy {
	execute() {
		this.initListeners();
	}

	initListeners() {
		try {
			if (!isMainSurveyPage()) return;

			const questionBody = document.getElementById("questionBody");
			if (!questionBody) return;

			const observer = new MutationObserver((mutationsList) => {
				let newQuestionLoaded = false;

				for (const mutation of mutationsList) {
					if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
						if (
							mutation.target?.nodeType === Node.ELEMENT_NODE &&
							mutation.target?.className?.includes("questionPreview__text")
						) {
							newQuestionLoaded = true;
							break;
						}
					}
				}

				if (newQuestionLoaded) {
					observer.disconnect();

					setTimeout(() => {
						this.captureAnswers();
						this.initListeners();
					}, 500);
				}
			});

			observer.observe(questionBody, {
				childList: true,
				subtree: true,
			});

			questionBody.addEventListener("input", (event) => {
				if (event.target.matches('input[type="text"]')) {
					this.captureAnswers();
				}
			});

			const radioInputs = questionBody.querySelectorAll('input[type="radio"]');
			for (const input of radioInputs) {
				input.addEventListener("change", () => {
					this.captureAnswers();
				});
			}

			const checkboxInputs = questionBody.querySelectorAll(
				'input[type="checkbox"]',
			);
			for (const input of checkboxInputs) {
				input.addEventListener("change", () => {
					this.captureAnswers();
				});
			}
		} catch (error) {
			console.error("Error in MainSurveyAnswerStrategy:", error);
		}
	}

	captureAnswers() {
		const answers = [];

		const rankingBlocks = document.querySelectorAll(
			".questionPreview__rankingBlock",
		);

		for (const block of rankingBlocks) {
			const rankValue = block
				.querySelector(".questionPreview__rankingValue")
				.textContent.trim();
			const label = block
				.querySelector(".questionPreview__rankingCheckbox span span")
				.textContent.trim();
			if (rankValue !== "#") {
				answers.push(`${label} (Rank: ${rankValue})`);
			}
		}

		const selectedOption = document.querySelector(
			'input[type="radio"]:checked',
		);
		if (selectedOption) {
			const label = selectedOption.closest("label");
			if (label) {
				let answerText = label.textContent.trim();
				const textInput = selectedOption
					.closest(".AnswerFieldChoiceWithText__item")
					?.querySelector('input[type="text"]');
				if (textInput?.value?.trim()) {
					answerText += `: ${textInput.value.trim()}`;
				}
				answers.push(answerText);
			}
		}

		const selectedCheckboxes = document.querySelectorAll(
			'input[type="checkbox"]:checked',
		);
		for (const checkbox of selectedCheckboxes) {
			const label = checkbox.closest("label");
			if (label) {
				answers.push(label.textContent.trim());
			}
		}

		const textInput = document.querySelector(
			'.questionPreview__answer input[type="text"]',
		);
		if (textInput?.value?.trim()) {
			answers.push(textInput.value.trim());
		}

		if (answers.length > 0) {
			const questionText = extractQuestionText();
			this.questionTracking.setAnswer(answers.join(", "));
			this.questionTracking.questionText = questionText;

			handleEventCapture(
				EVENT_TYPES.answer_question,
				{ answers },
				this.questionTracking,
			);
		}
	}

	reinitialize() {
		// This method is now managed by the MutationObserver
	}
}
