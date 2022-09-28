import React, { useEffect, useRef, useState } from 'react';
import { compose } from 'redux';

import QuestionAnswers from './QuestionAnswers';
import QuestionAudios from './QuestionAudios';
import QuestionAnswersDnd from './QuestionAnswersDnd';
import QuestionAnswersSorting from './QuestionAnswersSorting';
import QuestionAnswersMemory from './QuestionAnswersMemory';

export default function QuestionWrapper({
	placementTest,
	correctDndtAnswers,
	secondAttmept,
	setUserOrder,
	questionData,
	currentSelectedAnswer,
	onSelectAnswer,
	showQuestion,
	selectedAnswerData,
	hideRightAnswer,
	autoPlay,
	currentLanguage,
	modalOpen,
	nextQuestion,
	onQuestionCheck,
	checkingDndAns,
	setCheckingDndAns,
}) {
	// const [selectedAnswer, setSelectedAnswer] = useState(null)
	console.log(currentLanguage);
	console.log('QD', questionData);
	const questionAudiosRef = useRef(null);
	let answersAudios = [];
	// onSelectAnswer = (index) => {
	//     onSelectAnswer(index)
	// }
	const [questionAudio, setQuestionAudio] = useState(null);
	const [questionAudioPaused, setQuestionAudioPaused] = useState(true);
	const [answersAudiosPaused, setAnswersAudiosPaused] = useState([]);
	const [playedAnswerAudio, setPlayedAnswerAudio] = useState(null);
	const [allMatched, setAllMatched] = useState(false);

	useEffect(() => {
		setAnswersAudiosPaused(new Array(questionData?.answers?.length).fill(true));
		console.log('autoPlaaaaay', autoPlay);
		if (autoPlay) {
			setQuestionAudioPaused(false);
		}
		return () => {};
	}, []);
	const playAudio = () => {
		// console.log('questionAudio',questionAudiosRef.current.playAudio)
		setQuestionAudioPaused(!questionAudioPaused);
		setPlayedAnswerAudio(null);
		// if (playedAnswerAudio == null) {
		//     setQuestionAudioPaused(false)
		// }

		// questionAudio.play()
	};
	const onPauseQuestionAudio = () => {
		setQuestionAudioPaused(true);
	};
	const onAnswerPlayedToHighlight = (answerPlayed) => {
		console.log('answer play', answerPlayed);
		setPlayedAnswerAudio(answerPlayed);
	};
	useEffect(() => {
		if (modalOpen) {
			onPauseQuestionAudio(true);
			setPlayedAnswerAudio(null);
		}
		return () => {};
	}, [modalOpen]);
	return (
		<div className='questionWrapper'>
			<QuestionAudios
				onPauseQuestionAudio={onPauseQuestionAudio}
				onAnswerPlayedToHighlight={onAnswerPlayedToHighlight}
				playQuestionAudio={playAudio}
				answersAudiosPaused={answersAudiosPaused}
				questionAudioPaused={questionAudioPaused}
				questionData={questionData}
				questionAudiosRef={questionAudiosRef}
			/>
			<div className='questionTitleWrapper'>
				{questionData.audio != null && questionData.audio != '' ? (
					<div className='audioButton' onClick={playAudio}>
						{!questionAudioPaused ? (
							<svg width={52} height={53} viewBox='0 0 52 52' fill='none'>
								<rect x='1' y='1' width='50' height='50' rx='25' fill='#FFD217' stroke='#E5E5E5' />
								<rect x='16' y='16' width='6.15386' height='19.8817' rx='1' fill='white' />
								<rect x='29.8462' y='16' width='6.15386' height='19.8817' rx='1' fill='white' />
							</svg>
						) : (
							<svg width='52' height='53' viewBox='0 0 52 53' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<rect x={1} y={1} width={50} height={50} rx={25} fill='#FFD217' stroke='#E5E5E5' />
								<g clipath='url(#prefix__clip0)' fill='#fff'>
									<path
										d='M27.204 38.801l-9.031-7.226h-4.316A1.86 1.86 0 0112 29.719V22.29a1.86 1.86 0 011.857-1.857h4.316l9.032-7.226a.926.926 0 01.983-.11M27.204 38.8a.939.939 0 00.984.11.927.927 0 00.526-.836V13.933m-1.51 24.868l.188-.234h-.001a.638.638 0 00.667.074h0a.627.627 0 00.356-.566V13.934m-1.21 24.867l.186-.235-9.03-7.225-.082-.066h-4.421A1.56 1.56 0 0112.3 29.72V22.29c0-.857.7-1.557 1.557-1.557h4.421l.082-.066 9.033-7.225v-.001a.625.625 0 01.665-.075m.656.568a.932.932 0 00-.526-.838m.526.838h-.3m.3 0h-.3v0m-.226-.838l-.13.27s0 0 0 0m.13-.27l-.13.27s0 0 0 0m0 0a.632.632 0 01.356.568'
										stroke='#fff'
										strokeWidth={0.6}
									/>
									<path d='M33.414 19.435a.93.93 0 00-1.313.008.932.932 0 00.007 1.315 7.307 7.307 0 012.177 5.244c0 1.997-.773 3.86-2.177 5.245a.93.93 0 00.652 1.587c.236 0 .472-.089.654-.269 1.76-1.733 2.728-4.066 2.728-6.563 0-2.498-.968-4.83-2.728-6.567z' />
									<path d='M36.034 16.817a.93.93 0 00-1.31 1.318A10.992 10.992 0 0138 26c0 2.979-1.163 5.77-3.275 7.862a.934.934 0 00-.005 1.316.933.933 0 001.315.003A12.825 12.825 0 0039.856 26c0-3.479-1.356-6.74-3.822-9.183z' />
								</g>
								<defs>
									<clippath id='prefix__clip0'>
										<path fill='#fff' transform='translate(12 13)' d='M0 0h27.856v26H0z' />
									</clippath>
								</defs>
							</svg>
						)}
					</div>
				) : null}

				<div
					// from={{ translateY: -40,opacity:0 }}
					// animate={{ translateY: 0,opacity:1 }}
					// exit={{
					//     opacity: 0,
					// }}
					className='questionTitle'
					style={{ fontFamily: 'FF Hekaya' }}
				>
					{questionData.name}
				</div>
			</div>
			{/* {console.log('questionData', questionData.answerType)} */}
			{/* {console.log("questionDatavvvvv",questionData.questionType === "drag_drop")} */}

			{questionData.questionType === 'drag_drop' ? (
				<QuestionAnswersDnd
					correctDndtAnswers={correctDndtAnswers}
					setUserOrder={setUserOrder}
					currentLanguage={currentLanguage}
					answerType={questionData.answerType}
					playedAnswerAudio={playedAnswerAudio}
					hideRightAnswer={hideRightAnswer}
					selectedAnswerData={selectedAnswerData}
					selectedAnswer={currentSelectedAnswer}
					onSelectAnswer={onSelectAnswer}
					answers={questionData.answers}
					answersType={questionData.answerType}
					nextQuestion={nextQuestion}
					questionTagg={questionData.name}
					checkingDndAns={checkingDndAns}
					setCheckingDndAns={setCheckingDndAns}
				/>
			) : questionData.questionType === 'memory_game' ? (
				<QuestionAnswersMemory
					placementTest={placementTest}
					// secondAttmept={secondAttmept}
					correctDndtAnswers={correctDndtAnswers}
					currentLanguage={currentLanguage}
					answerType={questionData.answerType}
					playedAnswerAudio={playedAnswerAudio}
					// hideRightAnswer={hideRightAnswer}
					selectedAnswerData={selectedAnswerData}
					// selectedAnswer={currentSelectedAnswer}
					// onSelectAnswer={onSelectAnswer}
					answers={questionData.answers}
					answersType={questionData.answerType}
					allMatched={allMatched}
					nextQuestion={nextQuestion}
					onQuestionCheck={onQuestionCheck}
					questionTagg={questionData.name}
				/>
			) : questionData.questionType === 'sorting' ? (
				<QuestionAnswersSorting
					correctDndtAnswers={correctDndtAnswers}
					setUserOrder={setUserOrder}
					currentLanguage={currentLanguage}
					answerType={questionData.answerType}
					playedAnswerAudio={playedAnswerAudio}
					hideRightAnswer={hideRightAnswer}
					selectedAnswerData={selectedAnswerData}
					selectedAnswer={currentSelectedAnswer}
					onSelectAnswer={onSelectAnswer}
					answers={questionData.answers}
					answersType={questionData.answerType}
					nextQuestion={nextQuestion}
					questionTagg={questionData.name}
				/>
			) : (
				<QuestionAnswers
					placementTest={placementTest}
					secondAttmept={secondAttmept}
					correctDndtAnswers={correctDndtAnswers}
					currentLanguage={currentLanguage}
					answerType={questionData.answerType}
					playedAnswerAudio={playedAnswerAudio}
					hideRightAnswer={hideRightAnswer}
					selectedAnswerData={selectedAnswerData}
					selectedAnswer={currentSelectedAnswer}
					onSelectAnswer={onSelectAnswer}
					answers={questionData.answers}
					// answersType={questionData.answerType}
					questionTypee={questionData.questionType}
					placeHolderr={questionData.name}
				/>
			)}
		</div>
	);
}
