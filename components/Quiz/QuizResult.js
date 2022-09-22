import { forEach } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import Cry from '../../../components/Global/Bees/Cry'
// import Happy from '../../../components/Global/Bees/Happy'
// import CongratsSheet from '../../../components/Global/CongratsSheet'
import { sendQuizData } from '../../src/utils/apis';
import Congrats from '../Bees/Congrats';
import Cry from '../Bees/Cry';
import Happy from '../Bees/Happy';
import CustomButton from '../CustomButton';

const QuizResult = ({ userId, answers, bookId, numberOfQuestions, currentLanguage }) => {
	const [data, setData] = useState(null);
	const [levelUp, setLevelUp] = useState(false);
	const [newLevelData, setNewLevelData] = useState(null);
	const { t, i18n } = useTranslation([], { useSuspense: false });

	const router = useRouter();
	let congratsSheetRef = useRef(null);
	const onReadAgain = () => {
		router.replace(`/book/${bookId}`);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		let correctAnswers = calculateAnswers();
		if (correctAnswers == numberOfQuestions) {
			console.log('full mark');
		}
		// return
		let sendData = await sendQuizData(userId, bookId, answers, correctAnswers, numberOfQuestions, calculatePass());
		if (sendData.levelUp) {
			setLevelUp(true);
			setNewLevelData(sendData.newLevel);
		}
		setData(sendData);
		return () => {};
	}, []);

	const calculateAnswers = () => {
		var correctAnswers = 0;
		answers.forEach((answer) => {
			console.log('check forEach', answer);
			if (answer?.correct) {
				correctAnswers += 1;
			}
		});
		return correctAnswers;
	};
	const calculatePercentage = () => {
		return Math.round((calculateAnswers() / numberOfQuestions) * 100);
	};
	const calculatePass = () => {
		return calculateAnswers() == numberOfQuestions;
	};
	const onGoToLibrary = () => {
		router.push('/home/openLibrary');
	};
	const onCongratsSheetRef = (ref) => {
		congratsSheetRef = ref;
	};
	useEffect(() => {
		if (levelUp) {
			// congratsSheetRef.present()
		}
		return () => {};
	}, [levelUp]);

	return data ? (
		calculatePass() ? (
			<div
				style={{
					height: '100%',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '20px',
					display: 'flex',
					flexDirection: 'column',
					paddingTop: '50px',
				}}
			>
				<Congrats height={153} width={126} />
				<div className='yellowText'>{t('quiz.bravo', { lng: currentLanguage })}</div>
				<div className='blackText'>{t('quiz.youAnswered', { lng: currentLanguage })}</div>
				<div className='blackText'>
					<div className='greenText'>{calculatePercentage()}%</div> {t('quiz.correctly', { lng: currentLanguage })}{' '}
				</div>

				{data.pointIncrease?.points ? (
					<div className='blackText'>{t('bookComponent.points', { points: data.pointIncrease?.points, lng: currentLanguage })}</div>
				) : null}
				<div style={{ paddingRight: '4vw', paddingLeft: '4vw' }} className='btn-wrapper-quiz-width'>
					<CustomButton
						// buttonStyle={{
						//     marginTop: mScale(35),
						//     marginBottom: mScale(20),
						//     width: '100%'
						// }}
						onPress={onGoToLibrary}
						text={t('quiz.explore', { lng: currentLanguage })}
					/>
				</div>
				{/* <CongratsSheet onBottomSheetRef={onCongratsSheetRef} level={newLevelData} sheetHeight={250} confirmationMessage={t('bookComponent.levelUp', { lng: currentLanguage })} confirmText={t('bookComponent.yes', { lng: currentLanguage })} /> */}
			</div>
		) : (
			<div
				style={{
					height: '100%',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '20px',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Cry height={133.09} width={125} />
				<div className='blackText'>{t('quiz.youAnswered', { lng: currentLanguage })}</div>
				<div className='blackText'>
					<div className='redText'>{calculatePercentage()}%</div>
				</div>
				<div className='blackText'>{t('quiz.readAgain', { lng: currentLanguage })}</div>
				<div style={{ paddingRight: '4vw', paddingLeft: '4vw' }} className='btn-wrapper-quiz-width'>
					<CustomButton
						buttonStyle={{
							marginTop: '35px',
							marginBottom: '20px',
							width: '100%',
						}}
						onPress={onReadAgain}
						text={t('quiz.readAgainButton', { lng: currentLanguage })}
					/>
				</div>
			</div>
		)
	) : null;
};

export default QuizResult;
