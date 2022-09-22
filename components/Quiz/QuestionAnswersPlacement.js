import React from 'react';

import ImageAnswer from './ImageAnswer';
import TextAnswer from './TextAnswer';

export default function QuestionAnswers({
	wrongAnswers,
	answers,
	secondAttmept,
	answersType,
	selectedAnswer,
	onSelectAnswer,
	currentSelectedAnswer,
	correct,
	selectedAnswerData,
	hideRightAnswer,
	playedAnswerAudio,
	answerType,
	currentLanguage,
}) {
	return (
		<div className={` answersWrapper ${answerType == 'image' ? 'answersWrapperImages' : ''}`}>
			{answers.map((answer, index) => {
				if (answerType == 'image') {
					return (
						<ImageAnswer
							secondAttmept={secondAttmept}
							currentLanguage={currentLanguage}
							highlight={playedAnswerAudio == index}
							hideRightAnswer={hideRightAnswer}
							selectedAnswerData={selectedAnswerData}
							selected={selectedAnswer == index}
							answer={answer}
							index={index}
							onSelectAnswer={onSelectAnswer}
							currentSelectedAnswer={currentSelectedAnswer}
						/>
					);
				} else {
					return (
						<TextAnswer
							secondAttmept={secondAttmept}
							wrongAnswers={wrongAnswers}
							currentLanguage={currentLanguage}
							highlight={playedAnswerAudio == index}
							hideRightAnswer={hideRightAnswer}
							selectedAnswerData={selectedAnswerData}
							selected={selectedAnswer == index}
							answer={answer}
							index={index}
							onSelectAnswer={onSelectAnswer}
							currentSelectedAnswer={currentSelectedAnswer}
						/>
					);
				}
			})}
		</div>
	);
}
