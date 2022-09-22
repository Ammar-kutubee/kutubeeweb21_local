import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { getBookHighlights } from '../../src/utils/functions'

const Highlights = ({ book, language }) => {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [highlights, setHighlights] = useState([])
    useEffect(() => {
        console.log('--------------------')
        let tmp = getBookHighlights(book)
        setHighlights(tmp)

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
            <div className="sectionTitle" style={{ marginTop: 30 }}>{highlights.length}  {t('bookComponent.highlights', { lng: language })}</div>
            {highlights.map(highlight => {
                return <div
                >
                    <div className='boxWrapper'>
                        <div className="sectionBoxTitle" >{t('bookComponent.date', { locale: language })}</div>
                        <div className="sectionBoxValue" >{highlight.sharedDate}</div>

                        <div className="sectionTitle" >{highlight.textString}</div>
                        <div className="sectionBoxTitle" >{t('bookComponent.page', { locale: language })}</div>
                        <div className="sectionBoxValue" >{highlight.page}</div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default Highlights
