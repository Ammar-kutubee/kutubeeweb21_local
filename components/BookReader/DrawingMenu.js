// import { useTheme } from '@shopify/restyle'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player';
// import { View, Text, TouchableOpacity } from 'react-native'
// import { AudioRecorder } from 'react-native-audio'
// import Icon from '../../../utils/customIcons'
// import { mScale } from '../../../utils/functions'
// import styles from '../styles'
// import RNFS from 'react-native-fs'
// import Video from 'react-native-video';

export default function DrawingMenu({ stopDrawingRecorder, allowMic, polygonAudio, deletePolygon, selectedPolygonId, selectedPolygonPage, currentPage, currentOrientation, bookId, book, audioAttached, savePolygonAudio, selectionPopupShareBtnEnable, selectionPopupHavePlayBtn, onPolygonShare, userType, stream }) {
    const player = useRef(null)
    const [currentTime, setCurrentTime] = useState(0)
    const [audioPath, setAudioPath] = useState('');
    const [recordStatus, setRecordStatus] = useState('notStarted')
    const [isPaused, setIsPaused] = useState(true)
    const [duration, setDuration] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const [audioChunks, setAudioChunks] = useState(null)
    const [audioLink, setAudioLink] = useState(null)
    const [mediaRecorder, setMediaRecorder] = useState(null)
    const [currentPageNumber, setCurrentPageNumber] = useState(null)
    const timerRef = useRef(null)
    useEffect(() => {
        console.log('*********************************')
        console.log('hasPermissionhasPermissionhasPermissionhasPermission', polygonAudio)
        console.log('*********************************')
        return () => {

        }
    }, [polygonAudio])
    const prepareRecordingPath = (path) => {

        // AudioRecorder.prepareRecordingAtPath(path, {
        //     SampleRate: 22050,
        //     Channels: 1,
        //     AudioQuality: "Low",
        //     AudioEncoding: "aac",
        //     // AudioEncodingBitRate: 32000
        // });


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

        if (recordStatus == 'stopped' && audioChunks != null && mediaRecorder?.status != 'inactive' && currentPageNumber != null) {
            console.log('recordStatus', currentPageNumber)
            // let url = new Blob(audioChunks);

            let url = URL.createObjectURL(audioChunks);
            console.log('url', URL.createObjectURL(audioChunks))
            setAudioLink(url)
            stopDrawingRecorder(url, audioChunks, currentPageNumber)
        }
        return () => {

        }
    }, [recordStatus, audioChunks, mediaRecorder, currentPageNumber])
    const startRecording = () => {
        // console.log(AudioUtils.DocumentDirectoryPath)
        // console.log(RNFS.DocumentDirectoryPath)
        if (allowMic) {
            setRecordStatus('recording')
            let recorder = new MediaRecorder(stream);
            setRecordStatus('recording')
            recorder.addEventListener("dataavailable", (event) => {
                // if (this.idleTimer != null) {
                //     this.idleTimer.reset()
                // }
                // this.audioChunks.push(event.data);
                // console.log('event',event)

                console.log("event.data2222",event.data);
                setAudioChunks(event.data)
                // console.log('eee',event)
            });
            recorder.start()
            setMediaRecorder(recorder)
            let currentPageNumber;
            if (currentOrientation == 'portrait') {
                currentPageNumber = currentPage
            } else if (currentOrientation == 'landscape') {
                if (currentPage == 0) {
                    currentPageNumber = currentPage
                } else if (currentPage == book.pages.length - 1) {
                    if (currentPage % 2 != 0) {
                        if (selectedPolygonPage == 1) {
                            currentPageNumber = currentPage
                        } else {
                            currentPageNumber = currentPage + 1
                        }
                    } else {
                        currentPageNumber = currentPage
                    }
                } else {
                    if (currentPage % 2 != 0) {
                        if (selectedPolygonPage == 1) {
                            currentPageNumber = currentPage
                        } else {
                            currentPageNumber = currentPage + 1
                        }
                    } else {
                        if (selectedPolygonPage == 1) {
                            currentPageNumber = currentPage - 1
                        } else {
                            currentPageNumber = currentPage
                        }
                    }
                }
            }
            setCurrentPageNumber(currentPageNumber)

            // if (!hasPermission)
            //     return;
            // console.log(RNFS.DocumentDirectoryPath + '/users/' + 'test_id' + '/booksActivity/records/' + bookId + '-' + 'record-page' + currentPageNumber + '-' + book.pages[currentPageNumber].voiceRecords.length + '.aac')



        }
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
    const pauseRecording = () => {
        // prepareRecordingPath(RNFS.DocumentDirectoryPath + '/users/' + 'test_id' + '/booksActivity/records/' + bookId + '-' + 'record-page' + currentPage + '-' + book.pages[currentPage].voiceRecords.length + '.aac');


        AudioRecorder.pauseRecording();
        setRecordStatus('paused')
    }
    const continueRecording = () => {
        AudioRecorder.resumeRecording();
        setRecordStatus('recording')
    }
    const stopRecording = async () => {
        // if (timerRef.current) {
        //     console.log('sssssss')
        //     clearTimeout(timerRef.current);
        // }
        setCurrentTime(0)
        mediaRecorder.stop()
        setRecordStatus('stopped')
        // const filePath = await AudioRecorder.stopRecording();
        // setRecordStatus('stopped')
        // let bookTmp = book;
        // if (Platform.OS === 'android') {
        //     // this._finishRecording(true, filePath);
        // }
        // let currentPageNumber;
        // if (currentOrientation == 'portrait') {
        //     currentPageNumber = currentPage
        // } else if (currentOrientation == 'landscape') {
        //     if (currentPage == 0) {
        //         currentPageNumber = currentPage
        //     } else if (currentPage == bookTmp.pages.length - 1) {
        //         if (currentPage % 2 != 0) {
        //             if (selectedPolygonPage == 1) {
        //                 currentPageNumber = currentPage
        //             } else {
        //                 currentPageNumber = currentPage + 1
        //             }
        //         } else {
        //             currentPageNumber = currentPage
        //         }
        //     } else {
        //         if (currentPage % 2 != 0) {
        //             if (selectedPolygonPage == 1) {
        //                 currentPageNumber = currentPage
        //             } else {
        //                 currentPageNumber = currentPage + 1
        //             }
        //         } else {
        //             if (selectedPolygonPage == 1) {
        //                 currentPageNumber = currentPage - 1
        //             } else {
        //                 currentPageNumber = currentPage
        //             }
        //         }
        //     }
        // }
        // savePolygonAudio(filePath, currentPageNumber, currentTime)
    }

    const onEnd = () => {
        console.log('finished')
        setIsPaused(true)
        setIsFinished(true)
    }
    const handleLoad = (meta) => {
        setDuration(meta.duration)
    }
    const handleProgress = (progress) => {
        console.log('sdsdsds', progress)
        setCurrentTime(progress)
    }
    const togglePlay = () => {
        if (isPaused == true) {
            setIsFinished(false)
        }
        setIsPaused(!isPaused)
    }
    const onLoadedMetadata = (meta) => {
        setDuration(meta.target.duration)
    }
    return (
        <div style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            display: 'flex'
        }}>
            
            {polygonAudio != null ?
                <>
                    {!isPaused ?
                        <ReactAudioPlayer
                            ref={player}
                            listenInterval={250}
                            audioOnly
                            src={polygonAudio.record}
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
                    {isPaused ?
                        <div
                            onClick={togglePlay}
                            className="play-icon-wrapper"
                            style={{ height: 30, width: 25, padding: 6, margin: '0 10px', alignItems: 'center',display:'flex' }}>
                            <div className={'icon-play'} style={{ fontSize: 16 }} />
                        </div>
                        :
                        <div
                        onClick={togglePlay}
                            className="play-icon-wrapper"
                            style={{ height: 30, width: 25, padding: 6, margin: '0 10px', alignItems: 'center', display:'flex' }}>
                            <div className={'icon-pause'} style={{ fontSize: 13 }} />
                        </div>
                    }

                    <div className={'selectionMenuIconSplitter'} />
                    {isPaused ?
                        userType == 'student' ?
                            <div
                                onClick={onPolygonShare}
                                disabled={!selectionPopupShareBtnEnable}
                                className={'share-icon-wrapper'}>
                                <div className={`icon-share ${selectionPopupShareBtnEnable ? '' : 'shared'}`} style={{ fontSize: 15 }} />
                            </div>
                            :
                            null
                        :
                        <div className="drawing-current-time">{formatTime(currentTime)}</div>
                    }
                    <div className={'selectionMenuIconSplitter'} />

                    {recordStatus == 'recording' ?
                        null
                        :
                        <div
                            onClick={deletePolygon}
                            style={{ height: 25, width: 25, padding: 2, margin:'0 10px' }}>
                            <div className={'icon-remove'} style={{ fontSize: 20 }} />
                        </div>
                    }
                </>
                :
                <>
                    {recordStatus == 'notStarted' && recordStatus != 'stopped' ?
                        <div
                            onClick={startRecording}
                            className={'stopRecordButton'}
                            style={
                                { height: 25, width: 25, padding: 6, marginHorizontal: 10, border: 'solid 1px red', cursor: 'pointer' }
                            }>
                            <div className={'startRecordButtonCircle'} />
                        </div>
                        :
                        recordStatus != 'stopped' ?
                            <div
                                onClick={stopRecording}
                                className={'stopRecordButton'}
                                style={
                                    { height: 25, width: 25, padding: 6, marginHorizontal: 10, borderColor: 'red' }
                                }
                            >
                                <div
                                    style={{ backgroundColor: 'red' }}
                                    className="stopRecordButtonIcon"
                                />
                            </div>
                            :
                            null
                    }
                    <div className={'selectionMenuIconSplitter'} />

                    {recordStatus == 'recording' ?
                        null
                        :
                        <div
                            onClick={deletePolygon}
                            style={{ height: 25, width: 25, padding: 2, margin: '0 10px' }}>
                            <dic className={'icon-remove'} style={{ fontSize: 20 }} />
                        </div>
                    }
                    {recordStatus == 'recording' ?
                        <div className="drawing-current-time">{formatTime(currentTime)}</div>
                        :
                        null
                    }
                </>

            }

        </div>
    )
}