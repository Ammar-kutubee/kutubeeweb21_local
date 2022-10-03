import React from 'react';

export default function TextAnswer({
	placementTest,
	correctDndtAnswers,
	answer,
	secondAttmept,
	index,
	selected,
	onSelectAnswer,
	selectedAnswerData,
	hideRightAnswer,
	highlight,
	currentLanguage,
	directSort,
	onSelectMultipleAnswers,
	questionTypee,
}) {
	const clickAudio = new Audio('./sounds/sfx/quiz/adriantnt_u_click.mp3');

	console.log(
		// placementTest,
		// correctDndtAnswers,
		// answer,
		// secondAttmept,
		// index,
		selected
		// onSelectAnswer,
		// selectedAnswerData,
		// hideRightAnswer,
		// highlight,
		// currentLanguage,
		// directSort,
		// onSelectMultipleAnswers
		// questionTypee
	);
	console.log('plzzzzzzzzz', selectedAnswerData);
	let Lang = 'rtl';
	if (currentLanguage === 'ar') {
		Lang = 'rtl';
	} else Lang = 'ltr';
	return (
		<div
			onClick={(e) => {
				// console.log(e);
				if (questionTypee === 'multiple_answers') {
					// if (answer.correct) {
					// 	onSelectMultipleAnswers(index);
					// }
					onSelectMultipleAnswers(index);
					// onSelectAnswer(index);
				} else onSelectAnswer(index);
				clickAudio.play();
			}}
			key={index}
			className='answerWrapper'
			//add  currentLanguage tern if
			style={{ gap: '1.5vw', direction: Lang }}
		>
			<div
				className={`textAnswerNumber ${selected ? 'selected' : ''} ${
					selectedAnswerData != null && selected ? (secondAttmept ? null : selectedAnswerData.correct ? 'true-green' : 'false-red') : ''
				}`}
			>
				{currentLanguage == 'ar' && directSort !== 'sorting' ? '.' + (index + 1) : index + 1 + '.'}
			</div>
			<div className='answerBoxShadow'>
				<div className={`textAnswerBox ${highlight ? 'textAnswerBoxHighlight' : ''}`}>
					<div
						className={`textAnswerText ${selected ? 'selected' : ''} ${
							selectedAnswerData != null && selected ? (secondAttmept ? null : selectedAnswerData.correct ? 'true-green' : 'false-red') : ''
						}`}
					>
						{answer.name}
					</div>
				</div>
				<div
					className={`textAnswerBoxBorder 
                        ${selected ? 'border-blue' : ''} 
                        ${
													selectedAnswerData != null && selected
														? secondAttmept
															? null
															: selectedAnswerData.correct
															? 'true-green-border'
															: 'false-red-border'
														: ''
												} 
                        ${correctDndtAnswers === true ? 'true-green-border' : ''}`}
				/>
			</div>
		</div>
	);
}
