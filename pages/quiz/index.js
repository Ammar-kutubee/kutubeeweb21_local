import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';

// import Insidelayout from '../../components/layouts/insidelayout';
import { getQuizData } from '../../src/utils/apis';
import NumberOfQuestions from '../../components/Quiz/NumberOfQuestions';
import QuestionWrapper from '../../components/Quiz/QuestionWrapper';
import QuizResult from '../../components/Quiz/QuizResult';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
// import GoogleLogin from 'react-google-login'; // big file
// import { fa } from 'faker/lib/locales'; //very big file

const Quiz = () => {
	const cheerAudio = new Audio('./sounds/sfx/quiz/cheering.mp3');
	const wrongAnsAudio = new Audio('./sounds/sfx/quiz/wrong3.mp3');
	const clickAudio = new Audio('./sounds/sfx/quiz/adriantnt_u_click.mp3');

	const state = useSelector((state) => state.mainReducer);
	const [loading, setLoading] = useState(true);
	const [quizData, setQuizData] = useState(null);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(null);
	const [showQuestion, setShowQuestion] = useState(false);
	const [questionAttempts, setQuestionAttempts] = useState(0);
	const [allAnswers, setAllAnswers] = useState([]);
	const [disableCheck, setDisableCheck] = useState(true);
	const [quizFinished, setQuizFinished] = useState(false);
	const [userOrder, setUserOrder] = useState([]);
	const [correctDndtAnswers, setCorrecDndtAnswers] = useState(false);
	const [wrongDndAnswers, setWrongDndAnswers] = useState(false); // not used
	const [secondAttmept, setSecondAttmept] = useState(false);

	//  21/sep add for check button
	const [showButton, setShowButton] = useState(true);

	// 21/sep added for memory game to go for next question
	// const [allMatched, setAllMatched] = useState(false);

	// 28/sep added for dnd game to check answers
	const [checkingDndAns, setCheckingDndAns] = useState(false);
	const [checkingPhase, setCheckingPhase] = useState(false);

	// 2/oct added to show the red error message on wrong asnwers (x SVG with message)
	const [showWrongX, setShowWrongX] = useState(false);

	const router = useRouter();
	const [bookId, setBookId] = useState(null);
	const userId = state.loggedInUser.userData._id;
	const [currentLanguage, setBookLanguage] = useState(null);
	const { t, i18n } = useTranslation([], { useSuspense: false });

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		if (router.query.bookId) {
			setBookId(router.query.bookId);
			setBookLanguage(router.query.currentLanguage);

			const quizData = await getQuizData(router.query.bookId);
			router.replace('/quiz');
			// console.log('quizData', quizData)
			setQuizData(quizData);
			setLoading(false);
			setShowQuestion(true);
			setAllAnswers(new Array(quizData.quizData.length).fill(null));

			if (quizData.quizData[0].questionType === 'drag_drop') {
				setDisableCheck(false);
			}
		} else {
			router.back();
		}

		return () => {};
	}, []);

	const onSelectAnswer = (index) => {
		setDisableCheck(false);
		setCurrentSelectedAnswer(index);
	};
	const nextQuestion = () => {
		if (currentQuestion < quizData.quizData.length - 1) {
			let nextQu = currentQuestion + 1;

			if (quizData.quizData[nextQu].questionType === 'sorting' || quizData.quizData[nextQu].questionType === 'drag_drop') {
				setTimeout(() => {
					setDisableCheck(false);
					setShowButton(true);
				}, 1000);
			} else if (quizData.quizData[nextQu].questionType === 'memory_game') {
				// added to disable check button for  memory game where check button is not needed based on design
				setTimeout(() => {
					setShowButton(false);
				}, 1000);
			} else if (quizData.quizData[nextQu].questionType === 'open') {
				// TODO check if u can keep it in else with drag and drop also?
				setDisableCheck(false);

				setTimeout(() => {
					setShowButton(true);
				}, 1000);
			} else {
				setTimeout(() => {
					setShowButton(true);
					setDisableCheck(true);
				}, 1000);
			}
			setQuestionAttempts(0);
			setTimeout(() => {
				//TODO wierd ShowQuestion false -> ShowQuestion - >true together ?
				setCorrecDndtAnswers(false);
				setShowQuestion(false);
				setCurrentQuestion(currentQuestion + 1);
				// setTimeout(() => {
				setShowQuestion(true);
				setCurrentSelectedAnswer(null);
				// }, 1000);
			}, 1000);
		} else {
			setTimeout(() => {
				setCorrecDndtAnswers(false);
				setShowQuestion(false);
				setQuizFinished(true);
				// }, 1000);
			}, 1000);
		}
	};
	const onQuestionCheck = () => {
		let correctAnswer = false;

		if (questionAttempts == 0 || questionAttempts == 1) {
			setTimeout(() => {
				setCheckingPhase(false);
				setDisableCheck(false);
			}, 1000);
			setCheckingPhase(true);
			setDisableCheck(true);

			correctAnswer = checkAnswer();
			if (correctAnswer) {
				setTimeout(() => {
					setSecondAttmept(false);
					setCheckingPhase(false);
					nextQuestion();
				}, 1000);
				cheerAudio.play();
			} else {
				setCorrecDndtAnswers(false);
				if (questionAttempts == 0) {
					setDisableCheck(false);

					setQuestionAttempts(questionAttempts + 1);

					if (
						quizData.quizData[currentQuestion].questionType === 'sorting' ||
						quizData.quizData[currentQuestion].questionType === 'memory_game'
					) {
						setDisableCheck(true);
					}
					setTimeout(() => {
						// let answer = null;
						// let answersTmp = allAnswers
						// answersTmp[currentQuestion] = answer
						// setAllAnswers([...answersTmp])
						// setCurrentSelectedAnswer(null)

						setShowWrongX(false);

						if (quizData.quizData[currentQuestion].questionType === 'sorting') {
							setDisableCheck(false);
						} else {
							setSecondAttmept(true);
						}
					}, 1000);
					setShowWrongX(true);
					//}
				} else if (questionAttempts == 1) {
					wrongAnsAudio.play();
					setSecondAttmept(false);
					nextQuestion();

					//[ ] check with the client if the want the  2nd show wrong message or not
					// setTimeout(() => {
					// 	setShowWrongX(false);
					// }, 750);
					// setShowWrongX(true);
				}
			}
			// checkAnswer()
		}
		// setCheckingPhase(false);

		// setShowQuestion(false)
		// setCurrentQuestion(currentQuestion + 1)
		// setTimeout(() => {
		//     setShowQuestion(true)
		//     setCurrentSelectedAnswer(null)
		// }, 1000);
	};

	//TODO drag and drop game next que
	const checkAnswer = () => {
		if (quizData.quizData[currentQuestion].questionType === 'sorting') {
			let correctList = quizData.quizData[currentQuestion].correctList;
			let userList = userOrder.map((item) => item.id);
			let answer = false;
			if (JSON.stringify(correctList) === JSON.stringify(userList)) {
				//    setAllAnswers(true)
				answer = true;
				setCorrecDndtAnswers(true);
			} else {
				setCorrecDndtAnswers(false);
			}
			let answersTmp = allAnswers;
			let currentSelectedAnswer = 0;

			answersTmp[currentQuestion] = {
				correct: answer,
				answerId: quizData.quizData?.[currentQuestion].answers?.[currentSelectedAnswer]?.id,
				questionId: quizData.quizData?.[currentQuestion]?.id,
			};

			setAllAnswers([...answersTmp]);

			if (answer) {
				return true;
			} else {
				return false;
			}
		} else if (quizData.quizData[currentQuestion].questionType === 'memory_game') {
			let answersTmp = allAnswers;
			let currentSelectedAnswer = 0;

			answersTmp[currentQuestion] = {
				correct: true,
				answerId: undefined,
				questionId: quizData.quizData?.[currentQuestion]?.id,
			};
			setAllAnswers([...answersTmp]);
			return true;
			// if (allMatched) {
			// 	return true;
			// }
			// return false;
		} else if (quizData.quizData[currentQuestion].questionType === 'drag_drop') {
			let answersTmp = allAnswers;
			let currentSelectedAnswer = 0;

			answersTmp[currentQuestion] = {
				correct: checkingDndAns,
				answerId: undefined,
				questionId: quizData.quizData?.[currentQuestion]?.id,
			};
			setAllAnswers([...answersTmp]);

			if (checkingDndAns) {
				// setTimeout(() => {
				// 	return true;
				// }, 1000);
				return true;
			}
			return false;
		} else if (quizData.quizData?.[currentQuestion].questionType === 'open') {
			let answersTmp = allAnswers;
			let currentSelectedAnswer = 0;

			answersTmp[currentQuestion] = {
				correct: true,
				answerId: undefined,
				questionId: quizData.quizData?.[currentQuestion]?.id,
			};
			setAllAnswers([...answersTmp]);
			return true;
		} else {
			let answer = quizData.quizData?.[currentQuestion].answers?.[currentSelectedAnswer];
			let answersTmp = allAnswers;

			answersTmp[currentQuestion] = {
				correct: quizData?.quizData?.[currentQuestion].answers?.[currentSelectedAnswer]?.correct,
				answerId: quizData.quizData?.[currentQuestion].answers?.[currentSelectedAnswer]?.id,
				questionId: quizData.quizData?.[currentQuestion]?.id,
			};
			setAllAnswers([...answersTmp]);
			if (answer?.correct) {
				return true;
			} else {
				return false;
			}
		}
	};
	return (
		<div>
			{!quizFinished ? (
				<>
					{!loading ? (
						<div
							className={` ${currentLanguage == 'ar' ? 'rtlDir' : 'ltrDir'}`}
							style={{
								flexGrow: 1,
								justifyContent: 'flex-start',
								paddingTop: 50,
								display: 'flex',
								flexDirection: 'column',
								maxWidth: '72%',
								margin: 'auto',
							}}
						>
							<NumberOfQuestions questions={quizData.quizData} activeQuestion={currentQuestion} currentLanguage={currentLanguage} />
							{showQuestion ? (
								<QuestionWrapper
									secondAttmept={secondAttmept}
									currentLanguage={currentLanguage}
									correctDndtAnswers={correctDndtAnswers}
									setUserOrder={setUserOrder}
									autoPlay
									selectedAnswerData={allAnswers[currentQuestion]}
									showQuestion={showQuestion}
									onSelectAnswer={onSelectAnswer}
									currentSelectedAnswer={currentSelectedAnswer}
									questionData={quizData.quizData[currentQuestion]}
									nextQuestion={nextQuestion}
									onQuestionCheck={onQuestionCheck}
									checkingDndAns={checkingDndAns}
									setCheckingDndAns={setCheckingDndAns}
									checkingPhase={checkingPhase}
								/>
							) : (
								<div style={{ flexGrow: 1 }} />
							)}

							<div>
								{showWrongX ? (
									<div className='wrongAnsMessgae'>
										<div style={{ textAlign: 'left', display: 'flex', gap: 10 }}>
											<img src='/xAnswer.svg' alt='xAnswer' />
											<p style={{ color: '#E52730', fontFamily: 'FF Hekaya Light', fontSize: '36px' }}>
												{t('quiz.WrongAns', { lng: currentLanguage })}
											</p>
										</div>
									</div>
								) : (
									''
								)}

								<div style={{ paddingRight: '3vw', paddingLeft: '3vw' }} className='btn-wrapper-quiz-width'>
									{showButton && (
										<CustomButton
											buttonStyle={{
												marginBottom: '10px',
											}}
											disabled={disableCheck}
											onPress={() => {
												onQuestionCheck();
												clickAudio.play();
											}}
											text={t('bookScreen.check', { lng: currentLanguage })}
										/>
									)}
								</div>
							</div>
						</div>
					) : null}
				</>
			) : (
				!loading && (
					<QuizResult
						userId={userId}
						answers={allAnswers}
						bookId={bookId}
						numberOfQuestions={quizData.quizData.length}
						currentLanguage={currentLanguage}
					/>
				)
			)}
		</div>
	);
};
// const Layout = () => (
//     <Insidelayout>
//         <Quiz />s
//     </Insidelayout>
// )

Quiz.layout = 'Empt';

export default Quiz;
