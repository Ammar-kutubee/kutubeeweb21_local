import React, { useEffect, useRef, useState } from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { getFriendProfile } from '../../src/utils/apis';
import CloseBt from './../../components/svgs/Close';

export default function StudentProfileModal({ language, uid, setOpen, open }) {


    const { t, i18n } = useTranslation([], { useSuspense: false });
    // const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile] = useState(true)

    const levelTitle = {
        "ar":"المستوى",
        "en":"Level",
        "fr":"Level"
    }

    const sectionTitle = {
        "ar":"الصف",
        "en":"Grade",
        "fr":"Grade"
    }

    console.log("uid", uid)
    useEffect(async () => {
        setUserProfile([])
        setLoading(true)
        let profile = await getFriendProfile(uid)

        // let profile = [
        //     {
        //         "_id": "user_34",
        //         "avatarlink": "../assets/images/bee.png",
        //         "lname": "Almousa",
        //         "fname": "Nardine",
        //         "grade": "One B",
        //         "schoollogo": "../assets/images/bee.png",
        //         "schoolname": "Kutubee School",
        //         "completedbooks": "25",
        //         "totalreadingtime": "130",
        //         "totalpoints": "140",
        //         "completedassignment": "130",
        //         "lastBadge": "../assets/images/bee.png"
        //     }

        // ]
        setUserProfile(profile)
        setLoading(false)

        return () => {

        }
    }, [uid])
    return (

        <div style={{

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Modal className={` profileModal ${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}
                open={open}
                mountNode={document.querySelector('.themewrapper')}
                // size="fullscreen"
                centered={true}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            // trigger={<div className={`blueText ${language == 'ar' ? 'arabicText' : ''}`}>My profile</div>}
            >
                <Modal.Header>
                    <Modal.Actions >
                        {/* <Button class="ui icon button" onClick={() => setOpen(false)} primary>
                            <i class="bluek large close icon"></i>
                        </Button> */}
                        <div style={{cursor:"pointer"}} onClick={() => setOpen(false)}>
                            <CloseBt width={19} height={19} viewBox="0 0 19 19" />
                        </div>
                    </Modal.Actions>
                </Modal.Header>

                <Modal.Content >

                    <Modal.Description className={`${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}>
                        {!loading &&
                            <div className="profile flex-wrapper-row">
                                <div className="flex-wrapper-col avatarsvg" style={{ flexGrow: '0.5' }}>
                                    <div className="flex-wrapper-row" style={{ position: "relative" }} >
                                        {userProfile.lastBadge &&
                                            <img className="lastbadgeimg lastbadgeimgPopup" src={userProfile.lastBadge} alt="Avatar Image"
                                                style={{
                                                    width: '30%',
                                                    position: 'absolute',
                                                    left: '22%',
                                                    top: '0vh !important',
                                                    zIndex: '1000',


                                                }}
                                            />
                                        }
                                        {/* <svg
                                            width='60%' viewBox="0 0 282.58 435.01">
                                            <path
                                                d="M271.09 169.64c-2.05-33.98-9.36-69.8-25.99-100.49-11.18-20.39-28.04-37.16-47.98-48.9-.25-.27-.52-.28-.77-.55C176.68 7.98 154.69 1.83 132.62.4c-22.05-1.67-44.76 1.84-66 10.92-.29.23-.56.21-.84.44-21.5 9.07-40.69 23.26-54.83 42.26C7.01 59.32 3.37 64.83 0 70.51v319.48c1.01 1.02 2.02 2.04 3.07 3.04 1.77 1.61 3.29 2.95 5.07 4.56 24.64 21.25 56.62 34.77 90.53 36.96l.27.02.54.04.27.02.27.02c.27.02.27.02.54.03l.27.02c33.91 2.19 67.58-6.84 95.18-24.97 1.98-1.12 3.97-2.48 5.7-3.86 32.6-23.53 49.73-57.27 58.97-93.77 1.12-4.16 1.96-8.09 2.81-12.26.29-.23.32-.73.36-1.22.85-4.18 1.69-8.1 2.28-12.3l.04-.49c.57-3.95 1.11-7.65 1.68-11.59.04-.49.09-1.24.13-1.73.3-3.96.85-7.66 1.14-11.63.06-.74.11-1.49.17-2.23l.8-10.65.06-.74c2.2-26.02 2.56-52.38.94-77.62z"
                                                fill="#e7f4f8"
                                            />
                                            <path
                                                d="M247.25 174.51c-4.17-30.8-13.24-62.96-30.4-89.91-11.52-17.89-27.95-32.16-46.83-41.67-.24-.23-.49-.23-.74-.45-18.63-9.51-38.98-13.81-59.09-13.81-20.11-.23-40.46 4.3-59.09 13.81-.25.23-.49.23-.74.45-18.87 9.52-35.3 23.56-46.82 41.68-1.23 1.92-2.4 3.87-3.54 5.84v282.44c5.52 7.44 11.96 14.36 19.47 20.61 1.72 1.36 3.19 2.49 4.9 3.85 23.78 17.89 53.7 28.31 84.59 28.31h1.95c30.89 0 60.81-10.19 84.59-28.31 1.72-1.13 3.43-2.49 4.9-3.85 27.95-23.33 41.19-55.03 47.08-88.77.74-3.85 1.23-7.47 1.72-11.32.24-.23.24-.68.24-1.13.49-3.85.98-7.47 1.23-11.32v-.45c.24-3.62.49-7.02.74-10.64v-1.59c0-3.62.24-7.02.24-10.64v-2.04-9.74-.68c.26-23.79-1.21-47.79-4.4-70.67z"
                                                fill="#fff"
                                            />

                                        </svg> */}
                                        <svg width="60%" viewBox="0 0 462 637" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M458.299 363.092C457.918 368.168 457.51 373.607 457.128 378.683C457.047 379.771 456.965 380.859 456.883 381.947C456.448 387.748 455.645 393.162 455.21 398.964C455.155 399.689 455.073 400.777 455.019 401.502C454.189 407.278 453.387 412.692 452.557 418.468C452.53 418.83 452.503 419.193 452.503 419.193C451.646 425.332 450.422 431.082 449.171 437.196C449.117 437.921 449.062 438.646 448.641 438.983C447.39 445.097 446.167 450.847 444.522 456.935C431.009 510.352 405.923 559.743 358.206 594.192C355.679 596.215 352.758 598.213 349.864 599.848C309.471 626.389 260.182 639.604 210.542 636.4L210.148 636.374C209.754 636.349 209.754 636.349 209.36 636.323C209.36 636.323 209.36 636.323 208.966 636.298C208.966 636.298 208.966 636.298 208.572 636.273C208.178 636.247 208.178 636.247 207.784 636.222L207.39 636.196C157.751 632.992 110.94 613.21 74.8762 582.099C72.2818 579.745 70.0541 577.779 67.4598 575.426C26.0859 535.955 8.62401 483.818 3.22615 429.18C2.50717 422.94 2.15494 417.088 1.82993 410.873C1.88439 410.147 1.93885 409.422 1.57212 409.034C1.2471 402.819 0.894857 396.967 0.963807 390.777C0.991038 390.414 1.01827 390.052 1.01827 390.052C1.05999 384.225 1.07447 378.76 1.11619 372.933C1.17065 372.208 1.25234 371.12 1.3068 370.395C1.34852 364.568 1.75698 359.129 2.19266 353.328C2.27436 352.24 2.35604 351.152 2.43774 350.064C2.81896 344.988 3.22742 339.549 3.60864 334.472C3.6631 333.747 3.69033 333.385 3.74479 332.659C6.21001 294.561 11.4602 256.278 19.3321 219.986C29.7328 171.105 48.1762 120.556 78.9942 79.1872C99.689 51.3743 127.773 30.5968 159.252 17.3256C159.673 16.9884 160.067 17.0139 160.488 16.6767C191.573 3.38015 224.817 -1.76132 257.095 0.686453C289.4 2.7716 321.582 11.7716 350.38 28.9333C350.746 29.3214 351.14 29.3467 351.507 29.7348C380.699 46.9219 405.379 71.4695 421.744 101.31C446.081 146.239 456.791 198.669 459.785 248.415C462.157 285.368 461.634 323.956 458.381 362.004C458.381 362.004 458.354 362.367 458.299 363.092Z" fill="#E6FAFC" />
                                            <path d="M431.351 359.98C431.351 364.621 431.351 369.594 431.351 374.235C431.351 375.229 431.351 376.224 431.351 377.218C431.351 382.522 430.992 387.495 430.992 392.799C430.992 393.462 430.992 394.456 430.992 395.119C430.634 400.423 430.275 405.396 429.916 410.7C429.916 411.031 429.916 411.363 429.916 411.363C429.557 416.998 428.839 422.302 428.121 427.938C428.121 428.601 428.121 429.264 427.762 429.595C427.044 435.231 426.327 440.535 425.25 446.17C416.636 495.564 397.255 541.974 356.339 576.118C354.186 578.107 351.673 580.096 349.161 581.754C314.347 608.274 270.56 623.191 225.338 623.191H224.979C224.62 623.191 224.62 623.191 224.261 623.191C224.261 623.191 224.261 623.191 223.902 623.191C223.902 623.191 223.902 623.191 223.543 623.191C223.184 623.191 223.184 623.191 222.825 623.191H222.466C177.244 623.191 133.457 607.942 98.6426 581.754C96.1303 579.765 93.9768 578.107 91.4644 576.118C51.2666 542.637 31.8856 496.227 23.2717 446.833C22.195 441.198 21.4772 435.894 20.7594 430.258C20.7594 429.595 20.7594 428.932 20.4005 428.601C19.6827 422.965 18.9648 417.661 18.6059 412.026C18.6059 411.694 18.6059 411.363 18.6059 411.363C18.247 406.059 17.8881 401.086 17.5292 395.782C17.5292 395.119 17.5292 394.125 17.5292 393.462C17.1703 388.158 17.1703 383.185 17.1703 377.881C17.1703 376.887 17.1703 375.892 17.1703 374.898C17.1703 370.257 17.1703 365.284 17.1703 360.643C17.1703 359.98 17.1703 359.649 17.1703 358.986C16.8114 324.178 18.9648 289.039 23.6307 255.557C29.7321 210.473 43.0117 163.4 68.1354 123.952C85.0041 97.4317 109.051 76.8787 136.687 62.9556C137.046 62.6241 137.405 62.6241 137.764 62.2927C165.041 48.3696 194.83 41.7396 224.261 42.0711C253.691 42.0711 283.481 48.3696 310.758 62.2927C311.117 62.6241 311.476 62.6241 311.835 62.9556C339.471 76.8787 363.517 97.7632 380.386 123.952C405.51 163.4 418.79 210.473 424.891 255.557C429.557 289.039 431.71 324.178 431.351 358.986C431.351 358.986 431.351 359.317 431.351 359.98Z" fill="white" />
                                        </svg>

                                        <div
                                        style={{
                                            position: "absolute",
                                            width: "60%",
                                            height: "100%",
                                            alignItems: "center",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                        >
                                            {userProfile.avatarlink ?
                                                <img src={userProfile.avatarlink} alt="Avatar Image"
                                                        style={{
                                                            padding: "1vw"
                                                        }}

                                                />
                                                :
                                                <img src={userProfile.avatarlink ? userProfile.avatarlink : '../assets/images/bee.png'} alt="Avatar Image"
                                                style={{
                                                    padding: "2vw"
                                                }}
                                                />
                                            }
                                        </div>
                                    </div>


                                </div>
                                <div className="flex-wrapper-col">
                                    <div className="flex-wrapper-col">
                                        <div className="section-title" style={{ marginBottom: '0px' }}> {userProfile.fname} {userProfile.lname} </div>
                                        <div className="section-title" style={{ marginTop: '10px', lineHeight: '2vw',display:"flex",alignItems:"center",justifyContent:"space-between" }}> 
                                        
                                            <div style={{display:"flex",alignItems:"center",gap:"15px"}}>
                                                {/* <div className='profile-report-text'>{sectionTitle[language]}</div> */}
                                                {/* <div>{userProfile.grade}</div> */}
                                            </div>

                                            {/* <div style={{display:"flex",alignItems:"center",gap:"15px"}}>

                                                <div className='profile-report-text'>{levelTitle[language]}</div>
                                                <div>
                                                    {language === "ar" && userProfile.userLevel}
                                                    {language === "en" && userProfile.userLevelEn}
                                                    {language === "fr" && userProfile.userLevelFr}
                                                </div>

                                            </div> */}

                                        </div>
                                        {/* <div className="section-title" style={{ marginTop: '10px', lineHeight: '2vw',display:"flex",alignItems:"center",gap:"15px" }}>
                                            <div className='profile-report-text'>{levelTitle[language]}</div>
                                            <div>
                                            {language === "ar" && userProfile.userLevel}
                                            {language === "en" && userProfile.userLevelEn}
                                            {language === "fr" && userProfile.userLevelFr}
                                            </div>
                                            

                                            </div> */}

                                        <div className="flex-wrapper-row align-center" style={{ gap: '0.8vw', flexGrow: '0.5', width: '100%', marginTop: '1.5vw' }} >
                                            <img src={userProfile.schoollogo} style={{ width: '70px', border: '1px solid #e5e5e5', borderRadius: '92px', padding: '10px' }} />
                                            <div className="flex-wrapper-col" style={{ gap: '0.5vw' }}>
                                                <div className="schoolname-profile">
                                                    {userProfile.schoolname}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-wrapper-row" style={{ width: '100%', flexWrap: "wrap", marginTop: "2vw" }}>
                                        <div className="report-item" style={{ width: '49%', marginBottom: '1vw' }}>
                                            <div className="profile-report-text" style={{ marginBottom: '0.5vw' }}>
                                                {t('totalPoints.completedBooks', { lng: language })}
                                            </div>
                                            <div className="flex-wrapper-row" style={{ gap: '5px' }}>

                                                <div className="yellowText" style={{ lineHeight: '1.5vw' }}>
                                                    {userProfile.completedbooks}
                                                </div>
                                                <div className="grey-text" style={{ lineHeight: '3.2vw' }}> {t("homeScreen.books", { lng: language })} </div>
                                            </div>

                                        </div>
                                        <div className="report-item" style={{ width: '49%', marginBottom: '1vw' }}>
                                            <div className="profile-report-text" style={{ marginBottom: '0.5vw' }}>

                                                {t('readingTime.readingTime', { lng: language })}
                                            </div>
                                            <div className="flex-wrapper-row" style={{ gap: '5px' }}>

                                                <div className="yellowText" style={{ lineHeight: '1.5vw' }}>

                                                    {userProfile.totalreadingtime}
                                                </div>

                                                {userProfile.totalreadingtimeUnit == "hour" ?
                                                    <div className="grey-text" style={{ lineHeight: '3.2vw' }}> {t("homeScreen.hours", { lng: language })} </div>
                                                    :
                                                    <div className="grey-text" style={{ lineHeight: '3.2vw' }}> {t("homeScreen.minutes", { lng: language })} </div>

                                                }

                                            </div>

                                        </div>
                                        <div className="report-item" style={{ width: '49%', marginBottom: '1vw' }}>
                                            <div className="profile-report-text" style={{ marginBottom: '0.5vw' }}>

                                                {t('totalPoints.points', { lng: language })}
                                            </div>
                                            <div className="flex-wrapper-row" style={{ gap: '5px' }}>

                                                <div className="yellowText" style={{ lineHeight: '1.5vw' }}>

                                                    {userProfile.totalpoints}
                                                </div>
                                                <div className="grey-text" style={{ lineHeight: '3.2vw' }}> {t("homeScreen.points", { lng: language })} </div>
                                            </div>
                                        </div>
                                        <div className="report-item" style={{ width: '49%', marginBottom: '1vw' }}>
                                            <div className="profile-report-text" style={{ marginBottom: '0.5vw' }}>

                                                {t('totalPoints.completedAssignments', { lng: language })}
                                            </div>
                                            <div className="flex-wrapper-row" style={{ gap: '5px' }}>
                                                <div className="yellowText" style={{ lineHeight: '1.5vw' }}>

                                                    {userProfile.completedassignment}
                                                </div>

                                                <div className="grey-text" style={{ lineHeight: '3.2vw' }}> {t("homeScreen.assignments", { lng: language })} </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </Modal.Description>
                </Modal.Content>

            </Modal>

        </div >
    )
}
