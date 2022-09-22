import React, { useState } from 'react'
// import i18n from '../../../i18n/i18n'
// import Icon from '../../../utils/customIcons'
// import { mScale } from '../../../utils/functions'
// import globalStyles from '../../../utils/globalStyles'
// import styles from '../styles'
// import BookProgress from './BookProgress'
// import MenuButton from './MenuButton'
import { motion } from "framer-motion"
import ReactSlider from 'react-slider'
import { useTranslation } from 'react-i18next'

export default function FontMenu({ fontMode, currentFontSize, onFontSizeChanged, onDecreaseFontSize, onIncreaseFontSize, currentLanguage, toggleFont }) {
    const changeFontSize = (e) => {
        onFontSizeChanged(e)
    }
    const { t, i18n } = useTranslation([], { useSuspense: false });

    return (
        <motion.div
            transition={{
                type: 'timing',
                duration: 0.3,
            }}
            className={`zoom-menu`}
            animate={{ y: fontMode ? 0 : '100%', opacity: fontMode ? 1 : 0, }}
        // onLayout={onLayout}
        >
            <svg width="17" height="18" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onIncreaseFontSize}>
                <path d="M6.86881 21.6228H18.9374L21.3768 28.0422H25.849L14.9145 0.224609H10.9345L0 28.0422H4.47221L6.86881 21.6228Z" fill="#4D4D4F" />
                <path d="M12.927 5.52637L17.3564 17.3381H8.49756L12.927 5.52637Z" fill="white" />
            </svg>

            <ReactSlider
                className="horizontal-slider"
                marks
                markClassName="slider-mark"
                min={0}
                invert
                max={4}
                value={currentFontSize}
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                onChange={changeFontSize}
                renderThumb={(props, state) => <div {...props}><div className="current-zoom-number">{currentFontSize + 1}x</div></div>}
            />
            <svg width="10" height="10" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onDecreaseFontSize} style={{
                marginLeft:15
            }}>
                <path d="M6.86881 21.6228H18.9374L21.3768 28.0422H25.849L14.9145 0.224609H10.9345L0 28.0422H4.47221L6.86881 21.6228Z" fill="#4D4D4F" />
                <path d="M12.927 5.52637L17.3564 17.3381H8.49756L12.927 5.52637Z" fill="white" />
            </svg>

            <div className={'go-back-tools'}
                onClick={toggleFont}
            >
                <div className={'icon-right-arrow'}>

                </div>
                <div>{t('bookComponent.goToTools', { lng: currentLanguage })}</div>
            </div>
        </motion.div>
    )
}
