import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import { getUserData } from '../../src/utils/apis';

export default function StudentInfo({ type }) {
    const state = useSelector(state => state.mainReducer)
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const { t, i18n } = useTranslation([], { useSuspense: false });

    useEffect(async () => {
        let userData = await getUserData(state.loggedInUser.userData._id)
        setLoading(true)
        // console.log('eeeeeeeeeeeeeeeeeeeeee', userData)
        setUserData(userData)
        setLoading(false)
        return () => {

        }
    }, [])
    return (
        <div className="info-wrapper">
            <div className="flex-wrapper-row align-center" style={{ gap: '15px', paddingBottom: '15px' }}>
                <svg
                    width={32}
                    height={24}
                    viewBox="0 0 32 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"

                >
                    <g clipPath="url(#prefix__clip0)">
                        <path
                            d="M29.333 2.667A2.67 2.67 0 0026.667 0h-24A2.67 2.67 0 000 2.667v16a2.67 2.67 0 002.667 2.667A2.67 2.67 0 005.334 24h24A2.67 2.67 0 0032 21.334v-16a2.67 2.67 0 00-2.668-2.667z"
                            fill="#000"
                        />
                        <path
                            d="M29.333 4v14.667a2.67 2.67 0 01-2.667 2.667H4c0 .735.598 1.333 1.333 1.333h24c.736 0 1.333-.598 1.333-1.333v-16c0-.736-.597-1.334-1.333-1.334z"
                            fill="#82D1E2"
                        />
                        <path
                            d="M1.333 18.667v-16c0-.735.598-1.333 1.333-1.333h24c.736 0 1.333.598 1.333 1.333v16c0 .735-.597 1.333-1.333 1.333h-24a1.335 1.335 0 01-1.333-1.333z"
                            fill="#FFD02F"
                        />
                        <path
                            d="M11.994 8.19a2.667 2.667 0 10-5.32-.378 2.667 2.667 0 005.32.378z"
                            fill="#000"
                        />
                        <path
                            d="M10.663 8.095a1.333 1.333 0 10-2.66-.189 1.333 1.333 0 002.66.19z"
                            fill="#fff"
                        />
                        <path
                            d="M13.316 12.316c-.932-.449-2.379-.983-3.983-.983s-3.05.534-3.983.983c-.833.4-1.35 1.2-1.35 2.088v.305C4 15.42 4.598 16 5.333 16h8c.736 0 1.333-.58 1.333-1.292v-.305c0-.887-.516-1.687-1.35-2.088z"
                            fill="#000"
                        />
                        <path
                            d="M13.333 14.667l-8 .042v-.305c0-.37.228-.71.595-.886.808-.389 2.052-.851 3.405-.851 1.353 0 2.598.463 3.405.85.367.177.595.517.595.887v.263z"
                            fill="#fff"
                        />
                        <path
                            d="M24.667 14.667h-8a.666.666 0 100 1.333h8a.666.666 0 100-1.333zM24.667 10.667h-8a.666.666 0 100 1.334h8a.666.666 0 100-1.334zM24.667 6.667h-8a.666.666 0 100 1.334h8a.666.666 0 100-1.334z"
                            fill="#000"
                        />
                    </g>
                    <defs>
                        <clipPath id="prefix__clip0">
                            <path fill="#fff" d="M0 0h32v24H0z" />
                        </clipPath>
                    </defs>
                </svg>
                {type == "individual" ?
                    <div className="section-titleblack"> {t('homeScreen.individualInfo')}</div>

                    :
                    <div className="section-titleblack"> {t('homeScreen.studentInfo')}</div>
                }
            </div >
            <div className="flex-wrapper-row align-center" style={{ gap: '2vw' }}>
                <div className="flex-wrapper-col" style={{ gap: '0.8vw', flexGrow: '0.5', width: '49%' }}>
                    <div className="black-text studentname">
                        {userData.fname} {state.loggedInUser.userData.lname}
                    </div>
                    <div className="grey-text studentemail">
                        {userData.email}
                    </div>
                </div>
                <div className="flex-wrapper-row align-center" style={{ gap: '0.8vw', flexGrow: '0.5', width: '49%' }} >
                    <img src={userData.logo} style={{ width: '70px', border: '1px solid #e5e5e5', borderRadius: '92px', padding: '10px' }} />
                    <div className="flex-wrapper-col" style={{ gap: '0.5vw' }}>
                        <div className="black-text">
                            {userData.schoolName}
                        </div>
                        <div className="grey-text">
                            {userData.className} {userData.sectionName}
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
