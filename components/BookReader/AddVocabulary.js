import React, { useEffect, useRef, useState } from 'react'
import { Button, Checkbox, Form, Icon, Image, Modal, TextArea } from 'semantic-ui-react'
import CustomButton from '../../components/CustomButton'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import CustomTextInput from '../CustomTextInput';
export default function AddVocabulary({ onVocabulariesClose, currentSelectedText, language, onAddVocabulary, backOnSheet, open, addNewVocabularies }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [selectedWordType, setSelectedWordType] = useState(0)
    const [definition, setDefinition] = useState('')
    const [sentence, setSentence] = useState('')
    const onChange = (field, value) => {
        if (field == 'definition') {
            setDefinition(value)
        } else if (field == 'sentence') {
            setSentence(value)
        }

    }
    const wordTypes1 = [
        {
            _id: 0,
            title: 'Noun',
            titleAr: 'اسم',
            titleFr: 'Noun'
        },
        {
            _id: 1,
            title: 'Verb',
            titleAr: 'فعل',
            titleFr: 'Verb'
        },
        {
            _id: 2,
            title: 'Letter',
            titleAr: 'حرف',
            titleFr: 'Letter'
        },
    ]
    const wordTypes2 = [
        {
            _id: 0,
            title: 'اسم',
        },
        {
            _id: 1,
            title: 'فعل',
        },
        {
            _id: 2,
            title: 'حرف',
        },
    ]
    const wordTypes3 = [
        {
            _id: 0,
            title: 'Noun',
        },
        {
            _id: 1,
            title: 'Verb',
        },
        {
            _id: 2,
            title: 'Letter',
        },
    ]
    const onWordTypeChange = (item, { value }) => {
        console.log('vvvvvv', value)
        setSelectedWordType(value)
    }
    const wordTypes = () => {
        console.log('language')
        if (language == 'ar') {
            return wordTypes2.map((item, i) => (
                <Form.Field>
                    <Checkbox
                        radio
                        label={item.title}
                        name='checkboxRadioGroup'
                        value={item._id}
                        checked={selectedWordType == item._id}
                        onChange={onWordTypeChange}
                    />
                </Form.Field>
            ));
        } else if (language == 'en') {
            return wordTypes1.map((item, i) => (
                <Form.Field>
                    <Checkbox
                        radio
                        label={item.title}
                        name='checkboxRadioGroup'
                        value={item._id}
                        checked={selectedWordType == item._id}
                        onChange={onWordTypeChange}
                    />
                </Form.Field>
            ));
        } else if (language == 'fr') {
            return wordTypes3.map((item, i) => (
                <Form.Field>
                    <Checkbox
                        radio
                        label={item.title}
                        name='checkboxRadioGroup'
                        value={item._id}
                        checked={selectedWordType == item._id}
                        onChange={onWordTypeChange}
                    />
                </Form.Field>
            ));
        }
    }
    const cleanData = ()=>{
        setDefinition('')
        setSentence('')
    }
    return (
        <Modal className={` addVocabulary ${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}
            open={open}
            size="tiny"
            onClose={() => {
                onVocabulariesClose()
                setTimeout(() => {
                    cleanData()
                }, 500);
            }}
            onOpen={() => {

            }}
        >
            <Modal.Header> 
                <div className={'sectionTitle'}>{i18n.t('bookComponent.vocabulary', { lng: language })}</div>

                <Modal.Actions>
                    <Button class="ui icon button" onClick={() => {
                        onVocabulariesClose()
                    }} primary>
                        <i class="bluek large icon icon-close"></i>
                    </Button>
                </Modal.Actions>
            </Modal.Header>

            <Modal.Content>
                
                <div className={'vocabularyText'}>{currentSelectedText}</div>
                <div className={'textInputTitle'} style={{marginTop:'40px'}}>{i18n.t('bookComponent.wordType', { lng: language })}</div>
                <div className="word-types">
                    {wordTypes()}
                </div>
                

                {/* <CheckBoxes
                    titleStyle={{ ...styles.textInputTitle, ...checkIfTextArabic(i18n.t('bookComponent.wordType', { locale: language })) ? globalStyles.arabicText : {} }}
                    containerStyle={{ marginTop: mScale(15) }}
                    items={language == 'ar' ? wordTypes2 : language == 'en' ? wordTypes1 : wordTypes3}
                    selectedItem={selectedWordType}
                    radio
                    title={i18n.t('bookComponent.wordType', { locale: language })}
                    onItemPressed={onWordTypePressed}
                    currentLanguage={language}
                /> */}
                <div className={'textInputTitle'} style={{marginTop:'40px'}}>{i18n.t('bookComponent.definition', { lng: language })}</div>
                <CustomTextInput value={definition} placeHolder={t('bookComponent.typeHere', { lng: language })} name="definition" onChange={onChange} />
                <div className={'textInputTitle'}>{i18n.t('bookComponent.sentence', { lng: language })}</div>
                <CustomTextInput value={sentence} placeHolder={t('bookComponent.typeHere', { lng: language })} name="sentence" onChange={onChange} />
                <Modal.Actions>
                    <CustomButton onPress={()=>{
                        onAddVocabulary(selectedWordType, definition, sentence, currentSelectedText)
                    }} 
                    text={t('bookComponent.done', { lng: language })} />
                </Modal.Actions>
            </Modal.Content>
        </Modal>
    )
}