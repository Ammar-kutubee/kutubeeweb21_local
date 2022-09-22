import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player'
// import ConfirmationSheet from '../../../../components/Global/ConfirmationSheet';
// import Icon from '../../../../utils/customIcons';
// import { mScale } from '../../../../utils/functions';
// import styles from '../../styles';

export default function AudioPlayer({ filePath, openConfirmationSheet, onShare, book, currentOrientation, userType }) {
    const player = useRef(null)
    const [isPaused, setIsPaused] = useState(true)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const handleLoad = (meta) => {
        setDuration(meta.duration)
    }
    const handleProgress = (progress) => {

        setCurrentTime(progress)
    }
    const onEnd = () => {
        console.log('finished')
        setIsPaused(true)
        setIsFinished(true)
        setCurrentTime(0)
    }
    const togglePlay = () => {
        if (isPaused == true) {
            setIsFinished(false)
        }
        setIsPaused(!isPaused)
    }
    let deleteSheetRef = useRef(null)
    const onDeleteSheetRef = (ref) => {
        deleteSheetRef = ref
    }
    const onDelete = () => {
        // console.log('confirmationSheetRef',confirmationSheetRef)
        openConfirmationSheet()
    }
    const calculateProgressWidth = () => {
        console.log(currentTime / duration * 100 + '%')
        return currentTime / duration * 100 + '%'
    }
    const onLoadedMetadata = (meta) => {
        setDuration(meta.target.duration)
    }
    return (
        <div style={
            {
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex'
            }
        }
        >
            {!isPaused ?
                <ReactAudioPlayer
                    ref={player}
                    listenInterval={250}
                    audioOnly
                    src={filePath}
                    onLoadedMetadata={onLoadedMetadata}
                    // onLoad={onQuestionAudioLoad}
                    autoPlay
                    onEnded={
                        onEnd
                    }
                    onListen={handleProgress}
                />

                :
                null
            }

            <div>
                {
                    isPaused ?
                        <div
                            className={'playerPlayIconWrapper'}
                            onClick={togglePlay}>
                            <div className="icon-play playerPlayIcon" />
                        </div>
                        :
                        <div
                            className={'playerPlayIconWrapper'}
                            onClick={togglePlay}>
                            <div className="icon-pause playerPlayIcon" />
                        </div>
                }
            </div>
            <div className={'playerProgressWrapper'}>
                <div transition={{ type: 'timing', duration: 0.05 }} style={{ width: isFinished ? '100%' : calculateProgressWidth() }} className={'playerProgress'} />
                <div
                    transition={{ type: 'timing', duration: 0.05 }}
                    style={{ left: isFinished ? '100%' : calculateProgressWidth() }}
                    className={'playerProgressThumb'} />
            </div>
            <div className={'playerSideButtons'}>
                {book.mainRecord?.shared ?
                    <div
                        disabled={true}
                        hitSlop={{
                            top: 5,
                            left: 5,
                            right: 5,
                            bottom: 5
                        }}
                    >
                        <div className={'playSideButton shared icon-share'} />
                    </div>
                    :
                    <div
                        hitSlop={{
                            top: 5,
                            left: 5,
                            right: 5,
                            bottom: 5
                        }}
                        onClick={onShare}>
                        <div className={'playSideButton icon-share'} />
                    </div>
                }

                <div
                    hitSlop={{
                        top: 5,
                        left: 5,
                        right: 5,
                        bottom: 5
                    }}
                    onClick={onDelete}>
                    <div className={'playSideButton icon-remove'} />
                </div>
            </div>

        </div>
    )
}