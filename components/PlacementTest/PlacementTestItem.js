import React from 'react';

const PlacementTestItem = ({ selected, data, index, onSelect }) => {
	return (
		<div>
			<div
				key={data._id}
				onClick={() => {
					onSelect(index);
				}}
				// key={index}
				className='panswerWrapper'
			>
				<div className='panswerBoxShadow'>
					<div className='ptextAnswerBox'>
						<img
							src={data.imageCover}
							style={{
								// width: '85px',
								// height: '85px',
								borderRadius: '16px',
							}}
						/>
						<div className={`ptextAnswerText ${selected ? 'bluecolor' : ''}`}>{data.name}</div>
					</div>
					<div className={`ptextAnswerBoxBorder ${selected ? 'borderblue' : ''}`} />
				</div>
			</div>
		</div>
	);
};
export default PlacementTestItem;
