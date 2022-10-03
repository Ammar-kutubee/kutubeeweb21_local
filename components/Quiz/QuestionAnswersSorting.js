import React, { useState, useEffect } from 'react';
// import { render } from 'react-dom';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import TextAnswer from './TextAnswer';
import ImageAnswer from './ImageAnswer';

// import arrayMove from 'array-move';  // do we need it here?

const SortableItem = sortableElement(({ value, props, index, index2 }) => {
	return props.answerType == 'image' ? (
		<ImageAnswer
			currentLanguage={props.currentLanguage}
			correctDndtAnswers={props.correctDndtAnswers}
			// highlight={props.playedAnswerAudio == index}
			highlight={props.playedAnswerAudio == index2}
			hideRightAnswer={props.hideRightAnswer}
			selectedAnswerData={props.selectedAnswerData}
			// selected={props.selectedAnswer == index}
			selected={props.selectedAnswer == index2}
			// answer={answer}
			answer={value}
			// index={index} // will give Nan to numbering
			index={index2}
			onSelectAnswer={props.onSelectAnswer}
			currentSelectedAnswer={props.currentSelectedAnswer}
			directSort='sorting'
		/>
	) : (
		<TextAnswer
			correctDndtAnswers={props.correctDndtAnswers}
			currentLanguage={props.currentLanguage}
			highlight={props.playedAnswerAudio == index2}
			hideRightAnswer={props.hideRightAnswer}
			selectedAnswerData={props.selectedAnswerData}
			selected={props.selectedAnswer == index2}
			answer={value}
			index={index2}
			onSelectAnswer={props.onSelectAnswer}
			currentSelectedAnswer={props.currentSelectedAnswer}
			directSort='sorting'
		/>
	);
});

const SortableContainer = sortableContainer(({ children }) => {
	return (
		// TODO REVERT IN CASE OF SORTING HORZINTALLY ERROR
		<ul
			className='SortUlTag'
			style={{
				margin: '0 auto',
				width: '90%',
				display: 'grid',
				// direction: 'rtl',
				// gridTemplateColumns: '1fr 1fr 1fr 1fr ',
				gridTemplateColumns: '1fr ',
				justifyContent: 'center',
				alignItems: 'center',
				gap: 10,
				float: 'right',
			}}
		>
			{children}
		</ul>
	);
});

function QuestionSorting(props) {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(props.answers);
		props.setUserOrder(props.answers);
	}, [props.answers]);
	console.log(props);

	const onSortEnd = ({ oldIndex, newIndex }) => {
		let array = [...items];
		let fromIndex = oldIndex;
		let toIndex = newIndex;

		let startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

		if (startIndex >= 0 && startIndex < array.length) {
			let endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

			let [item] = array.splice(fromIndex, 1);
			array.splice(endIndex, 0, item);
		}

		props.setUserOrder(array);

		setItems(array);
	};

	return (
		<SortableContainer onSortEnd={onSortEnd} axis='y' lockAxis='y'>
			{items.map((answer, index) => {
				return (
					<SortableItem
						className='SortingImgs'
						key={`item-${index}`}
						props={props}
						index={index}
						index2={index}
						value={answer}
						style={{ paddingRight: 14, paddingLeft: 14 }}
					/>
				);
			})}
		</SortableContainer>
	);
}

export default QuestionSorting;
