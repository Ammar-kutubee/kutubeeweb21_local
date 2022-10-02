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
}) {
	const clickAudio = new Audio('./sounds/sfx/quiz/adriantnt_u_click.mp3');

	return (
		<div
			onClick={() => {
				onSelectAnswer(index);
				clickAudio.play();
			}}
			key={index}
			className='answerWrapper'
			//add  currentLanguage tern if
			style={{ gap: '1.5vw', float: 'left', direction: 'rtl' }}
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
