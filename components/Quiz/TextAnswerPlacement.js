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
	return (
		<div
			onClick={() => {
				onSelectAnswer(index);
			}}
			key={index}
			className='answerWrapper'
		>
			<div
				className={`textAnswerNumber ${selected ? 'selected' : ''} ${
					selectedAnswerData != null && selected ? (secondAttmept ? null : selectedAnswerData.correct ? '' : '') : ''
				}`}
			>
				{currentLanguage == 'ar' && directSort !== 'sorting' ? '.' + (index + 1) : index + 1 + '.'}
			</div>

			<div className='answerBoxShadow'>
				<div className={`textAnswerBox ${highlight ? 'textAnswerBoxHighlight' : ''}`}>
					<div
						className={`textAnswerText ${selected ? 'selected' : ''} ${
							selectedAnswerData != null && selected ? (secondAttmept ? null : selectedAnswerData.correct ? '' : '') : ''
						}`}
					>
						{answer.name}
					</div>
				</div>
				<div
					className={`textAnswerBoxBorder 
                        ${selected ? 'border-blue' : ''} 
                        ${selectedAnswerData != null && selected ? (secondAttmept ? null : selectedAnswerData.correct ? '' : '') : ''} 
                        ${correctDndtAnswers === true ? 'true-green-border' : ''}`}
				/>
			</div>
		</div>
	);
}
