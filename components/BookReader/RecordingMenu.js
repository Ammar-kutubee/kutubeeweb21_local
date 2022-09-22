import React, { useState, useEffect, useCallback, useRef } from 'react'
// import AudioPlayer from './AudioPlayer.js'
import { useDispatch } from 'react-redux'
// import { earnPoints } from '../../../utils/apis'
import { motion } from "framer-motion"
import { useTranslation } from 'react-i18next';
import useEventListener from '../../src/utils/useEventListener';
import AudioPlayer from './AudioPlayer';

export default function RecordingMenu({ stream, height, recordingMode, onToggleRecording, numberOfPages, currentPage, recordFile, onShare, hasPermission, userId, bookId, openConfirmationSheet, currentOrientation, currentTheme, language, stopMainRecorder, book, mainAudioExist, userType, allowMic, polygonAudio, setRecordingStatus }) {
    const [currentTime, setCurrentTime] = useState(0)
    const [audioPath, setAudioPath] = useState('');
    const [recordStatus, setRecordStatus] = useState('notStarted')
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation();
    const [audioChunks, setAudioChunks] = useState(null)
    const [audioLink, setAudioLink] = useState(null)
    const [mediaRecorder, setMediaRecorder] = useState(null)
    const timerRef = useRef(null)
    // let mediaRecorder = null;
    // const audioDataAvailable = useCallback(
    //     (event) => {
    //         // Update coordinates
    //         console.log('chunk', event.data)
    //         setAudioChunks(...audioChunks, event.data)
    //     },
    //     [audioChunks]
    // );
    // useEventListener("dataavailable", audioDataAvailable);
    useEffect(() => {
        setInterval(() => {

        }, 1000);
        // AudioRecorder.onProgress = (data) => {
        //     setCurrentTime(Math.floor(data.currentTime));
        // };

        // AudioRecorder.onFinished = (data) => {

        //     _finishRecording(data.base64, data.audioFileURL, data.audioFileSize);
        //     setAudioPath(data.audioFileURL)
        // };
        return () => {

        }
    }, [])
    const _finishRecording = (base64, path, size) => {
        // path = path.replace('file://', '')
        // console.log('base64', path, RNFS.DocumentDirectoryPath + '/users/' + userId + '/booksActivity/records/' + bookId + '-main-record.aac')
        // RNFS.writeFile(path, base64, 'base64')
        //     .then(saved => {
        //         console.log('file saved', saved)
        //     })
    }
    const formatTime = (time) => {
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = ~~time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
        // if (mins < 10) {
        //     mins = '0' + mins
        // }
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }
    useEffect(() => {
        console.log('******',)
        console.log(recordStatus, audioChunks)
        console.log('******',)
        if (recordStatus == 'stopped' && audioChunks != null && mediaRecorder?.status != 'inactive') {
            console.log('recordStatus', mediaRecorder)
            // let url = new Blob(audioChunks);

            let url = URL.createObjectURL(audioChunks);
            console.log('url', URL.createObjectURL(audioChunks))
            setAudioLink(url)
            stopMainRecorder(url, audioChunks)
        }
        return () => {

        }
    }, [recordStatus, audioChunks, mediaRecorder])
    const startRecording = () => {
        console.log('sssssss')
        if (allowMic) {
            setRecordStatus('recording')
            setRecordingStatus('recording')
            let recorder = new MediaRecorder(stream);
            // mediaRecorder.ondataavailable = (event) => {
            //     console.log('chunk', event.data)
            //     setAudioChunks(...audioChunks, event.data)
            // }
            recorder.addEventListener("dataavailable", (event) => {
                // if (this.idleTimer != null) {
                //     this.idleTimer.reset()
                // }
                // this.audioChunks.push(event.data);
                // console.log('event',event)
                setAudioChunks(event.data)
                // console.log('eee',event)
            });
            recorder.start()
            setMediaRecorder(recorder)
            // console.log('mediaRecorder', mediaRecorder)
            // setTimeout(() => {
            //     mediaRecorder.stop()
            //     stopRecording()
            // }, 2000);

        }
        // prepareRecordingPath(RNFS.DocumentDirectoryPath + '/users/' + userId + '/booksActivity/records/' + bookId + '-main-record.aac')
        // AudioRecorder.startRecording();

    }
    const pauseRecording = () => {
        // AudioRecorder.pauseRecording();
        mediaRecorder.pause()
        setRecordStatus('paused')
        setRecordingStatus('paused')
    }
    const continueRecording = () => {
        // AudioRecorder.resumeRecording();
        mediaRecorder.resume()
        setRecordStatus('recording')
        setRecordingStatus('recording')
    }
    const stopRecording = async () => {
        // let ss = await AudioRecorder.stopRecording();
        mediaRecorder.stop()
        setRecordStatus('stopped')
        setRecordingStatus('notStarted')
        setCurrentTime(0)
        // let points = await earnPoints(bookId, userId, 'record')
        // console.log('pooooooooooooooints', points)
        // if (points.increase) {
        //     dispatch({ type: 'POINTS_EARNED', message: { pointIncrease: points } })
        // }

    }
    useEffect(() => {
        if (recordStatus == 'recording') {
            timerRef.current = setInterval(() => {
                setCurrentTime(currentTime + 1)
            }, 1000);
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    }, [currentTime, recordStatus])
    return (
        <motion.div
            className={`recording-menu${currentTheme ? ' backgroundNight' : ''}`}
            transition={{
                type: 'timing',
                duration: 0.35,
            }}
            animate={
                {
                    y: recordingMode ? 0 : '100%',
                    opacity: recordingMode ? 1 : 0,
                }
            }
        >
            <div style={{ padding: 5, width: '45vw' }}>
                <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: '100%', display: 'flex' }}>
                    {
                        recordStatus == 'recording' || recordStatus == 'paused' ?
                            <div style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                            }}>

                                <div className={'currentTimeWrapper'}>
                                    <div className={`currentTimeText ${currentTheme ? 'nightModeText' : null}`}>{formatTime(currentTime)}</div>
                                </div>
                                {recordStatus == 'paused' ?
                                    <div
                                        onClick={continueRecording}
                                        className={'startRecordButton continueRecordButtonLandscape'}>
                                        <div className={'startRecordButtonCircle'} />
                                    </div>
                                    :

                                    <div
                                        className={'pauseButtonWrapperLandscape'}
                                        onClick={pauseRecording}
                                    >

                                        <motion.div
                                            animate={{ opacity: 0.3 }}
                                            transition={{ repeat: Infinity, duration: 1.5, repeatType: 'mirror' }}
                                            className={'recordingPauseButton1'}
                                        />
                                        <motion.div
                                            animate={{ opacity: 0.7 }}
                                            transition={{ repeat: Infinity, duration: 3, repeatType: 'mirror' }}
                                            className={'recordingPauseButton2'}
                                        />
                                        <div className={`pauseRecordButtonCircle ${currentTheme ? 'backgroundWhite' : ''}`}>
                                            <div className={`pauseIcon icon-pause ${currentTheme ? 'textBlack' : ''}`} />
                                        </div>
                                    </div>
                                }
                                <div
                                    onClick={stopRecording}
                                    className={`stopRecordButton ${currentTheme ? 'stopRecordButtonBlack' : ''}`}>
                                    <div className={'stopRecordButtonIcon'} />
                                    {/* <View style={[styles.stopRecordButtonIcon, currentTheme ? styles.backgroundWhite : null]} /> */}
                                </div>

                            </div>
                            :
                            mainAudioExist ?
                                audioLink != '' ?
                                    <AudioPlayer polygonAudio={polygonAudio} userType={userType} filePath={audioLink} onShare={onShare} book={book} openConfirmationSheet={openConfirmationSheet} />
                                    :
                                    ''
                                // <AudioPlayer userType={userType} currentOrientation={currentOrientation} openConfirmationSheet={openConfirmationSheet} filePath={audioPath} onShare={onShare} book={book} /> : null
                                :
                                <div>
                                    <div
                                        onClick={startRecording}
                                        className={`startRecordButton ${currentTheme ? 'borderWhite' : ''}`}>
                                            <div className='start-recording-text'>{t('bookComponent.startRecording')}</div>
                                        <div className={`startRecordButtonCircle ${currentTheme ? 'backgroundWhite' : ''}`}>
                                            
                                        </div>

                                    </div>
                                </div>
                    }

                </div>
                <div
                    hitSlop={{
                        top: 10,
                        right: 10,
                        left: 10,
                        bottom: 10
                    }}
                    className={'toggleRecordingIconWrapperLandscape'}
                    onClick={onToggleRecording}
                >
                    <div className={currentTheme ? 'toggleRecordingIconNight' : 'toggleRecordingIcon'} name="right-arrow" />
                </div>
            </div>
            <div className={'go-back-tools'}
                onClick={onToggleRecording}
            >
                <div className={'icon-right-arrow'}>

                </div>
                <div>{t('bookComponent.goToTools', { lng: language })}</div>
            </div>
        </motion.div>
    )
}