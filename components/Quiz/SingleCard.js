//rfc
import React from 'react';
// import useSound from 'use-sound';
// import ReactAudioPlayer from 'react-audio-player';
// import pageFlips from '../../public/sounds/page-flip.mp3';
// import './SignleCard.css';

// const musicPlayers = (useRef < HTMLAudioElement) | (undefined > (typeof Audio !== 'undefined' ? new Audio('') : undefined));

export default function SignleCard({ card, handleChoice, flipped, disabled, faded, isMatched, choiceTwo }) {
	// console.log(disabled);
	// const [playActive] = useSound(pageFlips, { volume: 0.25 });
	const pageFlip = new Audio('./sounds/sfx/quiz/adriantnt_u_click.mp3');

	const hadnleClick = () => {
		if (!disabled) {
			handleChoice(card);
			// playActive;
			pageFlip.play();
			// musicPlayers?.play();
		}
	};

	return (
		<div className='card' key={card.id}>
			<div
				className={`${flipped ? (choiceTwo !== null ? (!isMatched && !faded ? 'flippedWrong' : 'flipped') : 'flipped') : ''}  ${
					isMatched ? 'faded' : ''
				}`}
			>
				<img className='frontOfCard' src={card.src} alt='front Of Card <3' />

				{/* in case you want to retrieve the old image */}
				{/* <img
					className='backOfCard preload-images'
					src='/yellowQ(1).jpg'
					onClick={hadnleClick}
					alt='❔'
					style={{ height: 14vw, width: 14vw }}
				/> */}
				<p className='backOfCard preload-images' onClick={hadnleClick} style={{ height: '14vw', width: '14vw', userSelect: 'none' }}>
					?
				</p>
			</div>
			{/* <ReactAudioPlayer src='./sounds/page-flip.mp3' autoPlay controls /> */}
		</div>
	);
}
