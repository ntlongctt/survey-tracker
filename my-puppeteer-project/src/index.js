import { generateSessionId, updateSessionData } from "./tracking/session";
import { DevToolsStrategy } from "./strategies/DevToolsStrategy";
import { VisibilityChangeStrategy } from "./strategies/VisibilityChangeStrategy";
import { ResolutionChangeStrategy } from "./strategies/ResolutionChangeStrategy";
import { TextSelectionStrategy } from "./strategies/TextSelectionStrategy";
import { TextCopyStrategy } from "./strategies/TextCopyStrategy";
import { TextPasteStrategy } from "./strategies/TextPasteStrategy";
import { MouseClickStrategy } from "./strategies/MouseClickStrategy";
import { UserAnswerStrategy } from "./strategies/UserAnswerStrategy";
import { NextQuestionButtonStrategy } from "./strategies/NextQuestionButtonStrategy";
import { PageUnloadStrategy } from "./strategies/PageUnloadStrategy";
import { PreSurveyAnswerStrategy } from "./strategies/PreSurveyAnswerStrategy";
import { MainSurveyAnswerStrategy } from "./strategies/MainSurveyAnswerStrategy";
import { extractQuestionText, isMainSurveyPage } from "./tracking/utils";
// Import other strategies and utilities as needed

export {
	generateSessionId,
	updateSessionData,
	DevToolsStrategy,
	VisibilityChangeStrategy,
	ResolutionChangeStrategy,
	TextSelectionStrategy,
	TextCopyStrategy,
	TextPasteStrategy,
	MouseClickStrategy,
	UserAnswerStrategy,
	NextQuestionButtonStrategy,
	PageUnloadStrategy,
	PreSurveyAnswerStrategy,
	MainSurveyAnswerStrategy,
	extractQuestionText,
	isMainSurveyPage,
	// Export other strategies and utilities
};
