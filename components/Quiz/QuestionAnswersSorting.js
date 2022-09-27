// import React from 'react'

// import ImageAnswer from './ImageAnswer'
// import TextAnswer from './TextAnswer'

// export default function QuestionAnswers({ answers, answersType, selectedAnswer, onSelectAnswer, currentSelectedAnswer, correct, selectedAnswerData, hideRightAnswer, playedAnswerAudio, answerType, currentLanguage }) {
//     return (
//         <div className={` answersWrapper ${answerType == 'image' ? 'answersWrapperImages' : ''}`}>
//             {answers.map((answer, index) => {
//                 if (answerType == 'image') {
//                     return <ImageAnswer currentLanguage={currentLanguage} highlight={playedAnswerAudio == index} hideRightAnswer={hideRightAnswer} selectedAnswerData={selectedAnswerData} selected={selectedAnswer == index} answer={answer} index={index} onSelectAnswer={onSelectAnswer} currentSelectedAnswer={currentSelectedAnswer} />
//                 } else {
//                     return <TextAnswer currentLanguage={currentLanguage} highlight={playedAnswerAudio == index} hideRightAnswer={hideRightAnswer} selectedAnswerData={selectedAnswerData} selected={selectedAnswer == index} answer={answer} index={index} onSelectAnswer={onSelectAnswer} currentSelectedAnswer={currentSelectedAnswer} />
//                 }

//             })}
//         </div>
//     )
// }

import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import TextAnswer from './TextAnswer';
import ImageAnswer from './ImageAnswer';

// import arrayMove from 'array-move';  // do we need it here?

const SortableItem = sortableElement(({ value, props, index, index2 }) => {
	console.log('props.currentLanguage', index2);
	console.log('1111', value);

	console.log('2222', props); //

	console.log('3333', index); //undefined
	// console.log(sortableContainer);

	return props.answerType == 'image' ? (
		<ImageAnswer
			currentLanguage={props.currentLanguage}
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
		/>
	);

	//     return(
	//     <div className="answerWrapper">
	//             <div className="answerBoxShadow"><div className="textAnswerBox "><div className="textAnswerText  ">{value.name}</div></div><div className="textAnswerBoxBorder  "></div>    </div>
	// </div>)
});

const SortableContainer = sortableContainer(({ children }) => {
	return (
		// TODO REVERT IN CASE OF SORTING HORZINTALLY ERROR + FIX GAME
		<ul className='SortUlTag' style={{ display: 'flex', gap: 15 }}>
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

		// DO YOU NEED NEXT QUESTION PASS?
		// setTimeout(() => {
		// 	props.nextQuestion();
		// }, 3000);

		// this.setState(({items}) => ({
		//   items: arrayMove(items, oldIndex, newIndex),
		// }));
	};

	return (
		<SortableContainer onSortEnd={onSortEnd} axis='y'>
			{/* TODO check sorting use te rendered list and correct list from api (#id is the !) */}
			{/* <div style={{ display: 'flex', gap: '19px', marginTop: 46, alignItems: 'center', justifyContent: 'center' }}>
				{props.answers?.map((ele) => {
					return (
						<div
							className='SortingText'
							style={{
								width: 136,
								height: 60,
								boxSizing: 'border-box',
								border: ' 1px solid #E5E5E5',
								boxShadow: ' 0px 0px 10px 2px rgba(37, 39, 38, 0.047476)',
								borderRadius: 8,
								fontFamily: 'FF Hekaya ',
								fontSize: '48px',
								textAlign: 'center',
								lineHeight: '49px',
							}}
						>
							{ele?.nameText}
						</div>
					);
				})}
			</div> */}
			{items.map((answer, index) => {
				// if (props.answerType == 'image') {
				// 	return sortableElement(
				// 		<ImageAnswer
				// 			currentLanguage={props.currentLanguage}
				// 			highlight={props.playedAnswerAudio == index}
				// 			hideRightAnswer={props.hideRightAnswer}
				// 			selectedAnswerData={props.selectedAnswerData}
				// 			selected={props.selectedAnswer == index}
				// 			answer={answer}
				// 			index={index}
				// 			onSelectAnswer={props.onSelectAnswer}
				// 			currentSelectedAnswer={props.currentSelectedAnswer}
				// 		/>
				// 	);
				// } else {
				// 	return sortableElement(
				// 		<TextAnswer
				// 			currentLanguage={props.currentLanguage}
				// 			highlight={props.playedAnswerAudio == index}
				// 			hideRightAnswer={props.hideRightAnswer}
				// 			selectedAnswerData={props.selectedAnswerData}
				// 			selected={props.selectedAnswer == index}
				// 			answer={answer}
				// 			index={index}
				// 			onSelectAnswer={props.onSelectAnswer}
				// 			currentSelectedAnswer={props.currentSelectedAnswer}
				// 		/>
				// 	);
				// }

				return (
					<div>
						<SortableItem className='SortingImgs' key={`item-${index}`} props={props} index={index} index2={index} value={answer} />
						{/* <div style={{ boxSizing: 'border-box', width: 194, height: 50, border: '1px dashed #B1B1B1' }}></div> */}
					</div>
				);
			})}
		</SortableContainer>
	);
}

export default QuestionSorting;
