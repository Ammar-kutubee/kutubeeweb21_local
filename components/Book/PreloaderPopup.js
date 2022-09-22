import axios from 'axios'
import router from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Button, Confirm, Header, Icon, Modal } from 'semantic-ui-react'
import CustomButton from '../../components/CustomButton'

export default function PreloaderPopup({ setOpen, open,currentLanguage }) {
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
                    <div className="section-title" style={{ textAlign: 'center',marginTop:0 }}>
                      {t('bookComponent.recordingWait', { lng: currentLanguage })}
                        {/* الرجاء الإنتظار لتحميل التسجيل الصوتي */}
                    </div>
                    <div>
                    <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      margin: "auto",
      background: "#fff",
      display: "block",
      shapeRendering: "auto",
    }}
    width={50}
    height={50}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx={50}
      cy={50}
      fill="none"
      stroke="#6AC3DB"
      strokeWidth={10}
      r={35}
      strokeDasharray="164.93361431346415 56.97787143782138"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="0.5s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      />
    </circle>
  </svg>
                    </div>
                 
                    

                </div>

            </Modal.Content>

        </Modal>
    )
}
