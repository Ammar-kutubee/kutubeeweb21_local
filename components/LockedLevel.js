import { useRouter } from 'next/router';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import CustomButton from './CustomButton'


export default function LockedLevel({ currentLanguage, uid }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const router = useRouter()
    const dispatch = useDispatch()

    console.log("llll", currentLanguage)
    const knowLevel = () => {

        // dispatch({
        //     type: 'PLACEMENT_LANG',
        //     placementLanguage: currentLanguage,
        // })
        router.push("/placementtest")
    }
    return (
        <div style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '15px',
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: '50%',
            left: "50%",
            transform: "translate(-50%,-50%)"
        }}>

            <svg
                width={'85px'}
                height={"111px"}
                viewBox="0 0 85 111"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M73.719 41.625H70.25V27.75C70.25 12.446 57.804 0 42.5 0S14.75 12.446 14.75 27.75v13.875h-3.469C5.546 41.625.875 46.292.875 52.031v48.563C.875 106.333 5.546 111 11.281 111H73.72c5.735 0 10.406-4.667 10.406-10.406V52.031c0-5.74-4.671-10.406-10.406-10.406zM24 27.75c0-10.203 8.297-18.5 18.5-18.5S61 17.547 61 27.75v13.875H24V27.75zm23.125 49.59v10.535A4.624 4.624 0 0142.5 92.5a4.624 4.624 0 01-4.625-4.625V77.339c-2.752-1.605-4.625-4.555-4.625-7.964 0-5.101 4.149-9.25 9.25-9.25s9.25 4.149 9.25 9.25c0 3.409-1.873 6.36-4.625 7.964z"
                    fill="#6A6A6D"
                />
            </svg>
            <div className="lockedText">{t('placementTest.locked', { lng: currentLanguage })}</div>

            <div style={{ paddingRight: '4vw', paddingLeft: '4vw' }} className="btn-wrapper-quiz-width">

                <CustomButton
                    gestureHandlerButton
                    buttonStyle={{
                        marginTop: '20px',
                        width: '100%'
                    }}
                    onPress={knowLevel}
                    text={t('placementTest.knowLevel', { lng: currentLanguage })}
                />
            </div>
        </div>
    )
}
