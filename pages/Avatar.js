import React from 'react'
import router, { useRouter } from 'next/router';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import CustomButton from '../components/CustomButton'

const Avatar = () => {
    const { t, i18n } = useTranslation([], { useSuspense: false });

    return (
        <div>
            <div className="pageWrapper">
                <div className="loginboxWrapper avatar" style={{ padding: '0px' }}>
                    <div className="section-title">{t("settings.Avatar")}
                    </div>
                    <div className="text flex-text">
                        <Trans className="text flex-text"
                            i18nKey='settings.avatartext' // optional -> fallbacks to defaults if not provided
                            // optional defaultValue

                            components={{ bold: <strong />, }}
                        />
                    </div>
                    <div className="loginbox-btns" style={{ justifyContent: "flex-start", height: "18vw" }}>

                    <div className="loginboxButton" style={{ width: "18%" }}
                            onClick={() => {
                                router.push('/AvatarScreens/HumanAvatar')
                            }}
                        >
                            <div className="bg-contain login-avatar-bg" style={{ backgroundImage: `url(../../assets/images/avatar.png)` }}></div>
                            <div className="loginboxButtonText">{t("login.human")}</div>
                        </div>

                        <div
                            className="loginboxButton" style={{ width: "18%" }}
                            onClick={() => {
                                router.push('/AvatarScreens/MonsterAvatar')
                            }}
                        >
                            <div className="bg-contain login-avatar-bg" style={{ backgroundImage: `url(../../assets/images/avatar-monster.png)` }}> </div>


                            <div className="loginboxButtonText">{t("login.monster")}</div>


                        </div>

                        <div className="loginboxButton" style={{ width: "18%" ,position:'relative'}}
                            // onClick={() => {
                            //     router.push('/AvatarScreens/RobotAvatar')
                            // }}
                        >
                            <div className="bg-contain login-avatar-bg" style={{ backgroundImage: `url(../../assets/images/avatar-robot.png)`,filter:'blur(6px)'}}></div>
                            <div className="loginboxButtonText" style={{filter:'blur(6px)'}}>{t("login.robot")}</div>
                            <div className="soon"
                            style={{

                                position: 'absolute',
                                top: 0,
                                right: 0,
                                background: "#f1c100",
                                padding: '7px',
                                width:'60px',
                                textAlign:'center',
                                borderBottomLeftRadius: '15px',
                                borderTopRightRadius: '15px',
                                color: '#fff',
                                fontFamily:'FFHekaya-Light', 
                                fontSize:'22px'

                            }}
                            > Soon</div>
                        </div>

                       
                    </div>
                </div>
            </div>
        </div>

    )
}


Avatar.layout = "In";

export default Avatar;
