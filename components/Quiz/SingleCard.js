//rfc
import React from 'react';
// import './SignleCard.css';

export default function SignleCard({ card, handleChoice, flipped, disabled, faded, isMatched, choiceTwo }) {
	// console.log(disabled);
	const hadnleClick = () => {
		if (!disabled) {
			handleChoice(card);
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
		</div>
	);
}
