import Layout from '../../components/layouts/Layout'
import CustomTextInput from '../../components/CustomTextInput/'
import CustomButton from '../../components/CustomButton/'
import LoginBy from './LoginBy'
import { useRouter } from 'next/router'
import { normalLogin } from '../../src/utils/apis'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import FacebookLogin from 'react-facebook-login';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavBooksIds } from '../../src/utils/apis'
import withAuth from '../../src/utils/withAuth'

const Login = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation([], { useSuspense: false });

    const type = router.query.type
    const [loginData, setLoginData] = useState({ username: '', password: '' })
    const [loginError, setLoginError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [logging, setLogging] = useState(false)
    const state = useSelector(state => state.mainReducer)
    const onChange = (field, value) => {

        let data = loginData
        data[field] = value
        setLoginData({ ...data })
    }
    const onFocus = (e) => {
        console.log("onFocus");
    }
    const onBlur = (e) => {
        console.log("onBlur");
    }
    const onForget = () => {
        router.push('/ForgetPassword')
    }
    const onLogin = async () => {
        setErrorMessage(null)
        setLoginError(false)
        setLogging(true)
        let userLogin = await normalLogin(loginData.username, loginData.password, dispatch)
        setLogging(false)
        if (userLogin == 'failed') {
            setErrorMessage(t('login.incorrect'))
            setLoginError(true)
        } else if (userLogin.status == 'success') {
            if (userLogin.type == "teacher") {

                router.replace('home/openLibrary')

            }
            else {
                if (userLogin.avatarExists) {
                    router.replace('/home/level')
                } else {
                    router.replace('/home/level')

                }


            }


        }

    }
    const onSignup = () => {
        // navigation.navigate('SignUp')
        console.log("sign up")

    }

    const onLoginPressed = async (type) => {
        // console.log('type1111', type)
        // if (type == 'google-classroom') {
        //     await GoogleSignin.signOut();
        //     const userInfo = await GoogleSignin.signIn();
        //     const tokens = await GoogleSignin.getTokens();
        //     console.log('userInfo', userInfo, tokens)
        // }
        console.log("login pressed")

    }

    const handleKeyPress = (async (event) => {
        if (event.key === 'Enter') {
            console.log("enter")
            onLogin()

        }
    })
    return (
        <div>
            <div className="pageWrapper">
                <div className="boxWrapper">
                    <div className="loginboxWrapper">
                        <div className="yellowText">{t("titles.login")}</div>
                        <div className="text"> {t('login.loginScreenText')}</div>

                        <div className="loginForm">
                            {/* <CustomTextInput name="username" isPassword hidden /> */}
                            {/* <CustomTextInput name="password" isPassword hidden /> */}
                            <CustomTextInput language={i18n.language} onBlur={onBlur} onFocus={onFocus} onKeyPressed={handleKeyPress} autoCapitalize={'none'} value={loginData.username} error={loginError} errorMessage={errorMessage} wrapperStyle={{ marginBottom: '40px' }} field icon="user" name="username" placeHolder={t("login.username")} onChange={onChange} />

                            <CustomTextInput language={i18n.language} onBlur={onBlur} onFocus={onFocus} onKeyPressed={handleKeyPress} value={loginData.password} error={loginError} icon="password" placeHolder={t("login.password")} name="password" isPassword onChange={onChange} />
                            <div
                                onClick={onForget}
                            >
                                <div className="forgetPassword">{t("login.forgetPassword")}</div>
                            </div>
                            <div className="btn-wrapper-login-width">
                                <CustomButton
                                    loading={logging}
                                    disabled={loginData.username == "" || loginData.password == ""}
                                    onPress={onLogin}
                                    text={t("titles.login")}
                                    buttonStyle={"margin-btn"} />
                            </div>
                            <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                                {/* <div className="orLine" /> */}
                                <div className="or">{t("login.or")}</div>
                            </div>
                            <LoginBy onLoginPressed={onLoginPressed} type={type} />
                            {type == 'individual' ?
                                <div> </div>
                                // <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '45px' }}>
                                //     <div className="greyText">{t("login.haveAccount")}</div>
                                //     <div onPress={onSignup}>
                                //         <div className="blueText"> {t("login.signUp")}</div>
                                //     </div>
                                // </div>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


Login.layout = "Out";

export default Login;