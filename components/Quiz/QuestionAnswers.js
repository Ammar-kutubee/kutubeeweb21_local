import React, { useEffect, useState } from 'react';

import ImageAnswer from './ImageAnswer';
import TextAnswer from './TextAnswer';
import TextAnswerPlacement from './TextAnswerPlacement';

export default function QuestionAnswers({
	placementTest,
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
	questionTypee,
	placeHolderr,
	onSelectMultipleAnswers,
}) {
	return (
		<div className={` answersWrapper ${answerType == 'image' ? 'answersWrapperImages' : ''}`}>
			{/* [ ] check if the placeholder is not changing with english or arabic (based on language) */}
			{questionTypee === 'open' ? (
				<textarea
					className='openAnswerTag'
					name='text'
					type='text'
					rows='14'
					cols='10'
					placeholder={placeHolderr}
					wrap='soft'
					style={{
						height: '36.6vh',
						width: '71.5vw',
						marginTop: '5vh',
						boxShadow: '0px 0px 10px 2px rgba(37, 39, 38, 0.047476)',
						borderRadius: '8px',
					}}
				/>
			) : questionTypee === 'multiple_answers' ? (
				answers?.map((answer, index) => {
					if (answerType == 'image') {
						return (
							<ImageAnswer
								placementTest={placementTest}
								secondAttmept={secondAttmept}
								currentLanguage={currentLanguage}
								highlight={playedAnswerAudio == index}
								hideRightAnswer={hideRightAnswer}
								selectedAnswerData={selectedAnswerData}
								// selected={selectedAnswer == index}
								selected={selectedAnswer?.includes(index)}
								answer={answer}
								index={index}
								onSelectAnswer={onSelectAnswer}
								currentSelectedAnswer={currentSelectedAnswer}
								onSelectMultipleAnswers={onSelectMultipleAnswers}
								questionTypee={questionTypee}
							/>
						);
					} else {
						if (placementTest === true) {
							return (
								<TextAnswerPlacement
									secondAttmept={secondAttmept}
									wrongAnswers={wrongAnswers}
									currentLanguage={currentLanguage}
									highlight={playedAnswerAudio == index}
									hideRightAnswer={hideRightAnswer}
									selectedAnswerData={selectedAnswerData}
									// selected={selectedAnswer == index}
									selected={selectedAnswer?.includes(index)}
									answer={answer}
									index={index}
									onSelectAnswer={onSelectAnswer}
									currentSelectedAnswer={currentSelectedAnswer}
									onSelectMultipleAnswers={onSelectMultipleAnswers}
									questionTypee={questionTypee}
								/>
							);
						} else {
							return (
								<TextAnswer
									placementTest={placementTest}
									secondAttmept={secondAttmept}
									wrongAnswers={wrongAnswers}
									currentLanguage={currentLanguage}
									highlight={playedAnswerAudio == index}
									hideRightAnswer={hideRightAnswer}
									selectedAnswerData={selectedAnswerData}
									// selected={selectedAnswer == index}
									selected={selectedAnswer?.includes(index)}
									// selected={selectedAnswer}
									answer={answer}
									index={index}
									onSelectAnswer={onSelectAnswer}
									currentSelectedAnswer={currentSelectedAnswer}
									onSelectMultipleAnswers={onSelectMultipleAnswers}
									questionTypee={questionTypee}
								/>
							);
						}
					}
				})
			) : (
				answers?.map((answer, index) => {
					if (answerType == 'image') {
						return (
							<ImageAnswer
								placementTest={placementTest}
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
								onSelectMultipleAnswers={onSelectMultipleAnswers}
								questionTypee={questionTypee}
							/>
						);
					} else {
						if (placementTest === true) {
							return (
								<TextAnswerPlacement
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
									onSelectMultipleAnswers={onSelectMultipleAnswers}
									questionTypee={questionTypee}
								/>
							);
						} else {
							return (
								<TextAnswer
									placementTest={placementTest}
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
									onSelectMultipleAnswers={onSelectMultipleAnswers}
									questionTypee={questionTypee}
								/>
							);
						}
					}
				})
			)}
		</div>
	);
}
