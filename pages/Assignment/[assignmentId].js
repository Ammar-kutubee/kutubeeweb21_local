import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssignmentData, getQuizData } from '../../src/utils/apis';
import Insidelayout from '../../components/layouts/insidelayout';
import BookOutside from '../../components/BookOutside';
import Link from 'next/link';
import { useWindowSize } from '../../src/utils/useWindowSize';
import CustomButton from '../../components/CustomButton';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import SubmitConfirm from '../../components/SubmitConfirm';

const Assignmnet = ({ userId }) => {
	const router = useRouter();
	// console.log("assi", router.query.assignmentId)
	const { assignmentId } = router.query;
	// console.log('assss', assignmentId);
	const { type } = router.query;
	const [loading, setLoading] = useState(true);
	const [assignmentData, setAssignemntData] = useState();
	const [assignmentBooks, setAssignemntBooks] = useState();
	const [assignmentWorksheets, setAssignemntWorksheets] = useState([]);
	const [noOfColumns, setNoOfColumns] = useState(null);
	const booksWrapper = useRef(null);
	const { t, i18n } = useTranslation([], { useSuspense: false });
	const resize = useWindowSize();

	const dispatch = useDispatch(); // not used
	const language = i18n.language; // not used but chk line27

	useEffect(() => {
		if (booksWrapper.current) {
			setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190));
		}
		return () => {};
	}, [booksWrapper, loading]);
	useEffect(() => {
		if (booksWrapper.current) {
			setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190));
		}
		return () => {};
	}, [resize]);
	useEffect(async () => {
		setLoading(true);

		if (!router.isReady) return;

		let assignmentData = await getAssignmentData(userId, assignmentId);
		console.log('das', assignmentData);
		setAssignemntData(assignmentData);
		setAssignemntBooks(assignmentData.books);
		setAssignemntWorksheets(assignmentData.worksheets);
		setLoading(false);
		return () => {};
	}, [router.isReady]);

	return (
		<>
			<div
				style={{
					flexGrow: 1,
					width: '100%',
				}}
			>
				{loading ? null : (
					<>
						{!assignmentData.read && <div className='sectionTitle'>{t('assignments.newAssignment')}</div>}
						<div>
							{assignmentData.read && (
								<div>
									<div className='sectionTitle'>{t('assignments.teacherFeedback')}</div>

									<div className='dataTitle'>{t('assignments.teacherNote')}</div>
									<div className='teacherName'>{assignmentData.message}</div>
								</div>
							)}
							<div className='dataWrapper' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '22vw' }}>
								<div className='teacherData'>
									<div>
										{assignmentData.avatarlink == '' ? (
											// <div className="teacherAvatar" style={{ borderWidth: 1 }} />
											<img
												style={{ borderWidth: 1 }}
												src={assignmentData.avatarlink ? assignmentData.avatarlink : '../assets/images/bee.png'}
												alt='Avatar Image'
											/>
										) : (
											<img
												src={assignmentData.avatarlink ? assignmentData.avatarlink : '../assets/images/bee.png'}
												alt='Avatar Image'
												className='teacherAvatar'
											/>
										)}
									</div>
									<div style={{ padding: '0px 15px' }}>
										<div className='dataTitle'>{t('assignments.teacherName')}</div>
										<div className='semiBoldText' style={{ fontSize: 24 }}>
											{assignmentData.authorName}
										</div>
									</div>
								</div>
								<div>
									<div className='dataTitle'>{t('assignments.dueDate')}</div>
									{type == 'active' && (
										<div className='dueDate' style={{ fontSize: 24 }}>
											{' '}
											{moment.unix(assignmentData.dueDate).format('D MMM')}
										</div>
									)}
									{type == 'completed' && (
										<div className='semiBoldText' style={{ fontSize: 24 }}>
											{' '}
											{moment.unix(assignmentData.dueDate).format('D MMM')}
										</div>
									)}
									{type == 'over' && (
										<div className='overdate' style={{ fontSize: 24 }}>
											{' '}
											{moment.unix(assignmentData.dueDate).format('D MMM')}
										</div>
									)}
								</div>
								<div style={{ flexGrow: 1 }}>
									{type != 'active' ? (
										<>
											<div className='dataTitle'>{t('assignments.status')}</div>
											{type == 'completed' && (
												<div className='semiBoldText' style={{ fontSize: 24 }}>
													{t('assignments.completed')}
												</div>
											)}
											{type == 'active' && (
												<div className='semiBoldText' style={{ fontSize: 24 }}>
													{t('assignments.active')}
												</div>
											)}
											{type == 'over' && (
												<div className='semiBoldText' style={{ fontSize: 24 }}>
													{t('assignments.overdue')}
												</div>
											)}
										</>
									) : (
										<div style={{ paddingInlineEnd: '0vw', margin: '0px 0px', width: '100%' }} className='btn-wrapper-quiz-width'>
											{!assignmentData.read && (
												<SubmitConfirm assignmentId={assignmentId} userId={userId} assignmentData={assignmentData} />
											)}
										</div>
									)}
								</div>
							</div>
							<div className='dataWrapper'>
								<div className='dataTitle'>{t('assignments.assignmentTitle')}</div>
								<div className='semiBoldText' style={{ fontSize: 24 }}>
									{assignmentData.name}
								</div>
							</div>
							<div className='dataWrapper'>
								<div className='dataTitle'>{t('assignments.assignmentDescription')}</div>
								<div className='semiBoldText' style={{ fontSize: 24 }}>
									{assignmentData.description}
								</div>
							</div>

							<div ref={booksWrapper} className='bookswrapper' style={{ marginTop: '40px' }}>
								{assignmentBooks.map((book) => (
									<BookOutside
										dest={`?destination=/Assignment/${assignmentId}&type=assignment`}
										book={book}
										bookWidth={160}
										bookMargin={15}
										itemWidth={160}
										index={0}
										noOfColumns={noOfColumns}
									/>
								))}
							</div>
							<div className='attachments-wrapper' style={{ marginBottom: '3vw' }}>
								{assignmentWorksheets == 0 ? (
									<div> </div>
								) : (
									assignmentWorksheets.map((assignment) => (
										<a href={assignment} target='_blank' rel='noreferrer'>
											<div className='attachment'>
												<svg width={23} height={25} viewBox='0 0 23 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
													<path
														d='M21.127 10.628L7.74 23.714c-1.77 1.714-4.647 1.714-6.418 0a4.048 4.048 0 01-1.045-1.582 4.303 4.303 0 011.045-4.629L14.163 4.93c1-.967 2.74-.967 3.74 0a2.48 2.48 0 010 3.618L5.606 20.608a.767.767 0 01-1.074 0 .735.735 0 010-1.04l12.31-12.046a1.08 1.08 0 000-1.552c-.438-.425-1.18-.425-1.604 0L2.398 18.544a2.794 2.794 0 00-.848 2.358c.045.644.333 1.274.848 1.772 1.135 1.114 3.133 1.114 4.268 0L20.052 9.588a4.641 4.641 0 000-6.724v-.015c-1.862-1.787-5.102-1.787-6.963 0l-9.582 9.273a.749.749 0 01-1.059 0 .692.692 0 010-1.025l9.566-9.273c2.513-2.432 6.6-2.432 9.113 0a6.11 6.11 0 010 8.804z'
														fill='#81C8EE'
													/>
												</svg>
												<div className='grey-text'> {t('settings.attachement')} </div>
											</div>
										</a>
									))
								)}
							</div>
							{/* <div style={{ paddingInlineEnd: '9vw', margin: '40px 0px' }} className="btn-wrapper-quiz-width">
                                {!assignmentData.read &&
                                    <SubmitConfirm assignmentId={assignmentId} userId={userId} assignmentData={assignmentData} />

                                }
                            </div> */}
						</div>
					</>
				)}
			</div>
		</>
	);
};

Assignmnet.layout = 'In';

export default Assignmnet;
