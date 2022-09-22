import React, { useState, useEffect } from 'react';
// import { render } from 'react-dom';
import { useNavigate, Link } from 'react-router-dom';

import SingleCard from './SingleCard.js';

import TextAnswer from './TextAnswer';
import ImageAnswer from './ImageAnswer';

function QuestionMemory({ answers, nextQuestion, selectedAnswerData, onQuestionCheck }) {
	console.log('ansssweers', answers);
	console.log('selectedAnswerData', selectedAnswerData);
	// console.log('propsss???', props);

	// cardsImagesMapped=answers.map((ele)=>(ele.sr)) //keep in mind

	const cardsImages = [];

	answers &&
		answers.map((answer) => {
			let obj = {
				src: answer.name || 'image not loaded check console',
				matched: false,
			};
			cardsImages.push(obj);
		});

	// const cardsImages = [
	// 	{ src: answers[0]?.name, matched: false },
	// 	{ src: answers[1]?.name, matched: false },
	// 	{ src: answers[2]?.name, matched: false },
	// 	{ src: answers[3]?.name, matched: false },
	// ];

	//for game
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const [allMatched, setAllMatched] = useState(false);
	const [faded, setFaded] = useState(false);
	const [score, setScore] = useState(0);

	//for audio
	const [playing, setPlaying] = useState(false);

	const shuffle = () => {
		// shuffle the cards based on sort each item in the array (positive number will switch the position / negative number will keep the position)
		const shuffledCards = [...cardsImages, ...cardsImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));
		setCards(shuffledCards);
		setTurns(0);

		//just in case OF BUGS
		setChoiceOne(null);
		setChoiceTwo(null);
		setDisabled(false);
		setAllMatched(false);
	};

	// eachtime start a new game automatically & shuffle the cards
	useEffect(() => {
		shuffle();
	}, []);

	// console.log('cards', cards);
	console.log('turns', turns);
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
		// setDisabled(true);
		// console.log('choiceOne', choiceOne);
		// console.log('choiceTwo', choiceTwo);
	};

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
				console.log('thats a match yay :)');
				setScore(score + 1);
				setFaded(true);

				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});

				// console.log('allMatched??', allMatched);
				setTimeout(() => {
					resetTurn();
				}, 700);
			} else {
				console.log('no match :(');
				setTimeout(() => {
					resetTurn();
				}, 700);
			}

			// setTurns(turns + 1);
		}

		// eslint-disable-next-line array-callback-return

		// check if every card has matched as true
		// if (cards?.every((card) => card.matched === true)) {
		// 	setAllMatched(true);
		// }

		// eslint-disable-next-line  array-callback-return
		// cards.every((card) => {
		// 	if (card.matched === true && card.matched !== false) {
		// 		setAllMatched(true);
		// 	}
		// });
		// cards.every(isAllMatched);

		// function isAllMatched(el, index, arr) {
		// 	el.matched === true ? setAllMatched(true) : setAllMatched(false);
		// }

		if (score === cardsImages.length && score !== 0) {
			setAllMatched(true);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [choiceOne, choiceTwo]);

	console.log('check state new', cards);

	// reset choices choosen and increase the turns
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prevTurns) => prevTurns + 1);
		setDisabled(false);
	};

	const playAudio = () => {
		if (!playing) {
			// audio.play();
		}
		setTimeout(() => {
			// audio.pause();
			setPlaying(false);
		}, 9000);
		setPlaying(true);
	};

	useEffect(() => {
		if (allMatched) {
			console.log('im in all matched cuz its true');
			// and send to parent that the game is solved / done
			//-> here

			// nextQuestion();
			onQuestionCheck();
			// trigger this and you will be fine
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allMatched]);

	return (
		<div className='MemoryGame' style={{ display: 'flex', flexDirection: 'column' }}>
			<button onClick={() => playAudio()}>
				<img src='/audio.svg' alt='audio svg' />
			</button>

			{/* <button onClick={shuffle}>New Game</button> */}

			<div className='cards-grid'>
				{cards.map((card) => (
					<SingleCard
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
						disabled={disabled}
						faded={faded}
						isMatched={card.matched}
					/>
				))}
			</div>
			{/* <p>Turns : {turns}</p> */}
		</div>
	);
}

export default QuestionMemory;
