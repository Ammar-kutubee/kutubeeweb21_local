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
	directSort,
}) {
	return (
		<div
			onClick={() => {
				onSelectAnswer(index);
			}}
			key={index}
			className='answerWrapper'
			////add  currentLanguage tern if also check the font family error!
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
				<div
					className={`textAnswerBox ${highlight ? 'textAnswerBoxHighlight' : ''}`}
					style={{ width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
				>
					{/* TODO change img tag to Next Image , chnage width and height also (* + dynamic) */}
					<img
						src={answer.name}
						style={{
							width: '10vw',
							float: 'right',
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
					style={{ float: 'right' }}
				/>
			</div>
		</div>
	);
}
