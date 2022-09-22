import { xor } from 'lodash'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../../components/CustomButton'
import GlobalAudio from '../../../components/PlacementTest/GlobalAudio'

import ReactHtmlParser from 'react-html-parser';

const Description = ({ userId }) => {

    const { t, i18n } = useTranslation([], { useSuspense: false });
    const stateData = useSelector(state => state.mainReducer.placementData)
    const stateLang = useSelector(state => state.mainReducer.placementLanguage)
    const [placementData, setPlacementData] = useState([])
    const [currentLanguage, setCurrentLanguage] = useState()
    const [audioPaused, setAudioPaused] = useState(false)

    const router = useRouter()

    useEffect(async () => {

        if (stateData) {
            setPlacementData(stateData)
            setCurrentLanguage(stateLang)
            router.replace('/placementtest/description')
            return


        } else {
            router.replace('/home/level')


        }


        return () => {

        }
    }, [])
    const goToPlacementTestQuiz = () => {
        setAudioPaused(true)

        router.push('/placementtest/quiz')


    }
    const playPlacementAudio = () => {
        setAudioPaused(false)
    }

    const onAudioEnd = () => {
        setAudioPaused(true)
    }
    const playAudio = () => {
        setAudioPaused(!audioPaused)
     
    }
    return (
        <div className={` ${currentLanguage == "ar" ? "rtlDir" : "ltrDir"}`} style={{
            flexGrow: 1,
            justifyContent: 'flex-start',
            paddingTop: 50,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '72%',
            margin: 'auto'
        }}>
            {stateData &&
                <>
                    {(placementData.audioInstruction != null && placementData.audioInstruction != '') &&
                        audioPaused?
                        ''
                        :
                        <GlobalAudio audioLink={placementData.audioInstruction} paused={audioPaused} onEnd={onAudioEnd} />
                    }
                    <div className="flex-wrapper-row " style={{justifyContent: 'space-between', alignItems: 'center'}}>
                     
                    <div className="section-title" style={{ paddingBottom: '20px' }}>{placementData.name}</div>
                    <div
                        className="audioButton" style={{marginTop:'0px',alignSelf:'center'}}
                        onClick={playAudio}>
                        {!audioPaused ?
                            <svg
                                width={52}
                                height={53}
                                viewBox="0 0 52 52"
                                fill="none">
                                <rect x="1" y="1" width="50" height="50" rx="25" fill="#FFD217" stroke="#E5E5E5" />
                                <rect x="16" y="16" width="6.15386" height="19.8817" rx="1" fill="white" />
                                <rect x="29.8462" y="16" width="6.15386" height="19.8817" rx="1" fill="white" />
                            </svg>
                            :
                            <svg

                                width='52'
                                height='53'
                                viewBox="0 0 52 53"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x={1}
                                    y={1}
                                    width={50}
                                    height={50}
                                    rx={25}
                                    fill="#FFD217"
                                    stroke="#E5E5E5"
                                />
                                <g clipath="url(#prefix__clip0)" fill="#fff">
                                    <path
                                        d="M27.204 38.801l-9.031-7.226h-4.316A1.86 1.86 0 0112 29.719V22.29a1.86 1.86 0 011.857-1.857h4.316l9.032-7.226a.926.926 0 01.983-.11M27.204 38.8a.939.939 0 00.984.11.927.927 0 00.526-.836V13.933m-1.51 24.868l.188-.234h-.001a.638.638 0 00.667.074h0a.627.627 0 00.356-.566V13.934m-1.21 24.867l.186-.235-9.03-7.225-.082-.066h-4.421A1.56 1.56 0 0112.3 29.72V22.29c0-.857.7-1.557 1.557-1.557h4.421l.082-.066 9.033-7.225v-.001a.625.625 0 01.665-.075m.656.568a.932.932 0 00-.526-.838m.526.838h-.3m.3 0h-.3v0m-.226-.838l-.13.27s0 0 0 0m.13-.27l-.13.27s0 0 0 0m0 0a.632.632 0 01.356.568"
                                        stroke="#fff"
                                        strokeWidth={0.6}
                                    />
                                    <path d="M33.414 19.435a.93.93 0 00-1.313.008.932.932 0 00.007 1.315 7.307 7.307 0 012.177 5.244c0 1.997-.773 3.86-2.177 5.245a.93.93 0 00.652 1.587c.236 0 .472-.089.654-.269 1.76-1.733 2.728-4.066 2.728-6.563 0-2.498-.968-4.83-2.728-6.567z" />
                                    <path d="M36.034 16.817a.93.93 0 00-1.31 1.318A10.992 10.992 0 0138 26c0 2.979-1.163 5.77-3.275 7.862a.934.934 0 00-.005 1.316.933.933 0 001.315.003A12.825 12.825 0 0039.856 26c0-3.479-1.356-6.74-3.822-9.183z" />
                                </g>
                                <defs>
                                    <clippath id="prefix__clip0">
                                        <path
                                            fill="#fff"
                                            transform="translate(12 13)"
                                            d="M0 0h27.856v26H0z"
                                        />
                                    </clippath>
                                </defs>
                            </svg>
                        }
                    </div>
                    </div>
                    <div style={{
                        flexGrow: 1,
                        width: '100%',
                        position: 'relative'
                    }}>
                        <div
                            style={{
                                flex: 1
                            }}
                        >
                            <img
                                src={placementData.imageInside}
                                style={{
                                    margin: 'auto',
                                    borderRadius: '16px',
                                    display: 'block'
                                }}
                            />
                            <div
                                style={{ fontSize: placementData.fontSize + 'px', lineHeight: placementData.lineHeight + 'px' }}
                                className={`placementDescription  ${currentLanguage == 'ar' ? "adobeStyle" : ""}`}
                            >


                                {placementData.description?.split("\n").map((i, key) => {
                                    return <div key={key}>{i}</div>;
                                })}



                            </div>
                            <div style={{ paddingRight: '4vw', paddingLeft: '4vw' }} className="btn-wrapper-test-width">

                                <CustomButton
                                    onPress={goToPlacementTestQuiz}
                                    buttonStyle={{
                                        marginTop: "20px",
                                        marginBottom: "20px"
                                    }}
                                    text={t('bookComponent.done', { lng: currentLanguage })}
                                />
                            </div>

                        </div>

                    </div>
                </>
            }
        </div>


    )
}

Description.layout = "Empt";

export default Description;