import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"

export default function BookProgress({ numberOfPages, currentPage, language, currentOrientation, currentTheme, reflowable, reflowableCurrentProgress }) {
    const [progressWidth, setProgressWidth] = useState(0)
    const [progressContainerWidth, setProgressContainerWidth] = useState(0)
    useEffect(() => {
        if (!reflowable) {
            let progress = (currentPage + 1) / (numberOfPages + 1)
            progress = progress * 100 + '%'
            console.log(progress + "%");

            setProgressWidth(progress)
        } else {
            console.log('reflowableCurrentProgress', reflowableCurrentProgress)

            setProgressWidth(reflowableCurrentProgress + '%')
        }

        return () => {

        }
    }, [currentPage, numberOfPages, currentOrientation, progressContainerWidth, reflowableCurrentProgress])
    return (
        <div className={'bookProgressBarWrapper'}>
            <div
                className={`bookProgressContainerLandscape ${language == 'ar' ? 'rtlDir' : ''}`} >
                <motion.div className={`bookProgress bookProgressLandscape `}
                    animate={{ width: progressWidth == Infinity ? 0 : progressWidth }}
                    transition={{
                        type: 'timing',
                        duration: 0.25,
                    }}>
                </motion.div>

            </div>
        </div>

    )
}