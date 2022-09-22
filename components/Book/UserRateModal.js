import React, { useEffect, useRef, useState } from 'react'
import { Button, Icon, Image, Modal, Rating } from 'semantic-ui-react'
import CustomButton from '../../components/CustomButton'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { addBookRate } from '../../src/utils/apis';

export default function UserRateModal({ userId, bookId, language, onSendRating, currentRating }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [open, setOpen] = React.useState(false)
    const [rating, setRating] = React.useState(0)
    const dispatch = useDispatch()
    const lan = i18n.language

    const onRating = async () => {

         if (rating > 0)
         {
            let rate = await addBookRate(bookId, userId, rating)

            onSendRating(rate)
            setOpen(false)
            if (lan == "ar") {
                dispatch({ type: 'CHANGE_MESSAGE', message: "تم التقييم بنجاح" })
            }
            else dispatch({ type: 'CHANGE_MESSAGE', message: "Rating added Successfully" })
         }
         else 
         {
            setOpen(false)
            if (lan == "ar") {
                dispatch({ type: 'CHANGE_MESSAGE', message: "يجب عليك تعبئة التقييم قبل إرساله " })
            }
            else dispatch({ type: 'CHANGE_MESSAGE', message: "Please fill the stars before submitting the Rate"})
       
    }
    }
    const handleRate = (e, { rating, maxRating }) => {

        // this.setState({ rating, maxRating })
        setRating(rating)
        console.log("hr", rating,)
    }
    return (
        <div style={{

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Modal className={` levelmodal addrate ${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}
                open={open}
                size="tiny"
                mountNode={document.querySelector('.themewrapper')}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                trigger={currentRating?.rate_value ? <div className={`addRateText ${language == 'ar' ? 'arabicText' : ''}`}>{t('bookScreen.editRating', { lng: language })}</div> : <div className={`addRateText ${language == 'ar' ? 'arabicText' : ''}`}>{t('bookScreen.addRating', { lng: language })}</div>}
            >
                <Modal.Header> <div className={`sectionTitle ${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}>
                    {t('bookScreen.youRating', { lng: language })}

                </div>
                    <Modal.Actions >
                        <Button class="ui icon button" onClick={() => setOpen(false)} primary>
                            <i class="bluek large close icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal.Header>

                <Modal.Content scrolling>

                    <Modal.Description className={`${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}>
                        <Rating onRate={handleRate} maxRating={5} defaultRating={currentRating?.rate_value ? currentRating?.rate_value : 0} icon='star' size='massive' />

                        <CustomButton onPress={onRating} text={t('bookComponent.done', { lng: language })} />
                    </Modal.Description>
                </Modal.Content>

            </Modal>

        </div >
    )
}
