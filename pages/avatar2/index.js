import Layout from '../../components/layouts/Layout'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../components/CustomButton'
import withAuth from '../../src/utils/withAuth'
import { Trans } from 'react-i18next'

const Avatar = () => {


    const onNext = () => {
        // navigation.navigate('InterestsStep')
    }
    return (
        <div>
            <div className="pageWrapper">
                <div className="boxWrapper">
                    <div className="loginboxWrapper avatar">
                        <div className="yellowText">Step 1
                        </div>
                        {/* <div className="flex-wrapper-row text">Please Choose your
                            <div className="textBlack"> Avatar </div>
                        </div> */}
                        <Trans className="text flex-text"
                            i18nKey='settings.avatartext' // optional -> fallbacks to defaults if not provided
                            // optional defaultValue

                            components={{ bold: <strong />, }}
                        />


                        <div className="loginbox-btns">

                            <div
                                className="loginboxButton"
                            // onClick={() => {
                            //     goToLogin('individual')
                            // }}
                            >
                                <div className="bg-contain login-avatar-bg" style={{ backgroundImage: `url(../../assets/images/avatar-monster.png)` }}> </div>


                                <div className="loginboxButtonText">Monster</div>


                            </div>



                            <div className="loginboxButton"


                            /* onClick={() => {
                                    // goToLogin('schools')
                                }} */
                            >

                                <div className="bg-contain login-avatar-bg" style={{ backgroundImage: `url(../../assets/images/avatar.png)` }}></div>

                                <div className="loginboxButtonText">Human</div>

                            </div>


                        </div>
                        
                        <div className="loginboxButton">

<div className="bg-contain login-avatar-bg" style={{ backgroundImage: `url(../../assets/images/avatar-robot.png)` }}></div>

<div className="loginboxButtonText">Robot</div>

</div>
                        <div style={{ paddingRight: '4vw', paddingLeft: '4vw' }} className="btn-wrapper-login-width">

                            <CustomButton
                                //   disabled={selectedAvatar == null}
                                onPress={onNext}
                                text={'Done'}
                                buttonStyle={"margin-btn"} />
                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}



Avatar.layout = "Out";

export default Avatar;