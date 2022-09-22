import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import CustomButton from '../../components//CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import Layout from '../../components/layouts/Layout'
import withAuth from '../../src/utils/withAuth'
import { validEmail } from '../../src/utils/functions'
import { sendForgetPasswordEmail } from '../../src/utils/apis'
import { useDispatch } from 'react-redux'
import router from 'next/router'

const ForgetPassword = () => {
    const { t, i18n } = useTranslation([], { useSuspense: false });

    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [sending, setSending] = useState(null)
    const [emailSent, setEmailSent] = useState(false)
    const dispatch = useDispatch()
    const onChange = (field, value) => {
        setEmail(value)
    }

    const onForget = async () => {
        // navigation.navigate('NewPassword', { email })
        setSending(true)
        setErrorMessage(null)
        let sendEmail = await sendForgetPasswordEmail(email)
        // console.log('sendEmail',sendEmail)

        if (sendEmail == 'success') {
            setSending(false)
            setEmailSent(true)
            dispatch({ type: 'CHANGE_MESSAGE', message: "Email has been sent successfully" })
            router.replace("/login")

            // navigation.navigate('NewPassword', { email })

        } else if (sendEmail == 'failed') {
            setSending(false)
            setErrorMessage(t('forgetPassword.noUser'))
        } else if (sendEmail == 'cannot reset') {
            setSending(false)
            setErrorMessage(t('forgetPassword.typErrorMessage'))
        }
    }

    const handleKeyPress = (async (event) => {
        if (event.key === 'Enter') {
            console.log("enter")
            onForget()

        }
    })
    return (
        <div>
            <div className="pageWrapper forget-page">
                <div className="boxWrapper">

                    <div className="loginboxWrapper">

                        <div className="yellowText">{t('titles.forgetPassword')}</div>
                        <div className="text flex-text">
                            {/* <div className="text flex-text">Please enter your
                                <div className="textBlack"> Email </div>
                                to receieve a new password
                            </div> */}
                            <Trans className="text flex-text"
                                i18nKey='login.forgetPasswordMessage' // optional -> fallbacks to defaults if not provided
                                // optional defaultValue

                                components={{ bold: <strong />, }}
                            />
                        </div>
                        <div className="loginForm forget-form">

                            <CustomTextInput onKeyPressed={handleKeyPress} value={email} error={errorMessage != null} errorMessage={errorMessage} icon="mail" placeHolder={t('login.email')} name="email" onChange={onChange} />
                            <div className="btn-wrapper-login-width">

                                <CustomButton
                                    disabled={email == '' || !validEmail(email) || emailSent}
                                    onPress={onForget}
                                    text={t('bookComponent.done')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}


ForgetPassword.layout = "Out";

export default ForgetPassword;