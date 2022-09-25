import { sortableElement } from 'react-sortable-hoc';
import React, { useState, useEffect } from 'react';
import TextAnswer from './TextAnswer';
function SortableItem(props) {
	return sortableElement(({ value }) => {
		// return <div>value</div>;
		return (
			<TextAnswer
				currentLanguage={props.currentLanguage}
				highlight={props.playedAnswerAudio == index}
				hideRightAnswer={props.hideRightAnswer}
				selectedAnswerData={props.selectedAnswerData}
				selected={props.selectedAnswer == index}
				answer={value}
				index={index}
				onSelectAnswer={props.onSelectAnswer}
				currentSelectedAnswer={props.currentSelectedAnswer}
			/>
		);

		// });
	});
}

export default SortableItem;
