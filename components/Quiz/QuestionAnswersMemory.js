import React, { useState, useEffect } from 'react';
// import { render } from 'react-dom';
// import { useNavigate, Link } from 'react-router-dom';

import SingleCard from './SingleCard.js';

// const pageFlip = new Audio('./sounds/page-flip1.mp3');

function QuestionMemory({ answers, nextQuestion, selectedAnswerData, onQuestionCheck, questionTagg }) {
	console.log('ansssweers', answers);
	console.log('selectedAnswerData', selectedAnswerData);
	const matchAudio = new Audio('./sounds/page-flip1.mp3');
	const winAudio = new Audio('./sounds/sfx/quiz/correct_5.mp3');

	// console.log('propsss???', props);

	const cardsImages = [];

	answers &&
		answers?.map((answer) => {
			let obj = {
				src: answer.name || 'No Image added',
				matched: false,
			};
			cardsImages.push(obj);
		});

	// required structure :=>
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
	};

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);

			if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
				console.log('thats a match yay :)');
				matchAudio.play();

				setScore(score + 1);
				setTimeout(() => {
					setFaded(false);
					setCards((prevCards) => {
						return prevCards.map((card) => {
							if (card.src === choiceOne.src) {
								return { ...card, matched: true };
							} else {
								return card;
							}
						});
					});
					resetTurn();
				}, 500);
				setFaded(true);

				// setTimeout(() => {}, 1350);
			} else {
				console.log('no match :(');
				setTimeout(() => {
					resetTurn();
				}, 1500);
			}
		}

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
			// console.log('im in all matched cuz its true');
			winAudio.play();
			onQuestionCheck();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allMatched]);

	return (
		<div className='MemoryGame'>
			{/* <div className='questionTitle'>{questionTagg}</div> */}
			{/* 
			<button classname='AudioButton' onClick={() => playAudio()}>
				<img src='/audio.svg' alt='audio svg' />
			</button> */}

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
						choiceTwo={choiceTwo}
					/>
				))}
			</div>
			{/* <p>Turns : {turns}</p> */}
		</div>
	);
}

export default QuestionMemory;
