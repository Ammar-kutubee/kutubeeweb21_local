import { result } from 'lodash';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';

const onDragEnd = (result, columns, setColumns) => {
	console.log('result', result);
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
	console.log(props);
	let itemsFromBackend = [
		{
			id: uuid(),
			content: props.answers[0].nameText,
		},
		{
			id: uuid(),
			content: props.answers[1].nameText,
		},
	];

	itemsFromBackend = props.answers.map((ele) => {
		return {
			id: uuid(),
			content: ele.nameText,
		};
	});
	itemsFromBackend.push({
		id: uuid(),
		content: 'hi',
	});

	const columnsFromBackend = {
		[uuid()]: {
			name: 'Storage',
			items: itemsFromBackend,
		},
		[uuid()]: {
			name: 'Answers',
			items: [],
		},
		[uuid()]: {
			name: 'Answers',
			items: [],
		},
		[uuid()]: {
			name: 'Answers',
			items: [],
		},
		[uuid()]: {
			name: 'Answers',
			items: [],
		},
		[uuid()]: {
			name: 'Answers',
			items: [],
		},
	};

	// need to return object not array in columns
	// columnsFromBackend = props.answers.map((elee) => {
	// 	return {
	// 		[uuid()]: {
	// 			name: elee.name,
	// 			items: itemsFromBackend,
	// 		},
	// 	};
	// });

	const [columns, setColumns] = useState(columnsFromBackend);

	return (
		<div
			className='dndGame'
			style={{
				display: 'grid',
				gridTemplateColumns: "repeat(auto, '200px')",
				// gridTemplateAreas: "				'storage' 				'b c d'  ",
				// gridTemplateColumns: 'auto auto ',
				// gridTemplateColumns: '1fr 1fr 1fr ',

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
								// gridArea: `${column.id}`,
								// gridColumn: `${column.id}`,
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
								<Image
									className='rounded-full'
									draggable={false}
									objectFit='cover'
									src={props.answers?.[1].name}
									height={160}
									width={180}
									alt='image'
								/>
							</div>

							<Droppable droppableId={id} key={id}>
								{(provided, snapshot) => {
									console.log(provided, snapshot);
									return (
										<div
											className='dashedDroppInArea'
											{...provided.droppableProps}
											ref={provided.innerRef}
											style={{
												background: snapshot.isDraggingOver ? 'lightgrey' : 'white',
												padding: 4,
												width: 194,
												minHeight: 50,
												marginTop: 10.15,
												border: '1px dashed #B1B1B1',
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
																		width: '136px',
																		background: snapshot.isDragging ? 'pink' : 'white',
																		color: 'grey',
																		border: '1px solid #E5E5E5',
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
									console.log(provided, snapshot);
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
																		width: '136px',
																		background: snapshot.isDragging ? 'pink' : 'white',
																		color: 'grey',
																		border: '1px solid #E5E5E5',
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
