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

export default function ZoomMenu({ zoomMode, currentZoom, onZoomChange, onZoomIn, onZoomOut, currentLanguage, toggleZoom }) {
    const changeZoom = (e) => {
        onZoomChange(e)
    }
    const zoomValue = () => {

    }
    const { t, i18n } = useTranslation([], { useSuspense: false });

    return (
        <motion.div
            transition={{
                type: 'timing',
                duration: 0.3,
            }}
            className={`zoom-menu`}
            animate={{ y: zoomMode ? 0 : '100%', opacity: zoomMode ? 1 : 0, }}
        // onLayout={onLayout}
        >
            <svg
                className="zoom-icon"
                onClick={onZoomIn} width="19" height="19" viewBox="0 0 19 19" fill="none" >
                <path d="M12.1183 6.87751H19V12.1225H12.1183V19H6.87012V12.1225H0V6.87751H6.88171V0H12.1299V6.87751H12.1183Z" fill="#979797" />
            </svg>

            <ReactSlider
                className="horizontal-slider"
                marks
                markClassName="slider-mark"
                min={0}
                invert
                max={4}
                value={currentZoom}
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                onChange={changeZoom}
                renderThumb={(props, state) => <div {...props}><div className="current-zoom-number">{currentZoom + 1}x</div></div>}
            />
            <svg
                className="zoom-icon"
                onClick={onZoomOut} width="19" height="19" viewBox="0 0 19 5" fill="none" >
                <path d="M12.1183 0H19V5H12.1183H6.87012H0V0H6.88171L12.1299 2.80581e-05L12.1183 0Z" fill="#979797" />
            </svg>

            <div className={'go-back-tools'} 
            onClick={toggleZoom}
            >
                <div className={'icon-right-arrow'}>

                </div>
                <div>{t('bookComponent.goToTools', { lng: currentLanguage })}</div>
            </div>
        </motion.div>
    )
}
