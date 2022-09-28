// import { result } from 'lodash';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';

const onDragEnd = (result, columns, setColumns) => {
	console.log('result', result);
	console.log('colunmssss', columns);
	if (!result.destination) return;
	// if (result.destination.index !== 0) return;
	console.log(1111111111, columns[result.destination.droppableId]);
	if (columns[result.destination.droppableId].items.length !== 0 && columns[result.destination.droppableId].name !== 'Storage') return;

	const { source, destination } = result;

	//when changing columns & becare of droppableId and draggableId
	if (source.droppableId !== destination.droppableId) {
		const sourceColumn = columns[source.droppableId];
		const destinationColumn = columns[destination.droppableId];
		const sourceItems = [...sourceColumn.items];
		const destinationItems = [...destinationColumn.items];
		//remove item from source then put it back on destination col
		const [removed] = sourceItems.splice(source.index, 1); // 1 not 0 to remove
		destinationItems.splice(destination.index, 0, removed);
		setColumns({
			...columns,
			[source.droppableId]: {
				...sourceColumn,
				items: sourceItems,
			},
			[destination.droppableId]: {
				...destinationColumn,
				items: destinationItems,
			},
		});
	}
	//on same column only changing order
	else {
		const column = columns[source.droppableId];
		const copiedItems = [...column.items];
		const [removed] = copiedItems.splice(source.index, 1);
		copiedItems.splice(destination.index, 0, removed);
		setColumns({
			...columns,
			[source.droppableId]: {
				...column,
				items: copiedItems,
			},
		});
	}
};

// function isStorage(ele) {
// 	return ele.name === 'Stroage';
// }

