import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { getBookHighlights } from '../../src/utils/functions'

const Notes = ({ book, language }) => {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [highlights, setHighlights] = useState([])

    const onDelete = () => {

    }
    return (
        <div className={language == 'ar' ? 'rtlDir' : 'ltrDir'} style={{
            width: '80%',
            margin: '0 auto'
        }}>
            <div className="sectionTitle" style={{ marginTop: 30 }}>{book.mainNote != '' && book.mainNote != undefined && book.mainNote.text != undefined ? 1 : 0} {t('bookComponent.note', { lng: language })}</div>
            {book.mainNote != '' && book.mainNote != undefined && book.mainNote.text != undefined &&
                <div className='boxWrapper'>
                    <div className="sectionBoxTitle" >{t('bookComponent.date', { locale: language })}</div>
                    <div className="sectionBoxValue" >{book.mainNote.saveDate}</div>

                    <div className="sectionTitle" >{book.mainNote.text}</div>
                </div>
            }
        </div>
    )
}

export default Notes
