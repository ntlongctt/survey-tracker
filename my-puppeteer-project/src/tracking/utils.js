export const extractQuestionText = () => {
	try {
		let questionElement = document.querySelector(
			".questionPreview__text.recruitment__questionText",
		);

		if (!questionElement) {
			questionElement = document.querySelector(
				"#rcsrv .control-label.has-star",
			);
		}

		if (questionElement) {
			return questionElement.textContent.trim();
		}

		return "Unknown Question";
	} catch (error) {
		console.error("Error extracting question text:", error);
		return "";
	}
};

export const isMainSurveyPage = () => {
	const urlPattern = /\/ms\/\w+$/;
	return urlPattern.test(window.location.pathname);
};
