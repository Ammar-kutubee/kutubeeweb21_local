import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { getUserData } from '../src/utils/apis';
import Image from 'next/image'
import Link from 'next/link';
import router from 'next/router';

export default function BlueSide() {
    const state = useSelector(state => state.mainReducer)
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    useEffect(async () => {
        let userData = await getUserData(state.loggedInUser.userData._id)
        // console.log("userData", userData)
        setLoading(true)
        setUserData(userData)
        setLoading(false)
        return () => {

        }
    }, [])
    const onSignOut = () => {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userLoggedData');
        dispatch({ type: "USER_LOGGED_IN_TOGGLE", message: { userLoggedIn: false } })
        window.location.href = '/logintype'
        // router.reload()




    }

    const onAvatarClicked = async () => {

        router.push('/Avatar')
    }
    return (
        <div className="blue-bg">
            <div id="sticky-side" className="flex-wrapper-col">
                {!loading &&
                    <>
                        <div className="flex-wrapper-col ">
                            <div className="side-text-white" dangerouslySetInnerHTML={{ __html: t('homeScreen.wellDone', { name: state.loggedInUser.userData.fname }) }}>


                                {/* {t('homeScreen.wellDone', { name: state.loggedInUser.userData.fname })} */}
                            </div>
                            <div className="side-text-white-small">
                                {t('homeScreen.readAnother', { number: userData.nextBadgeCount })}
                            </div>

                        </div>
                        {state.loggedInUser.userData.type != "teacher" &&
                            <div className="sidebar-links">
                                <Link href="/reporting/completedbooks">
                                    <div className="btn-link side-btn books">
                                        <div name="books" className={` link-icon icon-books`}>
                                        </div >
                                        <div className="text-white">
                                            {userData.readbook} {t('homeScreen.books')}
                                        </div>
                                        <div className="icon-right-arrow"></div>
                                    </div>
                                </Link>
                                <Link href="/reporting/readingtime">
                                    <div className="btn-link side-btn hours">
                                        <div name="hours" className={` link-icon icon-clock`}>
                                        </div>
                                        <div className="text-white">
                                            {userData.unit == "hours" ?
                                                userData.hours + " " + t('homeScreen.hours')
                                                :
                                                userData.minutes + " " + t('homeScreen.minutes')
                                            }
                                        </div>
                                        <div className="icon-right-arrow"></div>
                                    </div>
                                </Link>
                                <Link href="/reporting/points">
                                    <div className="btn-link side-btn points">
                                        <div name="points" className={` link-icon icon-star`}>
                                        </div>
                                        <div className="text-white">
                                            {userData.points} {t('homeScreen.points')}
                                        </div>
                                        <div className="icon-right-arrow"></div>

                                    </div>
                                </Link>
                                {/* {state.loggedInUser.userData.type != "individual" &&
                                    <Link href="/home/assignments">
                                        <div className="btn-link side-btn points">
                                            <div name="points" className={` link-icon icon-assignments`}>
                                            </div>
                                            <div className="text-white">
                                                {userData.assignmentCount} {t('homeScreen.assignments')}
                                            </div>
                                            <div className="icon-right-arrow"></div>
                                        </div>
                                    </Link>
                                } */}
                            </div>
                        }
                        <div className="flex-wrapper-col flex-end  last avatarsvg">
                            <div style={{ position: "relative" }} >
                                {userData.lastBadge &&
                                    <img onClick={() => {
                                        router.push('/badges/')
                                    }} className="lastbadgeimg" src={userData.lastBadge} alt="Avatar Image"
                                        style={
                                            i18n.language === "en"?
                                            {
                                            width: '38%',
                                            position: 'absolute',
                                            right: '9%',
                                            top: '30px',
                                            zIndex: '1000'


                                        }:{
                                            width: '38%',
                                            position: 'absolute',
                                            right: '9%',
                                            top: '30px',
                                            zIndex: '1000'
                                        }}
                                    />
                                }
                                

                                <svg onClick={() => {
                                    {
                                        state.loggedInUser.userData.type != "teacher" &&
                                            onAvatarClicked()
                                    }
                                }} width='80%' viewBox="0 0 282.58 435.01">
                                    <path
                                        d="M271.09 169.64c-2.05-33.98-9.36-69.8-25.99-100.49-11.18-20.39-28.04-37.16-47.98-48.9-.25-.27-.52-.28-.77-.55C176.68 7.98 154.69 1.83 132.62.4c-22.05-1.67-44.76 1.84-66 10.92-.29.23-.56.21-.84.44-21.5 9.07-40.69 23.26-54.83 42.26C7.01 59.32 3.37 64.83 0 70.51v319.48c1.01 1.02 2.02 2.04 3.07 3.04 1.77 1.61 3.29 2.95 5.07 4.56 24.64 21.25 56.62 34.77 90.53 36.96l.27.02.54.04.27.02.27.02c.27.02.27.02.54.03l.27.02c33.91 2.19 67.58-6.84 95.18-24.97 1.98-1.12 3.97-2.48 5.7-3.86 32.6-23.53 49.73-57.27 58.97-93.77 1.12-4.16 1.96-8.09 2.81-12.26.29-.23.32-.73.36-1.22.85-4.18 1.69-8.1 2.28-12.3l.04-.49c.57-3.95 1.11-7.65 1.68-11.59.04-.49.09-1.24.13-1.73.3-3.96.85-7.66 1.14-11.63.06-.74.11-1.49.17-2.23l.8-10.65.06-.74c2.2-26.02 2.56-52.38.94-77.62z"
                                        fill="#e7f4f8"
                                    />
                                    <path
                                        d="M247.25 174.51c-4.17-30.8-13.24-62.96-30.4-89.91-11.52-17.89-27.95-32.16-46.83-41.67-.24-.23-.49-.23-.74-.45-18.63-9.51-38.98-13.81-59.09-13.81-20.11-.23-40.46 4.3-59.09 13.81-.25.23-.49.23-.74.45-18.87 9.52-35.3 23.56-46.82 41.68-1.23 1.92-2.4 3.87-3.54 5.84v282.44c5.52 7.44 11.96 14.36 19.47 20.61 1.72 1.36 3.19 2.49 4.9 3.85 23.78 17.89 53.7 28.31 84.59 28.31h1.95c30.89 0 60.81-10.19 84.59-28.31 1.72-1.13 3.43-2.49 4.9-3.85 27.95-23.33 41.19-55.03 47.08-88.77.74-3.85 1.23-7.47 1.72-11.32.24-.23.24-.68.24-1.13.49-3.85.98-7.47 1.23-11.32v-.45c.24-3.62.49-7.02.74-10.64v-1.59c0-3.62.24-7.02.24-10.64v-2.04-9.74-.68c.26-23.79-1.21-47.79-4.4-70.67z"
                                        fill="#fff"
                                    />
                                    <path
                                        d="M259.88 251.78c-11.47 0-20.7-9.5-20.7-21.13 0-11.63 9.23-21.13 20.7-21.13s20.7 9.5 20.7 21.13c0 11.62-9.23 21.13-20.7 21.13z"
                                        fill="#fff"
                                        stroke="#dff1f7"
                                        strokeWidth={4}
                                    />
                                    <foreignObject width="22" height="22" x="250" y="220">
                                   
                                    {console.log("i18n.language",i18n.language)}
                                    <img src="/assets/images/new/pin.png" style={i18n.language === "ar"?{transform:"rotate(0deg)"}:{transform:"rotate(0deg)"}} />  

                                        </foreignObject>
                                    {/* <path
                                        d="M252 234.81v3.28h3.28l9.68-9.68-3.28-3.28-9.68 9.68zM267.5 224.64l-2.05-2.05a.86.86 0 00-.62-.25c-.23 0-.45.09-.61.25l-1.6 1.6 3.28 3.28 1.6-1.6c.34-.33.34-.88 0-1.23z"
                                        fill="#dadada"
                                    /> */}

                                </svg>

                                <div
                                >
                                    {userData.avatarLinkBody ?
                                        <img onClick={() => {
                                            {
                                                state.loggedInUser.userData.type != "teacher" &&
                                                    onAvatarClicked()
                                            }
                                        }} src={userData.avatarLinkBody} alt="Avatar Image"
                                            style={{
                                                width: '75%',
                                                position: 'absolute',
                                                left: '0',
                                                bottom: '15%'

                                            }}
                                        />
                                        :
                                        <img onClick={() => {
                                            {
                                                state.loggedInUser.userData.type != "teacher" &&
                                                    onAvatarClicked()
                                            }
                                        }} src={userData.avatarLinkBody ? userData.avatarLinkBody : '../assets/images/bee.png'} alt="Avatar Image"
                                            style={{
                                                width: '75%',
                                                position: 'absolute',
                                                left: '0',
                                                bottom: '25%'

                                            }}
                                        />
                                    }
                                </div>


                            </div>

                            {state.loggedInUser.userData.type != "teacher" ?
                                <Link href="/profile">
                                    <div className="btn-link  profile">
                                        <div name="user" className={` link-icon icon-user`}>
                                        </div>
                                        <div className="text-blue"> {t('homeScreen.myProfile')}</div>
                                    </div>
                                </Link>
                                :
                                <div className="btn-link  profile " onClick={onSignOut}>
                                    <div name="user" className={` link-icon icon-user`}>
                                    </div>
                                    <div className="text-blue"> {t('homeScreen.signOut')}</div>
                                </div>
                            }
                        </div>
                    </>
                }

            </div >
        </div >
    )
}
