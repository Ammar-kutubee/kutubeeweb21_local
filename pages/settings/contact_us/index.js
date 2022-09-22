import React, { useState } from 'react'
import BeeWithKutubee from '../../../components/Bees/BeeWithKutubee'
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';

const ContactUs = () => {
    const { t, i18n } = useTranslation([], { useSuspense: false })

    return (
        <div>
            <div className="pageWrapper">
                <div className="loginboxWrapper avatar" style={{ padding: '0px' }}>
                    <div className="section-title">{t("settings.contact")}
                    </div>
                    <div className="text flex-text">

                    </div>
                    <div className="loginbox-btns" style={{ justifyContent: "flex-start", height: "18vw" }}>

                        <div className="loginboxButton" style={{ width: "18%" }}
                            onClick={() => {
                                window.open('https://www.facebook.com/kutubeeapp')

                            }}
                        >
                            <div className="bg-contain login-avatar-bg" style={{ backgroundImage: `url(../../assets/images/FB.png)`, width: '65px' }}></div>
                            <div className="loginboxButtonText">Kutubeeapp</div>
                        </div>

                        <div
                            className="loginboxButton" style={{ width: "18%" }}
                            onClick={() => {
                                window.open('https://www.instagram.com/kutubeeapp/')


                            }}
                        >
                            <div className="bg-contain login-avatar-bg" style={{ backgroundImage: `url(../../assets/images/instagram.png)`, width: '65px' }}> </div>


                            <div className="loginboxButtonText">Kutubeeapp</div>


                        </div>

                        <div
                            className="loginboxButton" style={{ width: "18%" }}
                            onClick={() => {
                                window.open('mailto:info@kutubee.com?subject=Subject&body=message%20goes%20here')


                            }}
                        >
                            <div className="bg-contain login-avatar-bg" style={{ backgroundImage: `url(../../assets/images/email.png)`, width: '65px' }}> </div>


                            <div className="loginboxButtonText">info@kutubee.com</div>


                        </div>
                        <div
                            className="loginboxButton" style={{ width: "18%" }}
                            onClick={() => {
                                window.open('https://kutubee.com/')


                            }}
                        >
                            <div className="bg-contain login-avatar-bg" style={{ backgroundImage: `url(../../assets/images/web.png)`, width: '65px' }}> </div>


                            <div className="loginboxButtonText">www.kutubee.com</div>


                        </div>


                    </div>
                </div>
            </div>
        </div>

    )

}

ContactUs.layout = "In";

export default ContactUs;