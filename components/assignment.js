import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Assignment({ item, index, type }) {
	console.log('item', item);
	const { t, i18n } = useTranslation([], { useSuspense: false });

	useEffect(async () => {
		console.log(item);
		return () => {};
	}, []);

	const goToAssignment = () => {
		// navigation.push('Assignment', { assignmentId: item._id, status: 'new' })
	};
	return (
		<Link
			href={{
				pathname: `/Assignment/${item._id}`,
				query: { type: type },
			}}
		>
			<div onPress={goToAssignment} style={{ width: '19%' }} className='assignmentWrapper'>
				<div className='flex-wrapper-row'>
					<div style={{ position: 'relative' }}>
						{item.books.length != 0 && <img src={item.books[0].coverPhoto} className='bookCover' />}
						{item.books.length > 1 && (
							<div className='blackoverlay'>
								<div className='white-text'> + {item.books.length} </div>
							</div>
						)}
					</div>
					<div className='assignmentInfoWrapper'>
						<div className='teacherData'>
							{item.avatarlink == '' ? (
								// <div className="teacherAvatar" style={{ borderWidth: 1 }} />
								<img style={{ borderWidth: 1 }} src={item.avatarlink ? item.avatarlink : '../assets/images/bee.png'} alt='Avatar Image' />
							) : (
								<img src={item.avatarlink ? item.avatarlink : '../assets/images/bee.png'} alt='Avatar Image' className='teacherAvatar' />
							)}

							<div className='teacherName'>{item.authorName}</div>
						</div>
						<div>
							<div numberOfLines={3} className='description'>
								{item.name}
							</div>
						</div>
					</div>
					<div></div>
				</div>
				<div className='rightInfoWrapper'>
					<div
						style={{
							gap: '5px',
							display: 'flex',
						}}
					>
						<div className='dueDateTitle'>{t('mainSlides.assignments.dueDate')}</div>
						{type == 'active' && <div className='dueDate'> {moment.unix(item.dueDate).format('D MMM')}</div>}

						{type == 'completed' && <div className='semiBoldText'> {moment.unix(item.dueDate).format('D MMM')}</div>}
						{type == 'over' && <div className='overdate'> {moment.unix(item.dueDate).format('D MMM')}</div>}
					</div>
					<div>
						<div
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								display: 'flex',
								gap: '2px',
							}}
						>
							<div className='viewText'>{t('mainSlides.assignments.view')}</div>
							<div name='right-arrow' className='viewArrow icon-right-arrow'>
								{' '}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
