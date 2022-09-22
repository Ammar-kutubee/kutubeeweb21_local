import React, { useEffect, useState } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { loginGoogleClassroom, socialLogin } from '../../src/utils/apis';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export default function LoginBy({ onLoginPressed, type }) {
    const [loginError, setLoginError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [logging, setLogging] = useState(false)
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const router = useRouter()

    useEffect(async () => {




    }, [errorMessage])
    const onFailure = async (response) => {
        console.log('ertrrrrrrr', response)
    }

    const responseGoogle = async (response) => {

        setErrorMessage(null)
        setLoginError(false)
        setLogging(true)
        const id = response.googleId
        const type = "google"

        console.log("gid", id)
        let loginSocialData = await socialLogin(id, type, dispatch)
        console.log("loginSocialData", loginSocialData)

        setLogging(false)
        if (loginSocialData == 'no subscription') {

            setErrorMessage(t('login.youDontHaveAccount'))
            setLoginError(true)
        }
        if (loginSocialData == 'failed') {
            setErrorMessage(t('login.incorrect'))
            setLoginError(true)
        } else if (loginSocialData == 'success') {
            router.replace('/home/level')
        }
    }

    const responseClassroom = async (response) => {

        setErrorMessage(null)
        setLoginError(false)
        setLogging(true)
        const id = response.googleId
        const type = "google"
        const email = response.profileObj.email

        console.log("gid", id)
        onGoogleClassroomLogin(id, type, email)

    }
    const responseFacebook = async (response) => {
        setErrorMessage(null)
        setLoginError(false)
        setLogging(true)
        const id = response.id
        const type = "facebook"
        let loginSocialData = await socialLogin(id, type, dispatch)
        setLogging(false)
        if (loginSocialData == 'failed') {
            setErrorMessage(t('login.incorrect'))
            setLoginError(true)
        } else if (loginSocialData == 'success') {
            router.replace('/home/level')
        }
    }

    const onGoogleClassroomLogin = async (id, type, email) => {
        let classRoom = await loginGoogleClassroom(id, type, email, dispatch)

        setLogging(false)
        if (classRoom == 'failed') {
            setErrorMessage(t('login.incorrect'))
            setLoginError(true)
        } else if (classRoom == 'success') {
            router.replace('/home/level')
        }
    }
    return (

        <>
            <div className="errormsg"> {errorMessage}</div>

            {type == 'schools' ?

                <div className="loginByWrapper">
                    <div className="loginByButton" onClick={() => onLoginPressed('microsoft-teams')}>
                        <div style={{ flexGrow: 1 }}>

                            <div className="bg-contain login-type-bg" style={{ backgroundImage: `url(../../assets/images/microsoft-teams.png)` }}></div>

                        </div>
                        <div className="loginByText">Microsoft teams</div>
                    </div>
                    <div className="loginByButton" >

                        <div style={{ flexGrow: 1 }}>
                            {/* <div className="bg-contain login-type-bg" style={{ backgroundImage: `url(../../assets/images/classroom.png)` }}></div> */}
                            <GoogleLogin
                                clientId="1075722042432-buhua77mc84k8gpgp66kvtqpaqpojpp3.apps.googleusercontent.com"
                                render={renderProps => (
                                    <div onClick={renderProps.onClick} className="bg-contain login-type-bg" style={{ backgroundImage: `url(../../assets/images/google.png)` }}></div>
                                )}
                                // buttonText="Login"
                                autoLoad={false}
                                onSuccess={responseClassroom}
                                prompt="consent"
                                onFailure={onFailure}
                                scope={"email profile"}
                                cookiePolicy={'single_host_origin'}
                                fetchBasicProfile={true}

                            />
                        </div>
                        <div className="loginByText">Google </div>
                    </div>
                </div>
                :
                <div className="loginByWrapper">

                    <div className="loginByButton" >
                        <div style={{ flexGrow: 1 }}>
                            {/* <div className="bg-contain login-type-bg" style={{ backgroundImage: `url(../../assets/images/google.png)` }}></div> */}
                            <GoogleLogin
                                clientId="1075722042432-buhua77mc84k8gpgp66kvtqpaqpojpp3.apps.googleusercontent.com"
                                render={renderProps => (
                                    <div onClick={renderProps.onClick} className="bg-contain login-type-bg" style={{ backgroundImage: `url(../../assets/images/google.png)` }}></div>
                                )}
                                autoLoad={false}

                                scope={"email profile"}
                                onSuccess={responseGoogle}
                                onFailure={onFailure}
                                prompt="consent"
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                        <div className="loginByText">Google</div>
                    </div>


                    <div className="loginByButton" onClick={() => onLoginPressed('facebook')}>
                        <div style={{ flexGrow: 1 }}>
                            <FacebookLogin
                                appId="234849314626017"
                                autoLoad={false}
                                fields="name,email"
                                // onClick={componentClicked}
                                callback={responseFacebook}
                                render={renderProps => (

                                    <div onClick={renderProps.onClick} className="bg-contain login-type-bg" style={{ backgroundImage: `url(../../assets/images/facebook.png)` }}></div>
                                )}
                            />

                            {/* <div className="bg-contain login-type-bg" style={{ backgroundImage: `url(../../assets/images/facebook.png)` }}></div> */}

                        </div>
                        <div className="loginByText">Facebook</div>


                    </div>
                </div>
            }
        </>
    )
}
