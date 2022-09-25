import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NumberOfQuestions from '../../../components/Quiz/NumberOfQuestions';
import QuestionWrapper from '../../../components/Quiz/QuestionWrapper';

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import CustomButton from '../../../components/CustomButton';
import PlacementDataModal from '../../../components/PlacementTest/PlacementDataModal';

const PlacementQuiz = () => {
	const state = useSelector((state) => state.mainReducer);
	const [open, setOpen] = React.useState(false);
	const [loading, setLoading] = useState(true);
	const [quizData, setQuizData] = useState(null);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(null);
	const [showQuestion, setShowQuestion] = useState(false);
	const [questionAttempts, setQuestionAttempts] = useState(0);
	const [allAnswers, setAllAnswers] = useState([]);
	const [disableCheck, setDisableCheck] = useState(true);
	const [quizFinished, setQuizFinished] = useState(false);
	const router = useRouter();
	const [bookId, setBookId] = useState(null);
	const userId = state.loggedInUser.userData._id;
	const { t, i18n } = useTranslation([], { useSuspense: false });
	const stateplacementData = useSelector((state) => state.mainReducer.placementData);
	const stateLang = useSelector((state) => state.mainReducer.placementLanguage);
	const [currentLanguage, setCurrentLanguage] = useState();
	const [placementData, setPlacementData] = useState([]);
	const dispatch = useDispatch();

	useEffect(async () => {
		if (stateplacementData) {
			setPlacementData(stateplacementData.questions);
			setCurrentLanguage(stateLang);

			setQuizData(stateplacementData.questions);
			console.log('qqz', stateplacementData.questions);
			setLoading(false);
			setShowQuestion(true);
			setAllAnswers(new Array(stateplacementData.questions.length).fill(null));
		} else {
			router.replace('/home/level');
		}

		return () => {};
	}, []);

	const onSelectAnswer = (index) => {
		setDisableCheck(false);
		setCurrentSelectedAnswer(index);
	};

	const nextQuestion = () => {
		if (currentQuestion < quizData.length - 1) {
			setDisableCheck(true);
			setQuestionAttempts(0);
			setTimeout(() => {
				setShowQuestion(false);
				setCurrentQuestion(currentQuestion + 1);
				// setTimeout(() => {
				setShowQuestion(true);
				setCurrentSelectedAnswer(null);
				// }, 1000);
			}, 1000);
		} else {
			setTimeout(() => {
				setShowQuestion(false);
				setQuizFinished(true);
				dispatch({
					type: 'ALL_ANSWERS',
					Allanswers: allAnswers,
				});
				router.replace('/placementtest/results');
			});
		}
	};
	const onQuestionCheck = () => {
		let correctAnswer = false;
		if (questionAttempts == 0 || questionAttempts == 1) {
			correctAnswer = checkAnswer();
			nextQuestion();
		}
		// setShowQuestion(false)
		// setCurrentQuestion(currentQuestion + 1)
		// setTimeout(() => {
		//     setShowQuestion(true)
		//     setCurrentSelectedAnswer(null)
		// }, 1000);
	};

	const checkAnswer = () => {
		let answer = quizData[currentQuestion].answers[currentSelectedAnswer];
		let answersTmp = allAnswers;
		answersTmp[currentQuestion] = {
			correct: quizData[currentQuestion]?.answers[currentSelectedAnswer]?.correct,
			answerId: quizData[currentQuestion].answers[currentSelectedAnswer].id,
			questionId: quizData[currentQuestion].id,
		};
		setAllAnswers([...answersTmp]);
		if (answer.correct) {
			return true;
		} else {
			return false;
		}
	};
	const onOpenModal = (val) => {
		setOpen(val);
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
							<NumberOfQuestions questions={quizData} activeQuestion={currentQuestion} currentLanguage={currentLanguage} />
							{showQuestion ? (
								<QuestionWrapper
									placementTest={true}
									modalOpen={open}
									currentLanguage={currentLanguage}
									hideRightAnswer
									autoPlay
									selectedAnswerData={allAnswers[currentQuestion]}
									showQuestion={showQuestion}
									onSelectAnswer={onSelectAnswer}
									currentSelectedAnswer={currentSelectedAnswer}
									questionData={quizData[currentQuestion]}
									nextQuestion={nextQuestion}
								/>
							) : (
								<div style={{ flexGrow: 1 }} />
							)}
							<div>
								<div
									style={{
										paddingRight: '4vw',
										paddingLeft: '4vw',
										width: '40%',
									}}
									className='btn-wrapper-quiz-width'
								>
									<CustomButton
										buttonStyle={{
											marginBottom: '10px',
										}}
										disabled={disableCheck}
										onPress={onQuestionCheck}
										text={t('bookScreen.check', { lng: currentLanguage })}
									/>
								</div>
								<PlacementDataModal currentLanguage2={currentLanguage} open={open} onOpenModal={onOpenModal} />
							</div>
						</div>
					) : null}
				</>
			) : (
				!loading && (
					// <QuizResult
					//     userId={userId}
					//     answers={allAnswers}
					//     bookId={bookId}
					//     numberOfQuestions={quizData.quizData.length}
					//     currentLanguage={currentLanguage}
					// />
					<div></div>
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

PlacementQuiz.layout = 'Empt';

export default PlacementQuiz;
