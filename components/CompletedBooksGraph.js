import React from 'react'
import { useTranslation } from 'react-i18next';
import LevelDescriptionpopup from './Book/LevelDescriptionpopup';
import LevelHomeDescription from './Book/LevelHomeDescription';



export default function CompletedBooksGraph({ currentLanguage, userLevel, userLevelLoading, locked }) {
    console.log("us", userLevel)
    const { t, i18n } = useTranslation([], { useSuspense: false });

    const circle = {
        y: '62.5',
        x: '62.5',
        r: '58.5',
        strokeWidth: '8px',
    }
    const timerDasharray = Math.PI * (circle.r * 2)
    const calculateChart = () => {
        if (userLevel) {
            let t = (userLevel.remainingbooks / userLevel.allbooks) * timerDasharray
            return t

        } else {
            return 1
        }

    }

    return (
        <>
            <div className={`flex-wrapper-row ${currentLanguage == 'ar' ? 'rtlDir' : 'ltrDir'}`}

                style={{
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '2vw',
                    marginBottom: '1vw',
                    marginTop: '1vw',
                }}
            >

                <div className="rightWrapper">
                    <div style={{
                        width: '125px',
                        height: '125px',
                        position: 'relative'
                    }}>
                        <svg
                            width='125px'
                            height='125px'
                            viewBox="0 0 125 125"
                            className="rotate-level"
                        >
                            <circle
                                useNativeDriver={true}
                                cx={circle.x}
                                cy={circle.y}
                                r={circle.r}
                                fill="none"
                                stroke={"#F4F4F4"}
                                strokeWidth={circle.strokeWidth}
                                strokeMiterlimit={10}
                                strokeDasharray={timerDasharray}
                                strokeDashoffset={0}
                                strokeLinecap="round"
                            />
                            <circle
                                useNativeDriver={true}
                                cx={circle.x}
                                cy={circle.y}
                                r={circle.r}
                                fill="none"
                                stroke={"#86CF0E"}
                                strokeWidth={circle.strokeWidth}
                                strokeMiterlimit={10}
                                strokeDasharray={timerDasharray}
                                strokeDashoffset={calculateChart()}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="graphTextWrapper">
                            <div className="numberOfCompletedBooks">{userLevel ? userLevel.finishedbook : 30}</div>
                            <div className={`completedOfText ${currentLanguage == 'ar' ? 'arabicText' : ''}`}>{t('mainSlides.level.complete', { lng: currentLanguage })}</div>
                            {currentLanguage ?

                                <>
                                    <div className="completedOfTextBig">{userLevel?.allbooks}</div>

                                    <div className={`completedOfText ${currentLanguage == 'ar' ? 'arabicText' : ''}`}> {t('mainSlides.level.books', { lng: currentLanguage })}</div>
                                </>
                                :
                                <>
                                    <div className="completedOfTextBig">{userLevel?.allbooks}</div>
                                    <div className={`completedOfText ${currentLanguage == 'ar' ? 'arabicText' : ''}`}> {t('mainSlides.level.books', { lng: currentLanguage })}</div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="leftWrapper">
                    <div style={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1vw',
                        marginTop: '-1.5vw'
                    }}>
                        <div className="mainTitle">{t('titles.yourLevel', { lng: currentLanguage })}</div>
                        {locked == "true" ?
                            <div className="mainNumber">?</div>

                            :
                            <div className="mainNumber">{userLevel ? userLevel.userlevel.replace('Level ', '') : 10}</div>
                        }
                    </div>
                    <div >
                        {locked == "true" ?
                            <div></div>
                            :
                            <div className="textWrapper">
                                <div className="smallText">{t('mainSlides.level.readAnother', { lng: currentLanguage })} </div>
                                <div className="bigText"> {userLevel ? userLevel.remainingbooks : 30} </div>
                                <div className="smallText"> {t('mainSlides.level.readAnother2', { lng: currentLanguage }) + ' '}
                                    {t('mainSlides.level.readAnother3', { lng: currentLanguage })}</div>


                                <LevelHomeDescription nextLevel={userLevel?.nextLeve} Title={userLevel?.nextLevel} Description={userLevel?.nextLevelDesc} language={currentLanguage}> <div name="info" className="infoIcon icon-info" /></LevelHomeDescription>


                            </div>
                        }
                    </div>

                </div>
            </div >
        </>
    )
}