export default function QuestionAnswersDnd(props) {
	console.log('props', props);

	// iterate through props to get the the the nameText and put them in Storage(conatainer holder) and build in the structure of beautiful dnd recom.
	let itemsFromBackend = props.answers.map((ele) => {
		return {
			id: uuid(),
			content: ele.nameText,
		};
	});
	// itemsFromBackend.push({
	// 	id: uuid(),
	// 	content: 'hi',
	// });

	let columnsFromBackend = {
		[uuid()]: {
			name: 'Storage',
			items: itemsFromBackend,
		},
	};

	// iterate through props to get the the pic(name) and the the text , building it as the document of beutifull dnd recommended
	props &&
		props.answers.map((elee) => {
			let objj = {
				name: 'Answers',
				items: [],
				src: elee.name,
				correctAnswer: elee.nameText,
			};
			columnsFromBackend[uuid()] = objj;
		});

	console.log('999999999999', columnsFromBackend);

	const [columns, setColumns] = useState(columnsFromBackend);
	const [ok, setOk] = useState(false);

	const handleClick = (e) => {
		// console.log('eee', e);
	};

	useEffect(() => {
		let allAnswersFalse = true;
		console.log('columns', Object.entries(columns));
		Object.entries(columns).map(([id, column]) => {
			if (column.name === 'Answers') {
				if (column.items?.[0]?.content !== column.correctAnswer) {
					allAnswersFalse = false;
				}
			}
		});

		setOk(allAnswersFalse);
	}, [columns]);

	useEffect(() => {
		// onQuestionCheck();
		if (ok) {
			// onQuestionCheck();
			props.setCheckingDndAns(ok);
		} else console.log('else');
		console.log('okkkkkkkk', ok);
	}, [ok]);
	return (
		<div
			className='dndGame'
			style={{
				display: 'grid',
				gridTemplateColumns: "repeat(auto, '200px')",
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
				gap: 20,
			}}
		>
			<DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
				{/* <div>im storage</div> */}

				{/* {console.log(columns[0].find(isStorage))} */}

				{Object.entries(columns).map(([id, column]) => {
					// <div className='answersComp' style={{ display: 'flex' }}></div>;
					console.log('ids', id);
					console.log('each column', column);

					return column.name === 'Answers' ? (
						<div
							className='Card'
							style={{
								gridRow: 2,
								height: 240,
								width: 240,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								margin: 8,
								border: '3px solid #E5E5E5',
								fontFamily: 'FF Hekaya Light',
							}}
						>
							<div style={{ borderRadius: '50%', overflow: 'hidden', width: '180px', height: '160px', userSelect: 'none' }}>
								<Image className='rounded-full' draggable={false} objectFit='cover' src={column.src} height={160} width={180} alt='image' />
							</div>

							<Droppable droppableId={id} key={id} isDropDisabled={column.items.length !== 0}>
								{(provided, snapshot) => {
									console.log('prov and snap', provided, snapshot);
									return (
										<div
											className='dashedDroppInArea'
											{...provided.droppableProps}
											ref={provided.innerRef}
											style={{
												background: snapshot.isDraggingOver ? 'lightgrey' : 'white',
												padding: 4,
												width: 194,
												height: 60,
												marginTop: 10.15,
												border: column.items.length === 0 ? '2px dashed #B1B1B1' : '',
												borderRadius: '8px',
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											{column.items.map((item, index) => {
												return (
													<Draggable key={item.id} draggableId={item.id} index={index}>
														{(provided, snapshot) => {
															console.log(222222, provided);
															return (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	style={{
																		fontSize: '36px',
																		lineHeight: '27px',
																		userSelect: 'none',
																		padding: 16,
																		margin: '4px 0 ',
																		minHeight: '60px',
																		maxHeight: '60px',
																		width: column.items.length === 0 ? '136px' : 194,
																		background: snapshot.isDragging ? 'pink' : 'white',
																		color: 'grey',
																		border:
																			column.items.length === 0
																				? '2px solid #E5E5E5'
																				: props.checkingDndAns
																				? '3px solid #6AC3DB'
																				: '3px solid #E52730',
																		boxShadow: '0px 0px 10px 2px rgba(37, 39, 38, 0.047476)',
																		borderRadius: 8,
																		...provided.draggableProps.style,
																		textAlign: 'center',
																		// transition: '  0.4s',
																		// transitionDelay: '1s',
																		// transitionDuration: '1s',
																	}}
																	// onClick={handleClick} //TODO HANDLE CLICK FOR DRAGGABLE TO RETURN TO ORIGIN
																>
																	{item.content}
																</div>
															);
														}}
													</Draggable>
												);
											})}
											{provided.placeholder}
										</div>
									);
								}}
							</Droppable>
						</div>
					) : (
						<div
							className='Storage'
							style={{
								// height: 240,
								// width: 240,
								// gridArea: 'storage',
								gridRow: 0,
								gridColumn: '1',
								// gridColumnEnd: 'span 9',
								gridColumnEnd: ` span ${Object.keys(columnsFromBackend).length}`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								margin: 8,
								// border: '3px solid #E5E5E5',
								fontFamily: 'FF Hekaya Light',
							}}
						>
							{console.log('len', Object.keys(columnsFromBackend).length)}
							{/* <div style={{ borderRadius: '50%', overflow: 'hidden', width: '180px', height: '160px' }}>
								<Image className='rounded-full' objectFit='cover' src={props.answers[0].name} height={160} width={180} />
							</div> */}

							<Droppable
								droppableId={id}
								key={id}
								isDropDisabled={false}
								direction='horizontal'
								// mode='virtual'
								ignoreContainerClipping={false}
							>
								{(provided, snapshot) => {
									// console.log(provided, snapshot);
									return (
										<div
											className='storageDroppInArea'
											{...provided.droppableProps}
											ref={provided.innerRef}
											style={{
												direction: 'ltr',
												background: snapshot.isDraggingOver ? 'lightgrey' : 'white',
												padding: 4,
												minxWidth: 500,
												maxHeight: 80,
												marginTop: 10.15,
												gap: 19,
												// border: '1px dashed #B1B1B1',
												display: 'flex',
												// flexDirection: 'row-reverse',
												justifyContent: 'center',
												alignItems: 'center',
											}}
										>
											{column.items.map((item, index) => {
												return (
													<Draggable key={item.id} draggableId={item.id} index={index} onClick={handleClick}>
														{(provided, snapshot) => {
															console.log(222222, provided);
															return (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	style={{
																		fontSize: '36px',
																		lineHeight: '27px',
																		userSelect: 'none',
																		padding: 16,
																		margin: '4px 0 ',
																		minHeight: '60px',
																		maxHeight: '60px',
																		width: '136px',
																		background: snapshot.isDragging ? 'pink' : 'white',
																		color: 'grey',
																		border: '1.5px solid #E5E5E5',
																		boxShadow: '0px 0px 10px 2px rgba(37, 39, 38, 0.047476)',
																		borderRadius: 8,
																		...provided.draggableProps.style,
																		textAlign: 'center',
																	}}
																>
																	{item.content}
																</div>
															);
														}}
													</Draggable>
												);
											})}
											{provided.placeholder}
										</div>
									);
								}}
							</Droppable>
						</div>
					);
				})}
			</DragDropContext>
		</div>
	);
}
