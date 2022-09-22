import axios from 'axios'
import router from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Button, Confirm, Header, Icon, Modal } from 'semantic-ui-react'
import HappyWithHands from './Bees/HappyWithHands'
import CustomButton from './CustomButton'

export default function SubmitConfirm({ assignmentData, userId, assignmentId }) {
    const [open, setOpen] = React.useState(false)
    const [submitted, setSubmit] = React.useState(false)

    const { t, i18n } = useTranslation([], { useSuspense: false })
    const dispatch = useDispatch()
    const language = i18n.language

    useEffect(async () => {

        return () => {
        }
    }, [submitted])
    const submitAssignment = () => {
        console.log("tttt")

        const formData = new FormData();
        formData.append('uid', userId);
        formData.append('assignmentId', assignmentId);

        axios.post('https://school.kutubee.com:4000/assignment/user/mark', formData)
            .then(res => {
                if (res.data.message == 'success') {

                    setSubmit(true)



                }

            })
    }

    const goBack = () => {
        router.back();

    }
    return (
        <Modal

            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='tiny'
            trigger={<div
                className="btn-link-solid" buttonStyle={{
                    marginTop: '20px',
                    width: '100%'
                }}


            >
                {t('settings.submit')}
            </div>
            }
        >

            <Modal.Content>

                {!submitted ?
                    <div className="flex-wrapper-col flex-center align-center">
                        <div className="section-title" style={{ textAlign: 'center' }}>
                            {t("assignments.confirmSubmit")}
                        </div>
                        <div style={{ width: '55%', marginTop: '25px' }} >

                            <CustomButton
                                text={t("assignments.yesSubmit")}

                                onPress={() => {
                                    if (!assignmentData.read) {
                                        submitAssignment()
                                    }
                                }}

                            />
                        </div>
                        <div className="whitebtn" style={{ width: '55%', marginTop: '25px' }} >

                            <CustomButton onPress={() => setOpen(false)}
                                text={t("assignments.cancel")}


                            />
                        </div>

                    </div>
                    :

                    <div style={{ justifyContent: 'center', alignItems: 'center', marginTop: '6vw' }} className="flex-wrapper-col">
                        <HappyWithHands width={125} height={133}></HappyWithHands>
                        <div style={{ textAlign: 'center', marginTop: "10px" }} className="section-title"> {t('assignments.assignmentSuccess')}</div>
                        <div style={{ width: '55%', marginTop: '20px', marginBottom: '15px' }} >

                            <CustomButton
                                buttonStyle={{
                                    marginTop: '20px',
                                    width: '100%'
                                }}
                                onPress={goBack}
                                text={t('assignments.backToAssignments')}
                            />
                        </div>

                    </div>
                }

            </Modal.Content>

        </Modal>
    )
}
