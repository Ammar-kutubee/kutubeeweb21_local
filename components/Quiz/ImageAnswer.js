import React from 'react';

export default function ImageAnswer({
	answer,
	secondAttmept,
	index,
	selected,
	onSelectAnswer,
	selectedAnswerData,
	hideRightAnswer,
	highlight,
	currentLanguage,
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
					selectedAnswerData != null && selected ? (secondAttmept ? null : selectedAnswerData.correct ? 'true-green' : 'false-red') : ''
				}`}
			>
				{currentLanguage == 'ar' ? '.' + (index + 1) : index + 1 + '.'}
			</div>

			<div className='answerBoxShadow'>
				<div className={`textAnswerBox ${highlight ? 'textAnswerBoxHighlight' : ''}`}>
					{/* TODO change img tag to Next Image , chnage width and height also (* + dynamic) */}
					<img
						src={answer.name}
						style={{
							width: '180px',
							height: 'auto',
							objectFit: 'contain',
							margin: 'auto',
							display: 'flex',
						}}
					/>
				</div>
				<div
					className={`textAnswerBoxBorder ${selected ? 'border-blue' : ''} ${
						selectedAnswerData != null && selected
							? secondAttmept
								? null
								: selectedAnswerData.correct
								? 'true-green-border'
								: 'false-red-border'
							: ''
					}`}
				/>
			</div>
		</div>
	);
}
