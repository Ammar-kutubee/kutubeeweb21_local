import Link from 'next/link';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import LastBadge from '../../components/Badge/LastBadgeProfile';
import Insidelayout from '../../components/layouts/insidelayout'
import LevelBlocksList from '../../components/LeaderBoard/LevelBlocksList';
import Map from '../../components/Map';
import StudentInfo from '../../components/Profile/studentinfo'
import SkillsBlock from '../../components/reporting/skillsblock';
import SwitchAccountModal from '../../components/SwitchAccountModal';
import { getBadges } from '../../src/utils/apis';

const Profile = ({ userId }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation([], { useSuspense: false })
    const [latestBadge, setLatestBadge] = useState([])
    const language = i18n.language
    const state = useSelector(state => state.mainReducer)
    const loggedInUser = state.loggedInUser

    const onSignOut = () => {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userLoggedData');
        dispatch({ type: "USER_LOGGED_IN_TOGGLE", message: { userLoggedIn: false } })
        window.location.href = '/logintype'
    }

    useEffect(async () => {
        const Badgeslist = await getBadges(userId, language)
        setLatestBadge(Badgeslist.lastBadge)



    }, [language])
    return (
        <div className="profile-wrapper ">
            <div className="right-side-links flex-wrapper-row align-center">
                <div className=" right-link sign-out flex-wrapper-row  align-center" onClick={onSignOut}>
                    <div className="icon-sign-out"></div>
                    <div className="white-text-samll"> {t('homeScreen.signOut')}</div>
                </div>
                <div className="right-link settings flex-wrapper-row align-center" onClick={() => router.push('/settings')}>
                    <div className="icon-settings"></div>
                    <div className="white-text-samll"> {t('homeScreen.settings')}</div>
                </div>
                {loggedInUser.userData.type == "individual" &&

                    <SwitchAccountModal userId={userId}></SwitchAccountModal>
                }
            </div>

            <StudentInfo type={loggedInUser.userData.type}></StudentInfo>
            <div className="flex-wrapper-row" style={{ gap: '20px', marginTop: '20px' }}>

                <div className="flex-wrapper-col" style={{ width: '50%' }}>

                    <div className="whiteBlock">
                        <SkillsBlock userId={userId}></SkillsBlock>

                    </div>
                    {loggedInUser.userData.type == "student" && loggedInUser.userData.leaderboard &&
                        <div className="whiteBlock ">
                            <LevelBlocksList userId={userId}></LevelBlocksList>


                        </div>
                    }
                    <img src="../../assets/images/1.png" style={{ marginBottom: '20px', borderRadius: '20px' }}></img>

                    {/* <img src="../../assets/images/4.png" style={{ marginBottom: '20px', borderRadius: '20px', cursor: 'pointer' }}></img> */}

                </div>
                <div className="flex-wrapper-col" style={{ width: '50%' }}>
                    <div className="whiteBlock smallblock badgeblock">
                        <div>
                            <div className={`section-title flex-wrapper-row align-items justify-content `} style={{ marginTop: '5px', gap: '1vw',alignItems:"center" }} >
                                <svg
                                    width={31}
                                    viewBox="0 0 31 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.113 39.238L5.83 34.835l-4.906.257a.33.33 0 01-.301-.494L9.86 18.18l8.066 4.65-9.238 16.417a.326.326 0 01-.575-.009z"
                                        fill="#E52730"
                                    />
                                    <path
                                        d="M22.887 39.239l2.283-4.403 4.907.257a.33.33 0 00.301-.495L21.141 18.18l-8.067 4.65 9.238 16.418a.326.326 0 00.575-.01z"
                                        fill="#E52730"
                                    />
                                    <path
                                        d="M22.887 39.237l2.283-4.403-8.063-14.33-4.033 2.325 9.238 16.419a.326.326 0 00.575-.01z"
                                        fill="#E52730"
                                    />
                                    <path
                                        d="M16.335 1.328l1.264-.564a2.057 2.057 0 012.457.613l.861 1.094c.363.46.9.746 1.48.786l1.378.097a2.083 2.083 0 011.895 1.698l.26 1.374a2.1 2.1 0 00.95 1.392l1.176.733a2.11 2.11 0 01.897 2.396l-.4 1.338a2.12 2.12 0 00.201 1.68l.705 1.202c.48.82.355 1.864-.305 2.544l-.969.997c-.407.42-.622.993-.592 1.582l.072 1.396a2.097 2.097 0 01-1.438 2.108l-1.315.428a2.082 2.082 0 00-1.251 1.121l-.578 1.27a2.068 2.068 0 01-2.24 1.192l-1.362-.242a2.056 2.056 0 00-1.622.405l-1.095.854a2.054 2.054 0 01-2.53 0l-1.096-.854a2.056 2.056 0 00-1.622-.405l-1.36.242a2.068 2.068 0 01-2.242-1.191l-.577-1.27a2.083 2.083 0 00-1.252-1.122l-1.315-.428a2.098 2.098 0 01-1.437-2.108l.071-1.396a2.118 2.118 0 00-.592-1.582l-.969-.997a2.119 2.119 0 01-.304-2.544l.705-1.203a2.12 2.12 0 00.2-1.679l-.4-1.338a2.112 2.112 0 01.898-2.396l1.177-.733c.496-.31.84-.814.949-1.392l.26-1.374a2.082 2.082 0 011.894-1.698l1.379-.097a2.065 2.065 0 001.479-.786l.86-1.094a2.057 2.057 0 012.458-.613l1.264.564c.535.237 1.14.237 1.673 0z"
                                        fill="#FCDF6C"
                                    />
                                    <path
                                        d="M16.335 1.328l1.264-.564a2.057 2.057 0 012.457.613l.861 1.094c.363.46.9.746 1.48.786l1.378.097a2.083 2.083 0 011.895 1.698l.26 1.374a2.1 2.1 0 00.95 1.392l1.176.733a2.11 2.11 0 01.897 2.396l-.4 1.338a2.12 2.12 0 00.201 1.68l.705 1.202c.48.82.355 1.864-.305 2.544l-.969.997c-.407.42-.622.993-.592 1.582l.072 1.396a2.097 2.097 0 01-1.438 2.108l-1.315.428a2.082 2.082 0 00-1.251 1.121l-.578 1.27a2.068 2.068 0 01-2.24 1.192l-1.362-.242a2.056 2.056 0 00-1.622.405l-1.095.854a2.054 2.054 0 01-2.53 0l-1.096-.854a2.056 2.056 0 00-1.622-.405l-1.36.242a2.068 2.068 0 01-2.242-1.191l-.577-1.27a2.083 2.083 0 00-1.252-1.122l-1.315-.428a2.098 2.098 0 01-1.437-2.108l.071-1.396a2.118 2.118 0 00-.592-1.582l-.969-.997a2.119 2.119 0 01-.304-2.544l.705-1.203a2.12 2.12 0 00.2-1.679l-.4-1.338a2.112 2.112 0 01.898-2.396l1.177-.733c.496-.31.84-.814.949-1.392l.26-1.374a2.082 2.082 0 011.894-1.698l1.379-.097a2.065 2.065 0 001.479-.786l.86-1.094a2.057 2.057 0 012.458-.613l1.264.564c.535.237 1.14.237 1.673 0z"
                                        fill="#FFD217"
                                    />
                                    <path
                                        d="M25.25 14.925c0 5.451-4.365 9.87-9.75 9.87s-9.75-4.419-9.75-9.87c0-5.452 4.366-9.87 9.75-9.87s9.75 4.418 9.75 9.87z"
                                        fill="#E52730"
                                    />
                                    <path
                                        d="M15.722 8.09l1.41 4.394a.235.235 0 00.223.164h4.564c.227 0 .321.294.137.43l-3.691 2.715a.24.24 0 00-.085.265l1.41 4.394c.07.219-.177.4-.361.265l-3.692-2.715a.233.233 0 00-.276 0l-3.691 2.715c-.184.136-.432-.047-.361-.265l1.41-4.394a.239.239 0 00-.086-.265l-3.692-2.716c-.184-.135-.089-.43.138-.43h4.563a.235.235 0 00.223-.163l1.41-4.394a.234.234 0 01.447 0z"
                                        fill="#F2F2F2"
                                    />
                                    <path
                                        d="M25.828 14.924c0-5.765-4.634-10.455-10.329-10.455-5.696 0-10.33 4.69-10.33 10.455 0 5.766 4.634 10.457 10.33 10.457 5.695 0 10.329-4.692 10.329-10.457zM15.499 24.21c-5.057 0-9.172-4.165-9.172-9.285 0-5.119 4.115-9.283 9.172-9.283s9.171 4.165 9.171 9.283c0 5.12-4.114 9.285-9.17 9.285z"
                                        fill="#000"
                                    />
                                    <path
                                        d="M22.693 12.63a.812.812 0 00-.773-.568h-4.313l-1.333-4.153a.812.812 0 00-.774-.57.812.812 0 00-.773.57l-1.333 4.153H9.081a.812.812 0 00-.773.569c-.11.34.009.71.295.92l3.49 2.567-1.333 4.153c-.11.34.009.71.295.92.286.21.67.21.957 0l3.49-2.567 3.489 2.567a.803.803 0 00.956 0 .827.827 0 00.295-.92l-1.333-4.153 3.49-2.567a.827.827 0 00.294-.92zm-4.667 2.688a.827.827 0 00-.295.92l1.082 3.373-2.834-2.084a.804.804 0 00-.956 0L12.19 19.61l1.083-3.373a.827.827 0 00-.295-.92l-2.835-2.086h3.504a.812.812 0 00.773-.57L15.5 9.29l1.083 3.374c.11.34.42.569.773.569h3.504l-2.835 2.086z"
                                        fill="#000"
                                    />
                                    <path
                                        d="M30.88 34.306l-5.427-9.646.951-.309a2.687 2.687 0 001.839-2.697l-.072-1.396a1.53 1.53 0 01.427-1.14l.969-.998a2.712 2.712 0 00.39-3.253l-.706-1.202a1.536 1.536 0 01-.145-1.211l.4-1.339a2.703 2.703 0 00-1.147-3.064l-1.177-.733a1.516 1.516 0 01-.684-1.004l-.26-1.373a2.665 2.665 0 00-2.423-2.173l-1.378-.096a1.492 1.492 0 01-1.067-.567l-.861-1.094a2.635 2.635 0 00-3.143-.784l-1.264.564a1.48 1.48 0 01-1.204 0L13.632.227a2.634 2.634 0 00-3.143.785l-.86 1.094c-.261.331-.65.538-1.067.567l-1.379.095a2.666 2.666 0 00-2.422 2.173L4.5 6.315a1.52 1.52 0 01-.685 1.004l-1.176.733a2.702 2.702 0 00-1.148 3.064l.4 1.338c.121.406.068.847-.146 1.21l-.705 1.204a2.713 2.713 0 00.39 3.253l.969.997c.293.302.45.717.427 1.14l-.072 1.397a2.686 2.686 0 001.839 2.697l.95.308L.12 34.306a.927.927 0 00.016.935.9.9 0 00.818.435l4.536-.238 2.112 4.07a.906.906 0 00.787.492h.015a.902.902 0 00.788-.464l5.523-9.816a2.615 2.615 0 001.571 0l5.524 9.816a.904.904 0 00.787.464h.015a.905.905 0 00.787-.491l2.112-4.071 4.537.238a.9.9 0 00.818-.435.929.929 0 00.016-.935zM8.413 38.553l-1.923-3.708 1.136-2.018a.59.59 0 00-.217-.8.576.576 0 00-.79.22l-1.135 2.018-4.132.217 5.216-9.27c.098.111.182.237.244.376l.578 1.271c.3.66.84 1.148 1.478 1.391l-.905 1.608a.59.59 0 00.216.8.575.575 0 00.79-.22l1.145-2.035c.047-.006.095-.013.14-.021l1.363-.241c.41-.073.837.033 1.169.292l.918.715-5.291 9.405zm7.84-10.088c-.002.001-.004.001-.005.003l-.01.005a1.478 1.478 0 01-1.475 0c-.003-.001-.005-.004-.01-.005 0-.002-.003-.002-.005-.003a1.51 1.51 0 01-.16-.108l-1.095-.853a2.636 2.636 0 00-2.075-.518l-1.362.241a1.41 1.41 0 01-.262.022h-.02a1.495 1.495 0 01-1.332-.88l-.578-1.271a2.679 2.679 0 00-1.185-1.259l-.004-.002-.009-.005-.037-.019-.008-.004a2.62 2.62 0 00-.356-.146l-1.315-.427a1.513 1.513 0 01-1.037-1.52l.072-1.397a2.71 2.71 0 00-.758-2.023l-.968-.997a1.529 1.529 0 01-.22-1.833l.704-1.203A2.72 2.72 0 003 12.115l-.4-1.339a1.521 1.521 0 01.647-1.726l1.176-.733a2.692 2.692 0 001.215-1.781l.26-1.374a1.503 1.503 0 011.365-1.225l1.379-.095a2.648 2.648 0 001.892-1.006l.86-1.094a1.485 1.485 0 011.772-.442l1.264.563a2.627 2.627 0 002.137 0l1.265-.563a1.483 1.483 0 011.77.442l.862 1.094a2.65 2.65 0 001.892 1.006l1.379.096c.676.047 1.238.55 1.366 1.224l.26 1.374a2.69 2.69 0 001.213 1.78l1.177.733c.578.36.844 1.07.647 1.726l-.4 1.34a2.723 2.723 0 00.257 2.148l.706 1.202c.345.59.256 1.344-.22 1.833l-.97.998a2.71 2.71 0 00-.758 2.022l.072 1.397c.036.685-.39 1.31-1.036 1.52l-1.316.427c-.123.04-.241.089-.355.145l-.01.004c-.011.006-.024.012-.036.02a.264.264 0 00-.01.004l-.002.002a2.675 2.675 0 00-1.186 1.259l-.578 1.27a1.495 1.495 0 01-1.33.88l-.024.001c-.087 0-.174-.007-.26-.022l-1.361-.241c-.73-.13-1.488.06-2.075.518l-1.095.853a1.2 1.2 0 01-.159.11zm9.264 5.8l-1.145-2.034a.575.575 0 00-.79-.22.59.59 0 00-.216.8l1.144 2.034-1.923 3.708-5.292-9.405.918-.715c.33-.259.757-.365 1.169-.292l1.36.24c.048.01.095.015.142.022l1.145 2.034a.578.578 0 00.789.22.59.59 0 00.216-.8l-.903-1.607a2.664 2.664 0 001.477-1.39l.578-1.272c.063-.138.146-.264.244-.376l5.216 9.27-4.13-.217z"
                                        fill="#000"
                                    />
                                </svg>
                                <div style={{ flexGrow: '1' }}>{t("homeScreen.badges")} </div>

                                <Link href="/badges">
                                    <div className="save" style={{ marginTop: '0px' }}>
                                        {t("badges.openbadges")}

                                    </div>

                                </Link>
                            </div >


                        </div>
                        <LastBadge className="profile-badge-block" latestBadge={latestBadge}></LastBadge>

                    </div>
                    <div className="flex-wrapper-col map-block" style={{ width: '100%', gap: '20px', marginTop: '0px', marginBottom: '0px' }}>
                        <div className={`section-title flex-wrapper-row align-items justify-content `} style={{ marginTop: '20px', gap: '1vw', alignItems: "center", padding: '0px 20px' }} >
                            <img src="../../assets/images/Levels map.png" />
                            <div style={{ flexGrow: '1' }}>{t("homeScreen.levelsMap")} </div>

                            <Link href="/levelmap">
                                <div className="save" style={{ marginTop: '0px' }}>
                                    {t("homeScreen.openlevelsMap")}

                                </div>

                            </Link>
                        </div >
                        <div className="map-block">

                            <Map userId={userId}></Map>

                        </div>
                    </div>


                    {/* <img src="../../assets/images/3.png" style={{ marginBottom: '20px', borderRadius: '20px', }}></img> */}

                    {/* <img src="../../assets/images/5.png" style={{ marginBottom: '20px', borderRadius: '20px' }}></img> */}


                </div>
            </div>
        </div >
    )
}

Profile.layout = "In";

export default Profile;