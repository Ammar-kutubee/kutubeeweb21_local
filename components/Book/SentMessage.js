import axios from 'axios'
import router from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Button, Confirm, Header, Icon, Modal } from 'semantic-ui-react'
import CustomButton from '../../components/CustomButton'

export default function SentMessage({ userId, sentMessage, sentType, setOpen, open, onConfirmationYes }) {
    const [submitted, setSubmit] = React.useState(false)

    const { t, i18n } = useTranslation([], { useSuspense: false })
    const dispatch = useDispatch()
    const language = i18n.language

    useEffect(async () => {

        return () => {
        }
    }, [submitted])
    const submitAssignment = () => {

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
        >
            <Modal.Content>
                <div className="flex-wrapper-col flex-center align-center">
                    <div style={{
                        height: 135,
                        width: 135,
                        borderRadius: 135,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ADDB31',
                        marginBottom: 35,
                        display:'flex',
                        marginTop:75
                    }}>
                        <div className="icon-check" style={{
                            fontSize: 65,
                            color: 'white'
                        }} />
                    </div>
                    <div className="section-title" style={{ textAlign: 'center' }}>
                        {sentMessage}
                    </div>

                </div>

            </Modal.Content>

        </Modal>
    )
}
