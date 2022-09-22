import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { getBookVocabularies } from '../../src/utils/functions'

const VocabularyList = ({ book, language }) => {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [vocabularies, setVocabularies] = useState([])
    useEffect(() => {
        console.log('--------------------')
        let tmp = getBookVocabularies(book)
        console.log('tmptmptmp', tmp)
        setVocabularies(tmp)

        return () => {

        }
    }, [])
    const onDelete = () => {

    }
    return (
        <div className={language == 'ar' ? 'rtlDir' : 'ltrDir'} style={{
            width: '80%',
            margin: '0 auto'
        }}>
            <div className="sectionTitle" style={{ marginTop: 30 }}>{vocabularies.length}  {t('bookComponent.vocabulary', { lng: language })}</div>
            {vocabularies.map(vocabulary => {
                return <div
                >
                    <div className='boxWrapper'>
                        <div className="sectionBoxTitle" >{t('bookComponent.date', { lng: language })}</div>
                        <div className="sectionBoxValue" >{vocabulary.sharedDate}</div>

                        <div className="sectionTitle" >{vocabulary.vocabularyText}</div>
                        <div className="sectionBoxTitle" >{t('bookComponent.page', { lng: language })}</div>
                        <div className="sectionBoxValue" >{vocabulary.page}</div>
                        <div className="sectionBoxTitle" >{t('bookComponent.wordType', { lng: language })}</div>
                        <div className="sectionBoxValue" >{t(`bookComponent.${vocabulary.selectVocabularyType}`, { lng: language })}</div>
                        <div className="sectionBoxTitle" >{t('bookComponent.definition', { lng: language })}</div>
                        <div className="sectionBoxValue" >{vocabulary.definition}</div>
                        <div className="sectionBoxTitle" >{t('bookComponent.sentence', { lng: language })}</div>
                        <div className="sectionBoxValue" >{vocabulary.sentence}</div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default VocabularyList
