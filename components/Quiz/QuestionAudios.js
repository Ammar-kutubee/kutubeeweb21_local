import React, { useEffect, useState } from 'react';

import ReactAudioPlayer from 'react-audio-player';

export default function QuestionAudios({ questionData, questionAudioPaused, onAnswerPlayedToHighlight, onPauseQuestionAudio }) {
	const [questionAudio, setQuestionAudio] = useState(null);
	const [answersAudios, setAnswersAudios] = useState([]);
	const [answersAudiosPaused, setAnswersAudiosPaused] = useState([]);
	const [playedAnswerAudio, setPlayedAnswerAudio] = useState(null);
	useEffect(() => {
		if (questionData.audio != '') {
			setQuestionAudio(questionData.audio);
			let arr = questionData?.answers.map((answer) => {
				return answer.audio;
			});
			setAnswersAudios(arr);
			let audioPlayed = questionData?.answers.map((answer) => {
				return false;
			});
			setAnswersAudiosPaused(audioPlayed);
			console.log('arr', arr);
		}

		// let answerAudios = arr.map((audio,index)=>{

		// })
		return () => {};
	}, []);
	useEffect(() => {
		if (!questionAudioPaused) {
			let audioPlayed = questionData?.answers?.map((answer) => {
				return false;
			});
			setAnswersAudiosPaused(audioPlayed);
		}
		return () => {};
	}, [questionAudioPaused]);
	const playAudio = () => {
		setQuestionAudio(false);
	};
	const onQuestionAudioEnd = () => {
		console.log('questionAudio end');
		let pausedAnswers = answersAudiosPaused.map((answer, index) => {
			return false;
		});
		pausedAnswers[0] = true;
		// onPauseQuestionAudio()
		setPlayedAnswerAudio(0);
		onAnswerPlayedToHighlight(0);
		setAnswersAudiosPaused(pausedAnswers);
		console.log('pausedAnswers', pausedAnswers);
	};
	const onAnswerPlay = () => {
		if (playedAnswerAudio == answersAudios.length - 1) {
			console.log('last one');
			onAnswerPlayedToHighlight(null);
		} else {
			let pausedAnswers = answersAudiosPaused.map((answer, index) => {
				return false;
			});
			pausedAnswers[playedAnswerAudio + 1] = true;
			setPlayedAnswerAudio(playedAnswerAudio + 1);
			setAnswersAudiosPaused(pausedAnswers);
			onAnswerPlayedToHighlight(playedAnswerAudio + 1);
		}
	};
	// onQuestionAudioLoad = () => {
	//     playAudio()
	// }
	return (
		<div>
			{questionAudioPaused ? (
				''
			) : (
				<div>
					{questionAudio && (
						<ReactAudioPlayer
							src={questionAudio}
							paused={questionAudioPaused}
							// onLoad={onQuestionAudioLoad}
							autoPlay
							onEnded={onQuestionAudioEnd}
						/>
					)}
					<>
						{answersAudios.map((audio, index) => {
							console.log('audio', audio);

							return answersAudiosPaused[index] ? <ReactAudioPlayer autoPlay src={audio} onEnded={onAnswerPlay} /> : null;
						})}
					</>
				</div>
			)}
		</div>
	);
}
