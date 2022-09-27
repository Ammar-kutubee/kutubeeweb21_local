import { result } from 'lodash';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { v4 as uuid } from 'uuid';

const itemsFromBackend = [
	{
		id: uuid(),
		content: 'First task',
	},
	{
		id: uuid(),
		content: 'Second task',
	},
];

const columnsFromBackend = {
	[uuid()]: {
		name: 'Todo',
		items: itemsFromBackend,
	},
	[uuid()]: {
		name: 'In Progress',
		items: [],
	},
};

const onDragEnd = (result, columns, setColumns) => {
	if (!result.destination) return;
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

export default function QuestionAnswersDnd(props) {
	console.log(props);

	const [columns, setColumns] = React.useState(columnsFromBackend);

	return (
		<div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
			<DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
				{Object.entries(columns).map(([id, column]) => {
					console.log(1121212, id);
					console.log(1121212, column);

					return (
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 8 }}>
							<h2>{column.name}</h2>
							<Droppable droppableId={id} key={id}>
								{(provided, snapshot) => {
									return (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
											style={{
												background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
												padding: 4,
												width: 250,
												minHeight: 500,
											}}
										>
											{column.items.map((item, index) => {
												return (
													<Draggable key={item.id} draggableId={item.id} index={index}>
														{(provided, snapshot) => {
															return (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	style={{
																		userSelect: 'none',
																		padding: 16,
																		margin: '0 0 8px 0',
																		minHeight: '50px',
																		background: snapshot.isDragging ? '#263B4A' : '#456C86',
																		color: 'white',
																		...provided.draggableProps.style,
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
			<>
				{props.answers.map((elee) => {
					return (
						<div style={{ dislpay: 'flex' }}>
							<img src={elee.name} alt={elee.nameText} />
							<div>{elee.nameText}</div>
						</div>
					);
				})}
			</>
		</div>
	);
}
//TODO DELTE ME ALL
{
	/* <>
				{props.answers.map((elee) => {
					return (
						<div
							style={{
								display: 'grid',
								gap: '3vh',
								margin: ' auto',
								marginTop: 22,
								justifyContent: 'center',
								alignItems: 'center',
								gridTemplateColumns: '1fr ',
								border: '10px sold rgb(0, 0, 0)',
								borderRadius: '10px',
							}}
						>
							<Image src={elee.name} alt={elee.nameText} width={240} height={240} />
							<div>{elee.nameText}</div>
						</div>
					);
				})}
			</> */
}
