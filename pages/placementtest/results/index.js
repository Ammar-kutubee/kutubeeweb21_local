import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { sendPlacementTestData } from '../../../src/utils/apis'

import Congrats from '../../../components/Bees/Congrats'
import Happy from '../../../components/Bees/Happy'
import CustomButton from '../../../components/CustomButton';
import { useSelector } from 'react-redux'

const PlacementResult = ({ userId }) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const router = useRouter()
    const state = useSelector(state => state.mainReducer)
    const placementData = useSelector(state => state.mainReducer.placementData)
    const numberOfQuestions = useSelector(state => state.mainReducer.placementData.questions.length)
    const answers = useSelector(state => state.mainReducer.Allanswers)
    const currentLanguage = useSelector(state => state.mainReducer.placementLanguage)

    console.log("des,currentLanguage")
    let congratsSheetRef = useRef(null)
    // const onReadAgain = () => {
    //     router.replace(`/Book/${bookId}`)

    // }

    const chooseStory = () => {
        router.replace("/placementtest")
    }
    useEffect(async () => {
        let correctAnswers = calculateAnswers()

        let sendData = await sendPlacementTestData(userId, placementData._id, answers, correctAnswers, numberOfQuestions)

        setData(sendData)
        return () => {

        }
    }, [])
    const onExit = () => {
        router.replace("/home/level")

    }
    const calculateAnswers = () => {
        var correctAnswers = 0;
        answers.forEach(answer => {
            if (answer.correct) {
                correctAnswers += 1
            }
        })
        return correctAnswers
    }


    return (
        data ?
            !data.lock ?
                < div style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '50px'
                }}>
                    <div className="happyBee">
                        <Congrats width={126} height={153} />
                    </div>
                    <div className="allSet">{t('placementTest.allSet', { lng: currentLanguage, name: state.loggedInUser.userData.fname })}</div>
                    <div className="recommendedLevel">{i18n.t('placementTest.recommendedLevel', { lng: currentLanguage })}</div>
                    <div className="level">{data?.level.nameAr}</div>
                    <div>
                        <div className="levelMean">{t('placementTest.levelMean', { lng: currentLanguage })}</div>
                    </div>
                    <div style={{ paddingRight: '4vw', paddingLeft: '4vw' }} className="btn-wrapper-quiz-width">

                        <CustomButton
                            buttonStyle={{
                                width: '100%',
                                marginTop: "60px"
                            }}
                            onPress={onExit}
                            text={t('placementTest.startJourney', { lng: currentLanguage })}
                        />
                    </div>
                </div>
                :
                < div style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '50px'
                }}>
                    <div className="happyBee">
                        <Happy width={126} height={134} />
                    </div>
                    <div className="tryAnother">{t('placementTest.tryAnotherStory', { lng: currentLanguage })}</div>
                    <div className="moreInfo">{t('placementTest.moreInformation', { lng: currentLanguage })}</div>

                    <div style={{ paddingRight: '4vw', paddingLeft: '4vw' }} className="btn-wrapper-quiz-width">

                        <CustomButton
                            buttonStyle={{
                                width: '100%',
                                marginTop: "120px"
                            }}
                            onPress={chooseStory}
                            text={t('placementTest.chooseStory2', { lng: currentLanguage })}
                        />
                    </div>
                    <div
                        onClick={onExit}
                        style={{ marginTop: "20px" }}>
                        <div className="exit">{t('placementTest.exit', { lng: currentLanguage })}</div>
                    </div>


                </div>
            :
            null
    )
}

PlacementResult.layout = "Empt";

export default PlacementResult;

