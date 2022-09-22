import React, { useCallback, useEffect, useRef, useState } from 'react'
import Insidelayout from '../../../components/layouts/insidelayout'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { useRouter } from 'next/router'
import TextBookCover from '../../../components/Book/TextBookCover'
import { getBookData, getBookProgress, getBookRatings, getBookUserRate, getRelatedBooks } from '../../../src/utils/apis'
import axios from 'axios';
import BookMenu from '../../../components/BookReader/BookMenu';
import BookProgress from '../../../components/BookReader/BookProgress';
import { useSelector } from 'react-redux';
import SelectionMenu from '../../../components/BookReader/SelectionMenu';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ZoomMenu from '../../../components/BookReader/ZoomMenu';
import LevelDescriptionpopup from '../../../components/Book/LevelDescriptionpopup';
import AddNote from '../../../components/BookReader/AddNote';
import moment from 'moment';
import RecordingMenu from '../../../components/BookReader/RecordingMenu';
import AddVocabulary from '../../../components/BookReader/AddVocabulary';
import Timer from '../../../components/BookReader/Timer';
import { useStopwatch } from 'react-timer-hook';
import BookFinish from '../../../components/BookReader/BookFinish';
import FontMenu from '../../../components/BookReader/FontMenu';
import { isSafari } from 'react-device-detect';
import ConfirmationMessage from '../../../components/Book/ConfirmationMessage';
import PreloaderPopup from '../../../components/Book/PreloaderPopup';
import SentMessage from '../../../components/Book/SentMessage';
import { getBookAdditionsNumber } from '../../../src/utils/functions';
import Additions from '../../../components/BookReader/Additions';
import DiscardMessage from '../../../components/Book/DiscardMessage';

import mpegEncoder from 'audio-recorder-polyfill/mpeg-encoder'
const Read = ({ userId }) => {
    const router = useRouter()
    const { bookId, mode, a } = router.query
    const [currentMode, setCurrentMode] = useState(null)
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const bookWrapper = useRef(null)
    const zoomRef = useRef(null)
    const iframe = useRef(null)
    const iframeWrapper = useRef(null)
    const iframeScaleWrapper = useRef(null)
    const reflowableRendition = useRef(null)
    const bookReflowable = useRef(null)
    const state = useSelector(state => state.mainReducer)
    const { loggedInUser, appLanguage } = state
    const [scale, setScale] = useState(0)
    const [bookWidth, setBookWidth] = useState(0)
    const [bookHeight, setBookHeight] = useState(0)
    const [bookMarginLeft, setBookMarginLeft] = useState(0)
    const [bookMarginTop, setBookMarginTop] = useState(0)
    const [bookTop, setBookTop] = useState(0)
    const [bookLeft, setBookLeft] = useState(0)
    const [bookOrigin, setBookOrigin] = useState(0)
    const [bookMedia, setBookMedia] = useState({})
    const [stream, setStream] = useState(null)
    const [currentPageUrl, setCurrentPageUrl] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [currentOrientation, setCurrentOrientation] = useState('landscape')
    const [initialOrientation, setInitialOrientation] = useState(null)
    const [bookJsonPath, setBookJsonPath] = useState('')
    const [book, setBook] = useState({})
    const [bookData, setBookData] = useState(null)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [serverBaseUrl, setServerBaseUrl] = useState('')
    const [bookMenuHeight, setBookMenuHeight] = useState(0)
    const [currentPageAudios, setCurrentPageAudios] = useState([])
    const [currentPageAudiosMode, setCurrentPageAudiosMode] = useState([])
    const [currentPortraitPage, setCurrentPortraitPage] = useState([])
    const [bookLoaded, setBookLoaded] = useState(false)
    const [reflowableFinished, setReflowableFinished] = useState(false)
    const [playForMeMode, setPlayForMeMode] = useState(true)
    const [userType, setUserType] = useState('student')
    const [recordingMode, setRecordingMode] = useState(false)
    const [drawing, setDrawing] = useState(false)
    const [showBookMenu, setShowBookMenu] = useState(true)
    const [textMode, setTextMode] = useState(true)
    const [selectedHighlightId, setSelectedHighlightId] = useState('')
    const [selectedHighlightPage, setSelectedHighlightPage] = useState('')
    const [selectionPopupHaveShareBtn, setSelectionPopupHaveShareBtn] = useState(false)
    const [showColorPopup, setShowColorPopup] = useState(false)
    const [vocabularyShared, setVocabularyShared] = useState(false)
    const [selectionPopupShareBtnEnable, setSelectionPopupShareBtnEnable] = useState(false)
    const [enableVocabulary, setEnableVocabulary] = useState(false)
    const [enableHighlight, setEnableHighlight] = useState(false)
    const [selectionPopupHavePlayBtn, setSelectionPopupHavePlayBtn] = useState(false)
    const [hasPermission, setHasPermission] = useState(undefined)
    const [currentTime, setCurrentTime] = useState(0.0)
    const [mainRecordExist, setMainRecordExist] = useState(false)
    const [reflowableProgress, setReflowableProgress] = useState(0)
    const [currentTheme, setCurrentTheme] = useState('lightMode')
    const [currentCfi, setCurrentCfi] = useState(null)
    const [selectionMenuLayout, setSelectionMenuLayout] = useState({})
    const [fontSize, setFontSize] = useState('16px')
    const [originalReadingTimer, setOriginalReadingTimer] = useState(0)
    const [studentReadingTimer, setStudentReadingTimer] = useState(false)
    const [studentModeFinished, setStudentModeFinished] = useState(false)
    const [originalModeFinished, setOriginalModeFinished] = useState(false)
    const [reflowableCurrentProgress, setReflowableCurrentProgress] = useState(false)
    const [bookPagesFlipped, setBookPagesFlipped] = useState(0)
    const [bookPagesFlippedOriginal, setBookPagesFlippedOriginal] = useState(0)
    const [quizFullMark, setQuizFullMark] = useState(false)
    const [bookEnd, setBookEnd] = useState(false)
    const [quizOpened, setQuizOpened] = useState(false)
    const [bookFinishData, setBookFinishData] = useState({})
    const [bookProgressSaved, setBookProgressSaved] = useState(false)
    const [newLevelData, setNewLevelData] = useState(null)
    const [congratsMessage, setCongratsMessage] = useState(null)
    const [bookExit, setBookExit] = useState(false)
    const [vocabularyData, setVocabularyData] = useState({})
    const [additionsNumber, setAdditionsNumber] = useState(0)
    const [polygonAudio, setPolygonAudio] = useState(null)
    const [disableIframe, setDisableIframe] = useState(false)
    const [popupType, setPopupType] = useState('text')
    const [bookEndOnClose, setBookEndOnClose] = useState(false)
    const [openDiscardMessage, setOpenDiscardMessage] = useState(false)
    const [popup, setPopup] = useState({
        y: 0,
        x: 0
    })

    const [showVocabularies, setShowVocabularies] = useState(false)
    const [currentSelectedText, setCurrentSelectedText] = useState(false)
    const [showSelectionPopup, setShowSelectionPopup] = useState(false)
    const [selectedPolygonId, setSelectedPolygonId] = useState('')
    const [selectedPolygonPage, setSelectedPolygonPage] = useState('')
    const [selectedPolygonHtml, setSelectedPolygonHtml] = useState('')
    const [recordingStatus, setRecordingStatus] = useState('notStarted')
    const [zoomMode, setZoomMode] = useState(false)
    const [currentZoom, setCurrentZoom] = useState(0)
    const [noteOpened, setNoteOpened] = useState(false)
    const [additionsOpened, setAddtionsOpened] = useState(false)
    const [vocabularyOpened, setVocabularyOpened] = useState(false)
    const [allowMic, setAllowMic] = useState(false)
    const [bookProgress, setBookProgress] = useState(null)
    const [showBookFinish, setShowBookFinish] = useState(false)

    const [fontMode, setFontMode] = useState(false)
    const [currentFontSize, setCurrentFontSize] = useState(false)
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
    const [confirmationMessageText, setConfirmationMessageText] = useState('')
    const [confirmationType, setConfirmationType] = useState('')


    const [openSentModal, setOpenSentModal] = useState(false)
    const [sentMessageText, setSentMessageText] = useState('')
    const [sentType, setSentType] = useState('')
    const [totalPages,setTotalPages] = useState(0);
    const [preloadPopup,setPreloadPopup] = useState(false);

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });
    const pauseMemoized = useCallback(pause, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const resetMemoized = useCallback(reset, []);

    const startMemoized = useCallback(start, []);

    useEffect(async () => {
        const AudioRecorder = require('audio-recorder-polyfill')
        AudioRecorder.encoder = mpegEncoder
        AudioRecorder.prototype.mimeType = 'audio/mpeg'
        window.MediaRecorder = AudioRecorder
        const bookProgress = await getBookProgress(userId, bookId);
        setBookProgress(bookProgress)
        if (a != undefined) {
            setAddtionsOpened(true)
        }
        if (mode == 'original' || mode == 'student') {
            setCurrentMode(mode)
        } else {
            router.replace(`/book/${bookId}/`)
        }
        const formData1 = new FormData();
        formData1.append('id', bookId);
        // this.setState({
        //     historyNumber: window.history.length
        // })
        if (mode == 'student') {
            if (navigator.mediaDevices != undefined) {
                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(stream => {
                        console.log('stream', stream)
                        setStream(stream)
                        setAllowMic(true)

                    })
                    .catch(error => {
                        console.log('errrror', error)
                        setAllowMic(false)
                    })
            }
        }
        axios.post('https://school.kutubee.com:4000/book/app/get', formData1)
            .then(res => {
                const bookData = res.data[0];
                if (res.data[0].bookSource != 'reflowable') {
                    // window.addEventListener('message', _onMessage);
                    let dataJsonUrl = 'https://school.kutubee.com:4000/tmp/' + bookId + '_tmp/OEBPS/data.json'
                    axios.get(dataJsonUrl)
                        .then(dataJson => {
                            const formData = new FormData();
                            formData.append('id', bookId);

                            let bookStorageData = localStorage.getItem(userId + '_' + bookId);

                            if (bookStorageData == undefined || bookStorageData == null) {
                                console.log('undefiiiiiiiiiiiiined')
                                let pagesHighlight = [];
                                dataJson.data.pages.forEach(page => {
                                    pagesHighlight.push({ highlights: [], drawings: [], vocabularies: [], });
                                });
                                dataJson.data.mainRecord = {}
                                dataJson.data.mainNote = {}
                                dataJson.data.generalVocabularies = []
                                localStorage.setItem(userId + '_' + bookId, JSON.stringify({ pages: pagesHighlight, mainNote: {}, mainRecord: {}, generalVocabularies: [], }));
                                setBookMedia({ pages: pagesHighlight, mainNote: {}, mainRecord: {}, generalVocabularies: [], })
                            }

                            if (bookStorageData != undefined || bookStorageData != null) {
                                console.log('dddddddddddddddddddddddddddddddddddddddddddddddd')
                                bookStorageData = JSON.parse(bookStorageData)
                                dataJson.data.pages.forEach((page, index) => {
                                    console.log('bookStorageData.pages[index].highlights', bookStorageData.pages[index].highlights)
                                    page.highlights = bookStorageData.pages[index].highlights
                                    page.drawings = bookStorageData.pages[index].drawings
                                    page.vocabularies = bookStorageData.pages[index].vocabularies
                                })
                                console.log('sssdddddd22222', dataJson.data)
                                dataJson.data.mainRecord = {}
                                bookStorageData.pages.forEach(page => {
                                    if (page.vocabularies == undefined) {
                                        page.vocabularies = []
                                    }
                                    page.drawings.forEach((drawing, index) => {
                                        delete drawing.record
                                        delete drawing.saveDate
                                        delete drawing.sharedDate
                                        delete drawing.shared
                                        delete drawing.duration
                                        drawing.audioAttached = false
                                    })
                                })
                                if (bookStorageData.mainNote == '') {
                                    bookStorageData.mainNote = {}
                                }
                                dataJson.data.mainNote = bookStorageData.mainNote
                                if (bookStorageData.generalVocabularies == undefined) {
                                    bookStorageData.generalVocabularies = []
                                }
                                dataJson.data.generalVocabularies = bookStorageData.generalVocabularies
                                setBookMedia({ ...bookStorageData })
                            }
                            setBookData(bookData)
                            setBook(dataJson.data)
                            setNumberOfPages(dataJson.data.pages.length)
                            setCurrentPageUrl(`https://school.kutubee.com:4000/tmp/${bookId}_tmp/OEBPS${dataJson.data.pages[currentPage].pagePath}`)


                            setOriginalReadingTimer(0)
                            setStudentReadingTimer(0)


                            setBookPagesFlipped(bookProgress.bookProgress.data.pagesFlipped)
                            setBookPagesFlippedOriginal(bookProgress.bookProgress.data.pagesFlippedOriginal)
                            console.log("setOriginalModeFinished1")

                            setOriginalModeFinished(bookProgress.bookProgress.data.originalModeFinished)
                            setStudentModeFinished(bookProgress.bookProgress.data.studentModeFinished)
                            setStudentReadingTimer(bookProgress.bookProgress.data.studentModeTime)
                            setOriginalReadingTimer(bookProgress.bookProgress.data.originalModeTime)
                            console.log({ bookProgress: bookProgress.bookProgress.data })
                            // return
                            setBookLoaded(true)
                            getScale(bookData)

                        })
                } else {
                    // return
                    const bookDataReflowable = res.data[0];
                    setBookData(bookDataReflowable)
                    let bookStorageData = localStorage.getItem(userId + '_' + bookId);
                    let dataJson = {};
                    dataJson.data = {}
                    if (bookStorageData == undefined || bookStorageData == null) {
                        let pagesHighlight = [];

                        dataJson.data.mainRecord = {}
                        dataJson.data.mainNote = {}
                        dataJson.data.highlights = []
                        localStorage.setItem(userId + '_' + bookId, JSON.stringify({ pages: pagesHighlight, mainNote: {}, mainRecord: {}, generalVocabularies: [], }));
                        setBookMedia({ pages: pagesHighlight, mainNote: {}, mainRecord: {}, generalVocabularies: [], })
                    }

                    if (bookStorageData != undefined || bookStorageData != null) {
                        bookStorageData = JSON.parse(bookStorageData)
                        dataJson.data.mainRecord = {}
                        dataJson.data.mainNote = bookStorageData.mainNote
                        console.log('dataJson.data.highlights', dataJson.data.highlights)
                        // return 
                        if (dataJson.data.highlights == undefined) {
                            dataJson.data.highlights = []
                        }
                        setBookMedia({ ...dataJson.data })
                        // this.setState({
                        //     bookMedia: bookStorageData,
                        // })
                    }

                    setBook(dataJson.data)
                    // this.setState({
                    //     book: dataJson.data,
                    // }, this.getScale(bookData), this.bookWrapper.offsetWidth, this.bookWrapper.offsetHeight)
                    setOriginalReadingTimer(0)
                    setStudentReadingTimer(0)

                    setBookPagesFlipped(bookProgress.bookProgress.data.pagesFlipped)
                    setBookPagesFlippedOriginal(bookProgress.bookProgress.data.pagesFlippedOriginal)

                    console.log("setOriginalModeFinished2")
                    setOriginalModeFinished(bookProgress.bookProgress.data.originalModeFinished)
                    setStudentModeFinished(bookProgress.bookProgress.data.studentModeFinished)
                    setStudentReadingTimer(bookProgress.bookProgress.data.studentModeTime)
                    setOriginalReadingTimer(bookProgress.bookProgress.data.originalModeTime)
                    const ePub = require('../../../src/js/epub')

                    setCurrentPageUrl(bookDataReflowable.orignalFile)
                    //     this.setState({
                    //         bookData: bookData,
                    //         currentPageUrl: bookData.orignalFile
                    //     })
                    //     this._bookTimer();
                    //     this.voiceRecord();
                    //     console.log(' this.iframe', this.bookWrapper)
                    var bookTmp = ePub(bookDataReflowable.orignalFile);
                    bookReflowable.current = bookTmp
                    // setBookLoaded(true)
                    console.log('iframeScaleWrapper.offsetWidth', window)
                    var renditionTmp = bookTmp.renderTo("reflowable-book-wrapper", {
                        manager: "default",
                        flow: "paginated",
                        spread: "none",
                        width: "50%",
                        height: 'calc(100vh - 160px)'
                    });
                    reflowableRendition.current = renditionTmp
                    // console.log({bookDataReflowable})
                    // return
                    bookTmp.ready.then(() => {
                        setBookLoaded(true)

                        bookTmp.locations.generate(2600)
                            .then(locations => {

                                setTotalPages(locations.length);
                                console.log('locaaaations,', locations)
                            })
                    });

                    renditionTmp.on('relocated', (location) => {

                        
                        console.log("location222",location.start.location,location)


                        
                        setBookPagesFlippedOriginal(location.start.location + 1)
                        
                        var percent = bookTmp.locations.percentageFromCfi(location.start.cfi);
                        var percentage = Math.floor(percent * 100);
                        console.log('percent', percent, 'percentage', percentage)


                        setReflowableCurrentProgress(percentage)
                        // this.setState({
                        //     reflowableCurrentProgress: percentage
                        // })

                        if (location.atEnd) {
                            // this.setState({
                            //     reflowableFinished: true
                            // })
                            setReflowableFinished(true)
                            console.log('lastPage')
                        } else {
                            setReflowableFinished(false)
                            // this.setState({
                            //     reflowableFinished: false
                            // })
                        }
                    });
                    var displayed = renditionTmp.display();
                    displayed.then(() => {
                        var currentLocation = renditionTmp.currentLocation();
                    });
                    console.log('rendition', renditionTmp, bookDataReflowable.orignalFile)
                }
            })
    }, [router.isReady, bookId]);
    useEffect(() => {
        console.log('00000000000000000000')
        window.addEventListener('message', onMessageReceivedFromIframe);
        return () => {
            window.removeEventListener('message', onMessageReceivedFromIframe);
        }
    }, [onMessageReceivedFromIframe, book, bookData, currentPage, vocabularyData, bookMedia])
    useEffect(() => {

        return () => {
            if (bookReflowable.current) {
                console.log('bookReflowable.current', bookReflowable.current)
                bookReflowable.current.destroy()
            }

        }
    }, [])
    const getScale = (bookData) => {
        var tmpbookWidth = parseInt(bookData.pageWidth);
        var tmpbookHeight = parseInt(bookData.pageHeight);
        console.log('iframeScaleWrapper', iframeScaleWrapper.current.offsetHeight, iframeScaleWrapper.current.offsetWidth)
        var iframeHeight = (iframeScaleWrapper.current.offsetHeight);
        var iframeWidth = iframeScaleWrapper.current.offsetWidth;
        var tmpscale = iframeHeight / tmpbookHeight;

        var widthRatio = iframeWidth / (tmpbookWidth * 2);
        var heightRatio = iframeHeight / tmpbookHeight;
        var min = Math.min(widthRatio, heightRatio);
        // console.log('min',min);
        var newwidth = Math.max(tmpbookWidth * 2, iframeWidth / min);
        var newheight = Math.max(tmpbookHeight, iframeHeight / min);
        var tmpbookMarginTop = 0
        var tmpbookMarginLeft = 0
        var tmpbookLeft = 0;
        var tmpbookTop = 0;
        var tmpbookOrigin = ''
        console.log('widthRatio > heightRatio', widthRatio > heightRatio, 'tmpbookWidth', tmpbookWidth)
        if (widthRatio > heightRatio) {
            if (min < 1) {
                console.log('widthRatio > heightRatio', (iframeWidth - ((tmpbookWidth * 2) * min)), iframeWidth, 'tmpbookWidth', tmpbookWidth, 'min', min)
                // console.log('widthRatiobigger than heightRatio',widthRatio,heightRatio,(1 - min) * newwidth / 2)
                tmpbookMarginLeft = (((min - 1) * newwidth / 2) * min) / 2;
                tmpbookLeft = (iframeWidth - ((tmpbookWidth * 2) * min)) / 2
                tmpbookTop = 0
                tmpbookOrigin = 'top left'

            } else {
                // min=1
                tmpbookMarginLeft = 0
                tmpbookWidth = '100%'
                tmpbookHeight = '100%'
                tmpbookOrigin = 'center center'
            }
        } else {
            // console.log('h than wRatio')
            // if(min<1){
            // bookMarginTop = (((1 - min) * newheight / 2) * min )/2
            // }else{
            // bookMarginTop=0
            // }
            // if(iframeWidth >= bookWidth*2){
            //   bookWidth = '100%'
            // }
            if (min < 1) {
                // // console.log('widthRatiobigger than heightRatio',widthRatio,heightRatio,(1 - min) * newwidth / 2)
                tmpbookMarginTop = (((1 - min) * newheight) * min) / 2
                tmpbookLeft = 0
                tmpbookTop = (iframeHeight - ((tmpbookHeight) * min)) / 2
                tmpbookOrigin = 'top left'
            } else {
                // min=1
                tmpbookMarginLeft = 0
                tmpbookWidth = '100%'
                tmpbookHeight = '100%'
                tmpbookOrigin = 'center'
            }
        }


        // this.setState({
        //     scale: min,
        //     bookWidth,
        //     bookHeight,
        //     bookMarginLeft,
        //     bookMarginTop,
        //     bookTop,
        //     bookLeft,
        //     bookOrigin
        // })
        console.log('minnnnnnnnnnnnnn', min, 'tmpbookWidth', tmpbookWidth)
        setScale(min)
        setBookWidth(tmpbookWidth)
        setBookHeight(tmpbookHeight)
        setBookMarginLeft(tmpbookMarginLeft)
        setBookMarginTop(tmpbookMarginTop)
        setBookTop(tmpbookTop)
        setBookLeft(tmpbookLeft)
        setBookOrigin(tmpbookOrigin)
    }
    const sendMessage = (message) => {
        if (iframe.current != null) {
            iframe.current.contentWindow.postMessage(message, '*')
        } else {
            // console.log('else message')
            if (document.getElementById('book-iframe') != null) {
                document.getElementById('book-iframe').contentWindow.postMessage(message, '*')
            }
        }
    }

    const _loadPageData = () => {
        if (currentPage == 0) {
            sendMessage(JSON.stringify({
                message: 'audiosJson', smilAudios: {
                    page1: book.pages[currentPage].smilAudios,
                    page2: []
                },
                modes: {
                    page1: book.pages[currentPage].pageAudioType,
                    page2: ''
                }
            }))
            sendMessage(JSON.stringify({
                message: 'addSvgs', svgs: {
                    page1: bookMedia.pages[currentPage].drawings,
                    page2: []
                }
            }))
            sendMessage(JSON.stringify({
                message: 'addHighlights',
                highlights: {
                    page1: bookMedia.pages[currentPage].highlights,
                    page2: []
                },
                vocabularies: {
                    page1: bookMedia.pages[currentPage].vocabularies,
                    page2: []
                }
            }))
        } else if (currentPage % 2 == 0 && currentPage != 0 && currentPage != book.pages.length - 1) {
            sendMessage(JSON.stringify({
                message: 'audiosJson', smilAudios: {
                    page1: book.pages[currentPage - 1].smilAudios,
                    page2: book.pages[currentPage].smilAudios
                },
                modes: {
                    page1: book.pages[currentPage - 1].pageAudioType,
                    page2: book.pages[currentPage].pageAudioType,
                }
            }))
            sendMessage(JSON.stringify(
                {
                    message: 'addSvgs',
                    svgs: {
                        page1: bookMedia.pages[currentPage - 1].drawings,
                        page2: bookMedia.pages[currentPage].drawings
                    }
                }
            ))
            sendMessage(JSON.stringify({
                message: 'addHighlights',
                highlights: {
                    page1: bookMedia.pages[currentPage - 1].highlights,
                    page2: bookMedia.pages[currentPage].highlights,
                },
                vocabularies: {
                    page1: bookMedia.pages[currentPage - 1].vocabularies,
                    page2: bookMedia.pages[currentPage].vocabularies
                }
            }))
        } else if (currentPage % 2 != 0 && currentPage != 0 && currentPage != book.pages.length - 1) {
            sendMessage(JSON.stringify({
                message: 'audiosJson', smilAudios: {
                    page1: book.pages[currentPage].smilAudios,
                    page2: book.pages[currentPage + 1].smilAudios
                },
                modes: {
                    page1: book.pages[currentPage].pageAudioType,
                    page2: book.pages[currentPage + 1].pageAudioType,
                }
            }))
            sendMessage(JSON.stringify(
                {
                    message: 'addSvgs',
                    svgs: {
                        page1: bookMedia.pages[currentPage].drawings,
                        page2: bookMedia.pages[currentPage + 1].drawings
                    }
                }
            ))
            sendMessage(JSON.stringify({
                message: 'addHighlights',
                highlights: {
                    page1: bookMedia.pages[currentPage].highlights,
                    page2: bookMedia.pages[currentPage + 1].highlights,
                },
                vocabularies: {
                    page1: bookMedia.pages[currentPage].vocabularies,
                    page2: bookMedia.pages[currentPage + 1].vocabularies
                }
            }))
        } else if (currentPage == book.pages.length - 1) {
            if (currentPage % 2 == 0) {
                sendMessage(JSON.stringify({
                    message: 'audiosJson', smilAudios: {
                        page1: book.pages[currentPage - 1].smilAudios,
                        page2: book.pages[currentPage].smilAudios
                    },
                    modes: {
                        page1: book.pages[currentPage - 1].pageAudioType,
                        page2: book.pages[currentPage].pageAudioType,
                    }
                }))
                sendMessage(JSON.stringify(
                    {
                        message: 'addSvgs',
                        svgs: {
                            page1: bookMedia.pages[currentPage - 1].drawings,
                            page2: bookMedia.pages[currentPage].drawings
                        }
                    }
                ))
                sendMessage(JSON.stringify({
                    message: 'addHighlights',
                    highlights: {
                        page1: bookMedia.pages[currentPage - 1].highlights,
                        page2: bookMedia.pages[currentPage].highlights,
                    },
                    vocabularies: {
                        page1: bookMedia.pages[currentPage - 1].vocabularies,
                        page2: bookMedia.pages[currentPage].vocabularies
                    }
                }))
            } else {
                sendMessage(JSON.stringify({
                    message: 'audiosJson', smilAudios: {
                        page1: book.pages[currentPage].smilAudios,
                        page2: []
                    },
                    modes: {
                        page1: book.pages[currentPage].pageAudioType,
                        page2: '',
                    }
                }))
                sendMessage(JSON.stringify(
                    {
                        message: 'addSvgs',
                        svgs: {
                            page1: bookMedia.pages[currentPage].drawings,
                            page2: []
                        }
                    }
                ))
                sendMessage(JSON.stringify({
                    message: 'addHighlights',
                    highlights: {
                        page1: bookMedia.pages[currentPage].highlights,
                        page2: []
                    },
                    vocabularies: {
                        page1: bookMedia.pages[currentPage].vocabularies,
                        page2: []
                    }
                }))
            }
        }
    }

    const _onPageLoad = () => {
        console.log('ssssss')
        sendMessage(JSON.stringify({ message: 'currentPageNumber', page: currentPage, lastPage: book.pages.length - 1 }))
        sendMessage(JSON.stringify({ message: 'currentMode', mode: currentMode }))
        if (bookData.language != undefined) {
            sendMessage(JSON.stringify({ message: 'language', bookLang: bookData.language }))
        }
        sendMessage(JSON.stringify({ message: 'drawingModeActive', drawingMode: drawing }))
        console.log('loggedInUser', loggedInUser)
        if (loggedInUser.userData.type != 'individual') {
            sendMessage(JSON.stringify({ message: 'textModeActive', textMode }))
        }
        _loadPageData()
        if (currentMode == 'original') {
            if (bookPagesFlippedOriginal <= currentPage + 1) {
                setBookPagesFlippedOriginal(currentPage + 1)
            }
        } else {
            if (bookPagesFlipped <= currentPage + 1) {
                setBookPagesFlipped(currentPage + 1)
            }
        }
        if (playForMeMode && currentMode == 'original') {
            if (currentPage != 0) {

                setTimeout(() => {
                    sendMessage(JSON.stringify({ message: 'play', smilAudios: currentPageAudios }))
                }, 300);
            } else {
                setTimeout(() => {
                    sendMessage(JSON.stringify({ message: 'play', smilAudios: currentPageAudios }))
                }, 1000);
            }


        }
    }
    const toggleZoom = () => {
        if (zoomMode) {
            zoomRef.current.resetTransform()
            setCurrentZoom(0)
        }
        setZoomMode(!zoomMode)
        toggleBookMenu()

    }
    const goBack = () => {

        if (recordingStatus != 'notStarted' && userType == 'student') {
            setOpenDiscardMessage(true)
            return
        }
        setBookEndOnClose(true)
        setBookEnd(true)
        setTimeout(() => {
            router.back()
        }, 500);

    }
    const _nextPage = () => {
        // zoomRef.current.zoomOut()
        // return
        if (bookData.bookSource == 'reflowable') {
            console.log("currentPagev2",currentPage,reflowableRendition.current.location.end.location)

            reflowableRendition.current.prev()




           // setBookPagesFlipped(bookPagesFlipped + 1);
            console.log("currentPagev2",currentPage,reflowableRendition.current.location.end.location)
            return;
        }
        if (currentPage > 0) {
            setDisableIframe(true)
            if (currentPage == book.pages.length - 1) {
                if (currentPage % 2 != 0) {
                    setCurrentPage(currentPage - 1)
                    setCurrentPageUrl(`https://school.kutubee.com:4000/tmp/${bookId}_tmp/OEBPS${book.pages[currentPage - 1].pagePath}`)
                    setShowColorPopup(false)
                    setSelectionPopupHaveShareBtn(false)
                    setCurrentPageAudios({
                        page1: book.pages[currentPage - 2].smilAudios,
                        page2: book.pages[currentPage - 1].smilAudios,
                    })
                    setCurrentPageAudiosMode({
                        page1: book.pages[currentPage - 2].smilAudios,
                        page2: book.pages[currentPage - 1].smilAudios,
                    })
                } else {
                    setCurrentPage(currentPage - 2)
                    setCurrentPageUrl(`https://school.kutubee.com:4000/tmp/${bookId}_tmp/OEBPS${book.pages[currentPage - 2].pagePath}`)
                    setShowColorPopup(false)
                    setSelectionPopupHaveShareBtn(false)
                    setCurrentPageAudios({
                        page1: book.pages[currentPage - 3].smilAudios,
                        page2: book.pages[currentPage - 2].smilAudios,
                    })
                    setCurrentPageAudiosMode({
                        page1: book.pages[currentPage - 3].pageAudioType,
                        page2: book.pages[currentPage - 2].pageAudioType,
                    })
                }
            } else {
                if (book.pages[currentPage - 2] != undefined) {
                    setCurrentPage(currentPage - 2)
                    setCurrentPageUrl(`https://school.kutubee.com:4000/tmp/${bookId}_tmp/OEBPS${book.pages[currentPage - 2].pagePath}`)
                    setShowColorPopup(false)
                    setSelectionPopupHaveShareBtn(false)

                    if (currentPage - 2 != 0) {
                        setCurrentPageAudios({
                            page1: book.pages[currentPage - 3].smilAudios,
                            page2: book.pages[currentPage - 2].smilAudios,
                        })
                        setCurrentPageAudiosMode({
                            page1: book.pages[currentPage - 3].pageAudioType,
                            page2: book.pages[currentPage - 2].pageAudioType,
                        })
                    }
                }
            }
            setTimeout(() => {
                setDisableIframe(false)
            }, 100);
        }
    }
    const _prevPage = () => {
        // zoomRef.current.centerView(1.5)
        // return
        console.log('boooooooooooooooooooooooook', book)
        // console.log("currentPagev2",currentPage,reflowableRendition.current.location.end.location)

        // if (book.pages == undefined) {
        //     return
        // }

        if (bookData.bookSource == 'reflowable') {
            console.log('reflowableFinished', reflowableFinished)
            // setCurrentPage(currentPage + 1);


//            setBookPagesFlipped(bookPagesFlipped + 1);

console.log("currentPagev2",currentPage,reflowableRendition.current.location.end.location)
            console.log("reflowableFinished",reflowableFinished)
            if (reflowableFinished) {
                setStudentModeFinished(true);

                console.log("setOriginalModeFinished3")
                setOriginalModeFinished(true);
                if(reflowableRendition.current) {
                    reflowableRendition.current.destroy()
                }
                
                setBookEnd(true)
                // if (!this.state.showMainRecorder) {
                //     clearInterval(this.timer);
                //     this.setState({
                //         bookFinished: true
                //     })
                //     if (this.reflowableBook != null) {
                //         this.reflowableBook.destroy();
                //     }
                //     let bookProgress = {
                //         bookId: this.props.bookID,
                //         studentModeTime: this.state.studentReadingTimer,
                //         originalModeTime: this.state.originalReadingTimer,
                //         pagesFlipped: this.state.bookPagesFlipped,
                //         studentModeFinished: this.state.studentModeFinished,
                //         originalModeFinished: this.state.originalModeFinished,
                //         // currentMode:this.state.currentMode,
                //         minTimeSpent: this.state.bookData.minTimeSpent,
                //     }
                //     if (this.state.currentMode == 'student') {
                //         if (this.state.studentReadingTimer >= this.state.bookData.minTimeSpent) {
                //             this.setState({
                //                 studentModeFinished: true
                //             })
                //             bookProgress.studentModeFinished = true
                //         } else {
                //             this.setState({
                //                 studentModeFinished: false
                //             })
                //             bookProgress.studentModeFinished = false
                //         }
                //     } else if (this.state.currentMode == 'original') {
                //         if (this.state.originalReadingTimer >= this.state.bookData.minTimeSpent) {
                //             this.setState({
                //                 originalModeFinished: true
                //             })
                //             bookProgress.originalModeFinished = true
                //         } else {
                //             this.setState({
                //                 originalModeFinished: false
                //             })
                //             bookProgress.originalModeFinished = false
                //         }
                //     }
                //     const formData = new FormData();
                //     formData.append('user_id', this.props.loggedInUser.userData._id);
                //     formData.append('book_id', this.state.bookData._id);
                //     formData.append('book_data', JSON.stringify(bookProgress));

                //     axios.post('https://school.kutubee.com:4000/user/pushData', formData)
                //         .then(res => {
                //             let message = {
                //                 status: true
                //             }
                //             this.props.dispatch({ type: "TOGGLE_CURRENT_BOOK_PROGRESS_SAVED", message });
                //             const formData2 = new FormData();
                //             formData2.append('user_id', this.props.loggedInUser.userData._id);
                //             axios.post('https://school.kutubee.com:4000/user/getProgress', formData2)
                //                 .then(res => {
                //                     message = {
                //                         userProgress: res.data
                //                     }
                //                     this.props.dispatch({ type: "GET_USER_PROGRESS", message });
                //                 })
                //         })
                // } else {
                //     console.log('ssssssswwwwwwwwwwwwwwwwwwwwwwwww')
                //     this.setState({
                //         discardRecordModal: true
                //     })
                // }
            } else {


                // console.log('ssssss', reflowableRendition)

                reflowableRendition.current.next()
                console.log("currentPagev2",currentPage,reflowableRendition.current.location.end.location)
            }
            return
        }


        if (currentPage < book.pages.length - 1) {
            setDisableIframe(true)
            if (book.pages[currentPage + 2] != undefined) {
                setCurrentPage(currentPage + 2)
                setCurrentPageUrl(`https://school.kutubee.com:4000/tmp/${bookId}_tmp/OEBPS${book.pages[currentPage + 2].pagePath}`)
                setShowColorPopup(false)
                setSelectionPopupHaveShareBtn(false)
                // this.setState({
                //     currentPage:currentPage + 2,
                //     currentPageUrl: `https://school.kutubee.com:4000/tmp/${bookId}_tmp/OEBPS${book.pages[currentPage + 2].pagePath}`,
                //     // currentPageAudios:this.state.book.pages[this.state.currentPage+2].smilAudios,
                //     scale: false,
                //     showSelectionPopup: false,
                //     showColorPopup: false,
                //     selectionPopupHaveShareBtn: false,
                // })
                // this.setState({
                //     currentPageAudios: {
                //         page1: this.state.book.pages[this.state.currentPage + 1].smilAudios,
                //         page2: this.state.book.pages[this.state.currentPage + 2].smilAudios,
                //     },
                //     currentPageAudiosMode: {
                //         page1: this.state.book.pages[this.state.currentPage + 1].pageAudioType,
                //         page2: this.state.book.pages[this.state.currentPage + 2].pageAudioType,
                //     }
                // })
            } else {
                setCurrentPage(currentPage + 1)
                setCurrentPageUrl(`https://school.kutubee.com:4000/tmp/${bookId}_tmp/OEBPS${book.pages[currentPage + 1].pagePath}`)
                setShowColorPopup(false)
                setSelectionPopupHaveShareBtn(false)
                // this.setState({
                //     currentPage: this.state.currentPage + 1,
                //     currentPageUrl: `https://school.kutubee.com:4000/tmp/${this.props.router.query.bookId}_tmp/OEBPS${this.state.book.pages[this.state.currentPage + 1].pagePath}`,
                //     // currentPageAudios:this.state.book.pages[this.state.currentPage+1].smilAudios,
                //     scale: false,
                //     showSelectionPopup: false,
                //     showColorPopup: false,
                //     selectionPopupHaveShareBtn: false,
                // })
                // this.setState({
                //     currentPageAudios: {
                //         page1: this.state.book.pages[this.state.currentPage + 1].smilAudios,
                //         page2: null,
                //     },
                //     currentPageAudiosMode: {
                //         page1: this.state.book.pages[this.state.currentPage + 1].pageAudioType,
                //         page2: null,
                //     }
                // })
            }
            setTimeout(() => {
                setDisableIframe(false)
                console.log('disaaaable')
            }, 100);
        } else if (currentPage >= book.pages.length - 1) {
            if (recordingStatus != 'notStarted' && userType == 'student') {
                setOpenDiscardMessage(true)
                return
            }
            // if (!this.state.showMainRecorder) {
            //     clearInterval(this.timer);
            //     this.setState({
            //         bookFinished: true
            //     })
            //     let bookProgress = {
            //         bookId: this.props.bookID,
            //         studentModeTime: this.state.studentReadingTimer,
            //         originalModeTime: this.state.originalReadingTimer,
            //         pagesFlipped: this.state.bookPagesFlipped,
            //         studentModeFinished: this.state.studentModeFinished,
            //         originalModeFinished: this.state.originalModeFinished,
            //         // currentMode:this.state.currentMode,
            //         minTimeSpent: this.state.bookData.minTimeSpent,
            //     }
            //     if (this.state.currentMode == 'student') {
            //         if (this.state.studentReadingTimer >= this.state.bookData.minTimeSpent) {
            //             this.setState({
            //                 studentModeFinished: true
            //             })
            //             bookProgress.studentModeFinished = true
            //         } else {
            //             this.setState({
            //                 studentModeFinished: false
            //             })
            //             bookProgress.studentModeFinished = false
            //         }
            //     } else if (this.state.currentMode == 'original') {
            //         if (this.state.originalReadingTimer >= this.state.bookData.minTimeSpent) {
            //             this.setState({
            //                 originalModeFinished: true
            //             })
            //             bookProgress.originalModeFinished = true
            //         } else {
            //             this.setState({
            //                 originalModeFinished: false
            //             })
            //             bookProgress.originalModeFinished = false
            //         }
            //     }
            //     const formData = new FormData();
            //     formData.append('user_id', this.props.loggedInUser.userData._id);
            //     formData.append('book_id', this.state.bookData._id);
            //     formData.append('book_data', JSON.stringify(bookProgress));

            //     axios.post('https://school.kutubee.com:4000/user/pushData', formData)
            //         .then(res => {
            //             let message = {
            //                 status: true
            //             }
            //             this.props.dispatch({ type: "TOGGLE_CURRENT_BOOK_PROGRESS_SAVED", message });
            //             const formData2 = new FormData();
            //             formData2.append('user_id', this.props.loggedInUser.userData._id);
            //             axios.post('https://school.kutubee.com:4000/user/getProgress', formData2)
            //                 .then(res => {
            //                     message = {
            //                         userProgress: res.data
            //                     }
            //                     this.props.dispatch({ type: "GET_USER_PROGRESS", message });

            //                     var readBooks = 0
            //                     var finishedBooks = []
            //                     res.data.forEach(bookData => {
            //                         if (bookData.data.studentModeFinished || bookData.data.originalModeFinished) {
            //                             readBooks += 1
            //                             finishedBooks.push(bookData)
            //                         }
            //                     });
            //                     message = {
            //                         badgeType: 'badgeTask_1',
            //                         data: {
            //                             readBooks: readBooks,
            //                             finishedBooks: finishedBooks
            //                         }
            //                     }
            //                     this.props.dispatch({ type: "CHECK_BADGES", message });
            //                 })
            //         })
            setBookEnd(true)

        }

    }
    const toggleBookMenu = () => {
        setShowBookMenu(!showBookMenu)
    }
    const toggleText = () => {
        if (userType != 'individual') {
            if (bookData.bookSource != 'reflowable') {
                sendMessage(JSON.stringify({ message: 'textMode' }))
                setTextMode(!textMode)
                setSelectionPopupHaveShareBtn(false)
                setShowColorPopup(false)
                // this.setState({
                //   textMode: !this.state.textMode,
                //   showMenu: false,
                //   selectionPopupHaveShareBtn: false,
                //   showColorPopup: false,
                // });
            }
        }
    }
    const onMenuButtonPressed = (button) => {

        if (button == 'record') {
            toggleRecording()
        } else if (button == 'drawing') {
            toggleDrawing()
        }
    }
    const toggleVocabulary = () => {
        setVocabularyOpened(!vocabularyOpened)
    }
    const toggleDrawing = () => {
        sendMessage(JSON.stringify({ message: 'showSvg' }))
        toggleText()
        setDrawing(!drawing)
        setSelectionPopupHaveShareBtn(false)
        setShowColorPopup(false)
    }
    const onMessageReceivedFromIframe = React.useCallback(event => {
        if (event.origin !== "https://school.kutubee.com:4000")
            return

        let message = JSON.parse(event.data);
        console.log('message', message)
        if (message.message == 'finishDrawing') {
            console.log('messssssssaaaaage', message)
            setSelectedPolygonId(message.data.polygon.id)
            setSelectedPolygonHtml(message.data.polygon.html)

            let polygonPage = message.data.polygon.page
            let bookMediaTmp = bookMedia
            if (currentPage == 0) {
                if (polygonPage == 1) {
                    bookMediaTmp.pages[currentPage].drawings.push({ polygonId: message.data.polygon.id, polygonHtml: message.data.polygon.html, audioAttached: false })
                }
            } else if (currentPage == bookMediaTmp.pages.length - 1) {
                if (polygonPage == 1) {
                    bookMediaTmp.pages[currentPage].drawings.push({ polygonId: message.data.polygon.id, polygonHtml: message.data.polygon.html, audioAttached: false })
                }
            } else {
                if (currentPage % 2 != 0) {
                    if (polygonPage == 1) {
                        bookMediaTmp.pages[currentPage].drawings.push({ polygonId: message.data.polygon.id, polygonHtml: message.data.polygon.html, audioAttached: false })
                    } else if (polygonPage == 2) {
                        if (bookMediaTmp.pages[currentPage + 1] != undefined) {
                            bookMediaTmp.pages[currentPage + 1].drawings.push({ polygonId: message.data.polygon.id, polygonHtml: message.data.polygon.html, audioAttached: false })
                        }
                    }
                } else {
                    if (polygonPage == 1) {
                        bookMediaTmp.pages[currentPage - 1].drawings.push({ polygonId: message.data.polygon.id, polygonHtml: message.data.polygon.html, audioAttached: false })
                    } else if (polygonPage == 2) {
                        if (bookMediaTmp.pages[currentPage] != undefined) {
                            bookMediaTmp.pages[currentPage].drawings.push({ polygonId: message.data.polygon.id, polygonHtml: message.data.polygon.html, audioAttached: false })
                        }
                    }
                }
            }
            saveBookMedia(bookMedia, 'addDrawing')
            setBookMedia({ ...bookMediaTmp })
        } else if (message.message == 'showSelectionMenu') {
            if (mode == 'student') {
                if (message.data.type == 'polygon') {
                    var popup = {}
                    popup.arrow = 'bottom'
                    if (message.data.x <= 0) {
                        popup.x = 0
                    } else {
                        popup.x = (message.data.x - 63) + (message.data.width / 2)
                    }

                    if (message.data.y - 60 <= message.data.pageTop) {
                        popup.y = message.data.pageTop
                    } else {
                        if (currentOrientation == 'portrait') {
                            popup.y = message.data.y
                        } else {

                            popup.y = message.data.y - 60 <= 0 ? 0 : message.data.y - 60
                        }
                    }
                    if (message.data.audioAttached == true) {
                        popup.x = (message.data.x - 63) + (message.data.width / 2)
                        setSelectionPopupHavePlayBtn(true)
                        // this.setState({
                        //     selectionPopupHavePlayBtn: true
                        // })
                    } else if (message.data.audioAttached == false) {
                        setSelectionPopupHavePlayBtn(false)
                        if (message.data.shared) {
                            setSelectionPopupShareBtnEnable(false)
                        } else {
                            setSelectionPopupShareBtnEnable(true)
                        }
                        // this.setState({
                        //     selectionPopupHavePlayBtn: false,
                        // })
                        // if (Platform.OS == 'ios') {
                        //     setRecordingStatus('notStarted')
                        // }
                    }
                    console.log('ahmaad', message.data.y, message.data.pageTop, { popup })
                    setPopup(popup)
                    setShowSelectionPopup(true)
                    setShowColorPopup(true)
                    setPopupType(message.data.type)
                    // this.setState({
                    //     popup: popup,
                    //     showSelectionPopup: true,
                    //     popupType: message.data.type,
                    // })
                    if (message.data.polygonId != undefined) {
                        // alert('aleeeeeeeeeeert' + message.data.polygonId)
                        setSelectedPolygonId(message.data.polygonId)
                        setSelectedPolygonPage(message.data.page)
                    }
                } else {
                    console.log('oooooooooooooooooooooooooooooooo')
                    if (message.data.highlightId != undefined) {
                        if (message.data.type == 'text') {

                            setSelectedHighlightId(message.data.highlightId)
                            setSelectedHighlightPage(message.data.page)
                            setSelectionPopupHaveShareBtn(true)
                            setShowColorPopup(true)
                            setVocabularyShared(false)

                            let selectedHighlight, highlightPage;
                            highlightPage = message.data.page;
                            if (currentPage == 0) {
                                if (highlightPage == 1) {
                                    selectedHighlight = book.pages[currentPage].highlights.find(highlight => {
                                        return highlight.highlightId == message.data.highlightId
                                    })
                                }
                            } else if (currentPage == book.pages.length - 1) {
                                if (highlightPage == 1) {
                                    selectedHighlight = book.pages[currentPage].highlights.find(highlight => {
                                        return highlight.highlightId == message.data.highlightId
                                    })
                                }
                            } else {
                                if (currentPage % 2 != 0) {
                                    if (highlightPage == 1) {
                                        selectedHighlight = book.pages[currentPage].highlights.find(highlight => {
                                            return highlight.highlightId == message.data.highlightId
                                        })
                                    } else if (highlightPage == 2) {
                                        if (book.pages[currentPage + 1] != undefined) {
                                            selectedHighlight = book.pages[currentPage + 1].highlights.find(highlight => {
                                                return highlight.highlightId == message.data.highlightId
                                            })
                                        }
                                    }
                                } else {
                                    console.log(highlightPage, 'highlgihtasd')
                                    if (highlightPage == 1) {
                                        selectedHighlight = book.pages[currentPage - 1].highlights.find(highlight => {
                                            return highlight.highlightId == message.data.highlightId
                                        })
                                    } else if (highlightPage == 2) {
                                        if (book.pages[currentPage] != undefined) {
                                            selectedHighlight = book.pages[currentPage].highlights.find(highlight => {
                                                return highlight.highlightId == message.data.highlightId
                                            })
                                        }
                                    }
                                }
                            }
                            if (selectedHighlight?.shared == false) {
                                setSelectionPopupShareBtnEnable(true)
                                setEnableVocabulary(true)
                                setEnableHighlight(true)
                            } else {
                                setSelectionPopupShareBtnEnable(false)
                                setEnableVocabulary(false)
                                setEnableHighlight(true)
                                // this.setState({
                                //     selectionPopupShareBtnEnable: false,
                                //     enableVocabulary: false,
                                //     enableHighlight: true
                                // })
                            }
                        } else if (message.data.type == 'vocabulary') {
                            console.log('vocaaaaaaaa')
                            setSelectedHighlightId(message.data.highlightId)
                            setSelectedHighlightPage(message.data.page)
                            setShowColorPopup(true)

                            let bookMediaTmp = bookMedia;
                            let selectedHighlight, highlightPage;
                            highlightPage = message.data.page;
                            if (currentPage == 0) {
                                if (highlightPage == 1) {
                                    selectedHighlight = bookMediaTmp.pages[currentPage].vocabularies.find(highlight => {
                                        return highlight.highlightId == message.data.highlightId
                                    })
                                }
                            } else if (currentPage == bookMediaTmp.pages.length - 1) {
                                if (highlightPage == 1) {
                                    selectedHighlight = bookMediaTmp.pages[currentPage].vocabularies.find(highlight => {
                                        return highlight.highlightId == message.data.highlightId
                                    })
                                }
                            } else {
                                if (currentPage % 2 != 0) {
                                    if (highlightPage == 1) {
                                        selectedHighlight = bookMediaTmp.pages[currentPage].vocabularies.find(highlight => {
                                            return highlight.highlightId == message.data.highlightId
                                        })
                                    } else if (highlightPage == 2) {
                                        if (bookMediaTmp.pages[currentPage + 1] != undefined) {
                                            selectedHighlight = bookMediaTmp.pages[currentPage + 1].vocabularies.find(highlight => {
                                                return highlight.highlightId == message.data.highlightId
                                            })
                                        }
                                    }
                                } else {
                                    console.log(highlightPage, 'highlgihtasd')
                                    if (highlightPage == 1) {
                                        selectedHighlight = bookMediaTmp.pages[currentPage - 1].vocabularies.find(highlight => {
                                            return highlight.highlightId == message.data.highlightId
                                        })
                                    } else if (highlightPage == 2) {
                                        if (bookMediaTmp.pages[currentPage] != undefined) {
                                            selectedHighlight = bookMediaTmp.pages[currentPage].vocabularies.find(highlight => {
                                                return highlight.highlightId == message.data.highlightId
                                            })
                                        }
                                    }
                                }
                            }
                            console.log('selectedHighlight.shared', selectedHighlight)
                            if (selectedHighlight.shared == true) {
                                setSelectionPopupShareBtnEnable(false)
                                setEnableHighlight(false)
                                setEnableVocabulary(true)
                                setVocabularyShared(true)
                            } else {
                                setSelectionPopupShareBtnEnable(true)

                                setEnableHighlight(false)
                                setEnableVocabulary(true)
                                setVocabularyShared(false)
                            }
                            setShowVocabularies(true)
                        }

                    } else {

                        if (showColorPopup != true) {
                            // ReactNativeHapticFeedback.trigger("selection", hapticOptions)
                            // console.log('sssssssssssssssssssssss', ReactNativeHapticFeedback)
                        }
                        console.log('ssssssssshighlight', message)
                        console.log('yes');
                        let showVocabularies = true
                        if (message.data.textString.trim().includes(' ') || message.data.textString.trim().includes('↵')) {
                            console.log('there is a spaaaaace')
                            showVocabularies = false
                        } else {
                            console.log('no spaaaaace')
                        }
                        console.log('showVocabularies', showVocabularies)
                        setShowColorPopup(true)
                        setShowVocabularies(showVocabularies)
                        setShowSelectionPopup(false)
                        setSelectionPopupShareBtnEnable(true)
                        setCurrentSelectedText(message.data.textString)
                        setVocabularyShared(false)
                        setEnableVocabulary(true)
                        setEnableHighlight(true)

                    }
                    if (message.data.audioAttached != undefined) {
                        setSelectionPopupHavePlayBtn(true)
                    }
                    var popup = {}
                    popup.arrow = 'bottom'
                    if (message.data.x <= 0) {
                        popup.x = 0
                    } else {
                        popup.x = (message.data.x - 63) + (message.data.width / 2)
                        if (popup.x <= 0) {
                            popup.x = 0
                        }
                        if (message.data.y + message.data.height + 78 >= (parseInt(bookData.pageHeight) + message.data.pageTop)) {
                            if (message.data.y - 60 <= 0) {
                                popup.y = message.data.y + 10 + message.data.height
                                popup.arrow = 'top'
                            } else {
                                popup.y = message.data.y - 60
                            }


                        } else {
                            popup.y = message.data.y + message.data.height

                            popup.arrow = 'top'
                        }
                    }
                    console.log('popup showColorPopup', bookData)
                    setPopup(popup)
                    setPopupType(message.data.type)
                    setSelectionPopupHavePlayBtn(false)
                }
            }
        } else if (message.message == 'hideSelectionMenu') {
            setShowSelectionPopup(false)
            setShowColorPopup(false)
            setSelectedHighlightId('')
            setSelectionPopupHaveShareBtn(false)
            setSelectionPopupHavePlayBtn(false)
            setPolygonAudio(null)
            // this.setState({
            //     showSelectionPopup: false,
            //     selectionPopupHavePlayBtn: false,
            //     selectedHighlightId: '',
            //     selectionPopupHaveShareBtn: false,
            //     showColorPopup: false,
            // })
        } else if (message.message == 'newTextHighlight') {
            if (message.data.highlightType == 'highlight') {
                // console.log('aaaaaaaaaahmad', message)
                let highlightPage = message.data.page;
                let bookMediaTmp = bookMedia
                if (currentPage == 0) {
                    if (highlightPage == 1) {

                        bookMediaTmp.pages[currentPage].highlights.push(
                            {
                                textString: message.data.textString,
                                highlightId: message.data.highlightId,
                                highlightHtml: message.data.highlightHtml,
                                highlightBackendId: message.data.highlightId + '-' + currentPage,
                                shared: false,
                                sharedDate: null,
                                saveDate: moment().format('D.MM.YYYY'),
                                audioAttached: false,
                                color: message.data.color
                            }
                        )
                    }
                } else if (currentPage == book.pages.length - 1) {
                    if (highlightPage == 1) {

                        bookMedia.pages[currentPage].highlights.push(
                            {
                                textString: message.data.textString,
                                highlightId: message.data.highlightId,
                                highlightHtml: message.data.highlightHtml,
                                highlightBackendId: message.data.highlightId + '-' + currentPage,
                                shared: false,
                                sharedDate: null,
                                saveDate: moment().format('D.MM.YYYY'),
                                audioAttached: false,
                                color: message.data.color
                            }
                        );
                    }
                } else {
                    if (currentPage % 2 != 0) {
                        if (highlightPage == 1) {

                            bookMedia.pages[currentPage].highlights.push(
                                {
                                    textString: message.data.textString,
                                    highlightId: message.data.highlightId,
                                    highlightHtml: message.data.highlightHtml,
                                    highlightBackendId: message.data.highlightId + '-' + currentPage,
                                    shared: false,
                                    sharedDate: null,
                                    saveDate: moment().format('D.MM.YYYY'),
                                    audioAttached: false,
                                    color: message.data.color
                                }
                            )
                        } else if (highlightPage == 2) {
                            if (bookMedia.pages[currentPage + 1] != undefined) {
                                bookMedia.pages[currentPage + 1].highlights.push(
                                    {
                                        textString: message.data.textString,
                                        highlightId: message.data.highlightId,
                                        highlightHtml: message.data.highlightHtml,
                                        highlightBackendId: message.data.highlightId + '-' + currentPage,
                                        shared: false,
                                        sharedDate: null,
                                        saveDate: moment().format('D.MM.YYYY'),
                                        audioAttached: false,
                                        color: message.data.color
                                    }
                                )
                            }
                        }
                    } else {
                        if (highlightPage == 1) {

                            bookMedia.pages[currentPage - 1].highlights.push(
                                {
                                    textString: message.data.textString,
                                    highlightId: message.data.highlightId,
                                    highlightHtml: message.data.highlightHtml,
                                    highlightBackendId: message.data.highlightId + '-' + currentPage,
                                    shared: false,
                                    sharedDate: null,
                                    saveDate: moment().format('D.MM.YYYY'),
                                    audioAttached: false,
                                    color: message.data.color
                                }
                            )
                        } else if (highlightPage == 2) {
                            if (bookMedia.pages[currentPage] != undefined) {
                                bookMedia.pages[currentPage].highlights.push(
                                    {
                                        textString: message.data.textString,
                                        highlightId: message.data.highlightId,
                                        highlightHtml: message.data.highlightHtml,
                                        highlightBackendId: message.data.highlightId + '-' + currentPage,
                                        shared: false,
                                        sharedDate: null,
                                        saveDate: moment().format('D.MM.YYYY'),
                                        audioAttached: false,
                                        color: message.data.color
                                    }
                                )
                            }
                        }
                    }
                }
                setSelectedHighlightId(message.data.highlightId)
                setBookMedia({ ...bookMediaTmp })
                setSelectedHighlightPage(message.data.page)
                setSelectionPopupHaveShareBtn(true)
                setSelectionPopupShareBtnEnable(true)
                setEnableVocabulary(false)
                setShowColorPopup(true)
                saveBookMedia(bookMediaTmp, 'highlight');
                _shareHighlight(bookMediaTmp, message.data.highlightId)
            } else if (message.data.highlightType == 'vocabulary') {
                let bookMediaTmp = bookMedia
                let highlightPage = message.data.page;
                let newVocabularyIndex = 0;
                if (currentPage == 0) {
                    if (highlightPage == 1) {
                        highlightPage = currentPage


                    }
                } else if (currentPage == bookMediaTmp.pages.length - 1) {
                    if (highlightPage == 1) {
                        highlightPage = currentPage

                    }
                } else {
                    if (currentPage % 2 != 0) {
                        if (highlightPage == 1) {
                            highlightPage = currentPage
                        } else if (highlightPage == 2) {

                            if (bookMediaTmp.pages[currentPage + 1] != undefined) {
                                highlightPage = currentPage + 1

                            }
                        }
                    } else {
                        if (highlightPage == 1) {
                            highlightPage = currentPage - 1
                        } else if (highlightPage == 2) {
                            if (bookMediaTmp.pages[currentPage] != undefined) {
                                highlightPage = currentPage
                            }
                        }
                    }
                }
                setSelectedHighlightId(message.data.highlightId)

                setSelectedHighlightId(message.data.highlightId)
                setSelectedHighlightPage(message.data.page)
                setVocabularyShared(false)
                setShowColorPopup(true)

                sendMessage(JSON.stringify({ message: 'clearSelection' }))
                let getVocaIndex = bookMediaTmp.pages[highlightPage].vocabularies.find(vocabulary => {
                    console.log('mmmmm', vocabulary.highlightId, message.data.highlightId)
                    return vocabulary.highlightId == message.data.highlightId
                })
                console.log('ooooooooooooooooooooooooooooooooooooooooooooooo')
                console.log({ getVocaIndex, sssss: message.data.highlightId })
                console.log('ooooooooooooooooooooooooooooooooooooooooooooooo')
                bookMediaTmp.pages[highlightPage].vocabularies.push(
                    {
                        textString: message.data.textString,
                        withHighlight: true,
                        highlightId: message.data.highlightId,
                        highlightBackendId: message.data.highlightId + '-' + highlightPage,
                        highlightHtml: message.data.highlightHtml,
                        saveDate: moment().format('D.MM.YYYY'),
                        audioAttached: false,
                        color: message.data.color,
                        definition: vocabularyData.definition,
                        sentence: vocabularyData.sentence,
                        vocabularyText: vocabularyData.vocabularyText,
                        selectVocabularyType: vocabularyData.wordType == 0 ? 'noun' : vocabularyData.wordType == 1 ? 'verb' : 'letter',
                        shared: true,
                        sharedDate: moment().format('D.MM.YYYY'),
                    }
                )

                const formData = new FormData();
                formData.append('user_id', userId);
                formData.append('vocabulary_type', vocabularyData.wordType == 0 ? 'noun' : vocabularyData.wordType == 1 ? 'verb' : 'letter');
                formData.append('book_id', bookId);
                formData.append('definition', vocabularyData.definition);
                formData.append('sentence', vocabularyData.sentence);
                formData.append('vocabulary_id', message.data.highlightId + '-' + highlightPage);
                formData.append('vocabulary_text', vocabularyData.vocabularyText)

                setVocabularyShared(true)
                setEnableHighlight(false)

                axios.post('https://school.kutubee.com:4000/share/dictionary/user', formData)
                    .then(res => {
                        console.log('highlight res', res, formData);
                        if (res.data.message == 'success') {
                            console.log('voca shared');
                            setBookMedia({ ...bookMediaTmp })
                            saveBookMedia(bookMediaTmp, 'vocabulary');
                            setSelectionPopupShareBtnEnable(false)

                            setSentMessageText(i18n.t('doneMessages.shareVocabulary', { lng: bookData.language }))
                            setOpenSentModal(true)
                        }
                    })
            }
        } else if (message.message == 'nextPagePlay') {
            console.log('neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeext')
            setTimeout(() => {
                _prevPage()
            }, 1000);
        } else if (message.message == 'playButtonFalse') {
            // this.setState({
            //     playForMeMode: false
            // })
            setPlayForMeMode(false)
        } else if (message.message == 'playPolygonAudio') {
            let polygonPage = message.data.page;
            let bookMediaTmp = bookMedia
            let currentPageNumber;
            if (currentOrientation == 'portrait') {
                currentPageNumber = currentPage
            } else if (currentOrientation == 'landscape') {
                if (currentPage == 0) {
                    currentPageNumber = currentPage
                } else if (currentPage == book.pages.length - 1) {
                    if (currentPage % 2 != 0) {
                        if (polygonPage == 1) {
                            currentPageNumber = currentPage
                        } else {
                            currentPageNumber = currentPage + 1
                        }
                    } else {
                        currentPageNumber = currentPage
                    }
                } else {
                    if (currentPage % 2 != 0) {
                        if (polygonPage == 1) {
                            currentPageNumber = currentPage
                        } else {
                            currentPageNumber = currentPage + 1
                        }
                    } else {
                        if (polygonPage == 1) {
                            currentPageNumber = currentPage - 1
                        } else {
                            currentPageNumber = currentPage
                        }
                    }
                }
            }
            let records = bookMediaTmp.pages[currentPageNumber].drawings
            let pressedRecord = records.find((record) => {
                if (record.polygonId != undefined) {
                    return record.polygonId == message.data.polygonId
                }

            })
            setPolygonAudio({ ...pressedRecord })
            setSelectionPopupHavePlayBtn(true)
            if (pressedRecord.shared) {
                setSelectionPopupShareBtnEnable(false)
            } else {
                setSelectionPopupShareBtnEnable(true)
            }
            // this._playAttachedAudio(pressedRecord.url)
        }
    }, [book, bookData, currentPage, bookMedia, selectedPolygonId, vocabularyData]);
    const _shareHighlight = (bookMediaTmp, highlightId) => {
        let currentPageNumber;
        if (currentPage == 0) {
            currentPageNumber = currentPage
        } else if (currentPage == bookMediaTmp.pages.length - 1) {
            if (currentPage % 2 != 0) {
                if (selectedHighlightPage == 1) {
                    currentPageNumber = currentPage
                } else {
                    currentPageNumber = currentPage + 1
                }
            } else {
                currentPageNumber = currentPage
            }
        } else {
            if (currentPage % 2 != 0) {
                if (selectedHighlightPage == 1) {
                    currentPageNumber = currentPage
                } else {
                    currentPageNumber = currentPage + 1
                }
            } else {
                if (selectedHighlightPage == 1) {
                    currentPageNumber = currentPage - 1
                } else {
                    currentPageNumber = currentPage
                }
            }
        }
        console.log('rrrrrrrrrrrrrrrrrrrr', bookMediaTmp.pages[currentPageNumber].highlights, 'currentPageNumber', currentPageNumber, highlightId)
        let selcectedHighlightData = bookMediaTmp.pages[currentPageNumber].highlights.find(highlight => highlight.highlightId == highlightId);
        console.log(currentPageNumber, 'this.state.selectedHighlightPage', selectedHighlightPage, bookMediaTmp.pages, currentPageNumber)

        // this.setState({
        //     shareHighlightLoader: 'sending'
        // })
        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('color', selcectedHighlightData.color);
        formData.append('text_highlight', selcectedHighlightData.textString);
        formData.append('page_no', currentPage + 1);
        formData.append('book_id', bookId);
        formData.append('shareType', 'text_highlight');
        // // console.log(formData);
        axios.post('https://school.kutubee.com:4000/share/user', formData)
            .then(res => {
                console.log("highlightshared", res.data, formData);
                if (res.data.message == 'success') {
                    bookMediaTmp.pages[currentPageNumber].highlights.map(highlight => {
                        if (highlight.highlightId == highlightId) {
                            highlight.shared = true;
                            highlight.sharedDate = moment().format('D.MM.YYYY');
                        }
                    });
                    saveBookMedia(bookMediaTmp, 'highlight');
                    setBookMedia({ ...bookMediaTmp })
                    setSelectionPopupShareBtnEnable(false)
                    setSentMessageText(i18n.t('doneMessages.shareHighlight', { lng: bookData.language }))
                    setOpenSentModal(true)
                }
            })
    }
    const onZoomChange = (e) => {
        // console.log('onZoomChange',e)
        console.log('onZoomChange', e)
        zoomRef.current.centerView(1 + (e * 0.2))
        setCurrentZoom(e)
    }
    const onPlayforMePressed = () => {
        if (playForMeMode) {
            sendMessage(JSON.stringify({ message: 'pausePlay' }));
            setPlayForMeMode(false)
        } else {
            sendMessage(JSON.stringify({ message: 'play' }));
            setPlayForMeMode(true)
        }
    }
    const onZoomIn = () => {
        if (currentZoom < 4) {
            zoomRef.current.centerView(1 + ((currentZoom + 1) * 0.2))
            setCurrentZoom(currentZoom + 1)
        }

    }
    const onZoomOut = () => {
        if (currentZoom > 0) {
            zoomRef.current.centerView(1 + ((currentZoom - 1) * 0.2))
            setCurrentZoom(currentZoom - 1)
        }

    }
    const addNewHighlight = () => {
        if (bookData.bookSource != 'reflowable') {
            sendMessage(JSON.stringify({ message: 'highlight', color: 'yellow', type: 'highlight' }))
            // highlightSheetShareRef.dismiss()


        } else {
            // if (currentCfi != null) {
            //     let currentTime = Math.floor(Date.now() / 1000)
            //     reflowableRef.rendition.highlight('yellow')
            // }
        }

    }
    const toggleNote = () => {
        setNoteOpened(!noteOpened)
        if (drawing) {
            toggleDrawing()
        }
    }
    const onNoteClose = () => {
        setNoteOpened(!noteOpened)
    }
    const onAddtionsClose = () => {
        setAddtionsOpened(!additionsOpened)
    }
    const saveBookMedia = (bm, type) => {
        console.log('sdasdasdasd', bm)
        bm.mainRecord = {}
        bm.pages[currentPage].drawings.forEach((drawing, index) => {
            // if(drawing.audioAttached && (type != 'addDrawing' || type != 'addDrawing')){
            delete drawing.record
            delete drawing.saveDate
            delete drawing.sharedDate
            delete drawing.shared
            delete drawing.duration
            drawing.audioAttached = false
            // }
        })
        localStorage.setItem(userId + '_' + bookId, JSON.stringify(bm))

    }
    const onSaveNote = () => {
        saveBookMedia(bookMedia, 'note')
        toggleNote()
    }
    const onShareNote = () => {



        let bookMediaTmp = bookMedia
        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('book_id', bookId);
        formData.append('note', bookMediaTmp.mainNote.text);
        formData.append('shareType', 'book_note');

        // openLoadingBox(this.props.componentId, I18t.t('loadingBox.note'));
        axios.post('https://school.kutubee.com:4000/share/user', formData)
            .then(res => {
                bookMediaTmp.mainNote = {
                    shared: true,
                    sharedDate: moment().format('D.MM.YYYY'),
                    saveDate: moment().format('D.MM.YYYY'),
                    text: bookMediaTmp.mainNote.text,
                }
                setBookMedia({ ...bookMediaTmp })
                saveBookMedia(bookMedia, 'note')
                toggleNote()
                setSentMessageText(i18n.t('doneMessages.shareNote', { lng: bookData.language }))
                setOpenSentModal(true)
            })
    }
    const onNoteTextChange = (text) => {
        console.log('lllll', bookMedia.mainNote)
        let bookMediaTmp = bookMedia
        bookMediaTmp.mainNote.text = text.target.value
        setBookMedia({ ...bookMediaTmp })
    }
    const stopMainRecorder = (audioLink, audioChunks) => {
        const audioBlob = audioChunks;
        // const audio = new Audio(audioUrl);

        // return null
        var reader = new window.FileReader();
        var base64MainAudio;
        reader.readAsDataURL(audioBlob);
        reader.onloadend = function () {
            base64MainAudio = reader.result;
            base64MainAudio = base64MainAudio.split(',')[1];
            let bookTmp = book;
            // bookStorageData.mainRecord = 'data:audio/ogg;base64,'+base64MainAudio
            let bookMediaTmp = bookMedia;
            // let bookStorageData = JSON.parse(bookMediaTmp)
            console.log('ahmaaaaad222', bookMediaTmp, bookMedia)
            if (isSafari) {
                bookMediaTmp.mainRecord = {
                    record: 'data:audio/wav;base64,' + base64MainAudio,
                    recordLink: audioLink,
                    shared: false,
                    sharedDate: null,
                    saveDate: moment().format('D.MM.YYYY'),
                    duration:0
                    //duration: self.state.currentTime
                }
            } else {
                bookMediaTmp.mainRecord = {
                    record: 'data:audio/ogg;base64,' + base64MainAudio,
                    recordLink: audioLink,
                    shared: false,
                    sharedDate: null,
                    saveDate: moment().format('D.MM.YYYY'),
                    duration: 0
                }
            }


            // localStorage.setItem(self.props.router.query.bookId,JSON.stringify(bookStorageData));
            console.log('-----------------------')
            console.log('bookStorageData.mainRecord', bookMediaTmp)
            console.log('-----------------------')
            setBookMedia({ ...bookMediaTmp })
            setMainRecordExist('mainFileExist')
            // self.setState({
            //     book,
            //     bookMedia: bookStorageData,
            //     showMainRecorder: false,
            //     mainRecordExist: 'mainFileExist'
            // })

        }
    }
    const toggleRecording = () => {
        toggleBookMenu()
        setRecordingMode(!recordingMode)
    }
    const deleteHighlight = () => {
        sendMessage(JSON.stringify({ message: 'removeHighlight', highlightId: selectedHighlightId }));
        let bookMediaTmp = bookMedia
        let self = this
        let currentPageNumber;
        if (currentPage == 0) {
            currentPageNumber = currentPage
        } else if (currentPage == bookMediaTmp.pages.length - 1) {
            if (currentPage % 2 != 0) {
                if (selectedHighlightPage == 1) {
                    currentPageNumber = currentPage
                } else {
                    currentPageNumber = currentPage + 1
                }
            } else {
                currentPageNumber = currentPage
            }
        } else {
            if (currentPage % 2 != 0) {
                if (selectedHighlightPage == 1) {
                    currentPageNumber = currentPage
                } else {
                    currentPageNumber = currentPage + 1
                }
            } else {
                if (selectedHighlightPage == 1) {
                    currentPageNumber = currentPage - 1
                } else {
                    currentPageNumber = currentPage
                }
            }
        }
        let highlightIndex = bookMediaTmp.pages[currentPageNumber].highlights.findIndex(function (highlight) {
            return highlight.highlightId == selectedHighlightId
        })

        bookMediaTmp.pages[currentPageNumber].highlights.splice(highlightIndex, 1)

        setBookMedia({ ...bookMediaTmp })
        setShowColorPopup(false)
        setSelectedHighlightId('')
        saveBookMedia(bookMediaTmp, 'sss')
    }
    const onShareHighlight = () => {
        console.log('share highlight');
        console.log('selectionPopupShareBtnEnable', selectionPopupShareBtnEnable)
        if (selectionPopupShareBtnEnable) {
            console.log('aaaaad new highlight')
            setConfirmationMessageText(i18n.t('bookComponent.shareHighlight', { lng: bookData.language }))
            setConfirmationType('shareHighlight')
            setOpenConfirmationModal(true)
            // addNewHighlight()
            // highlightSheetShareRef.present()
        } else {

            setConfirmationMessageText(i18n.t('bookComponent.deleteHighlight', { lng: bookData.language }))
            setConfirmationType('deleteHighlight')
            setOpenConfirmationModal(true)
            // highlightSheetDeleteRef.present()
        }
        // highlightSheetShareRef.present()
    }
    const onDeleteMainRecord = () => {
        let bookMediaTmp = bookMedia
        bookMediaTmp.mainRecord = {}
        setMainRecordExist(false)
        setBookMedia({ ...bookMediaTmp })
        localStorage.setItem(userId + '_' + bookId, JSON.stringify(bookMediaTmp))
    }

    const dataURLtoFile = (dataurl, filename) => {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

    const onShareMainAudio = () => {
        let bookMediaTmp = bookMedia;
        let audioBase64 = bookMedia.mainRecord.record

        let file1 = dataURLtoFile(audioBase64,"audio.ogg");

        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('book_id', bookId);
        formData.append('audioData', file1);
        formData.append('s3', true);

        formData.append('shareType', 'book_audio');
        // if (isSafari) {
        // formData.append('type', 'wav');
        //   } else {
        formData.append('type', 'ogg');


        setPreloadPopup(true);
        
        axios.post('https://school.kutubee.com:4000/share/user', formData)
            .then(res => {
                console.log('audio sent', res.data);
                if (res.data.message == 'success') {
                    bookMedia.mainRecord.shared = true
                    bookMedia.mainRecord.sharedDate = moment().format('D.MM.YYYY')
                    // if (res.data.pointIncrease.increase) {
                    //     dispatch({ type: 'POINTS_EARNED', message: { pointIncrease: res.data.pointIncrease } })
                    // }
                    setBookMedia({ ...bookMedia })
                    setSentMessageText(i18n.t('doneMessages.shareAudio', { lng: bookData.language }))

                    setTimeout(() => {
                        setPreloadPopup(false);
                        setOpenSentModal(true)
    
                    }, 3000);

                }
            })
    }
    const onVocabulariesClose = () => {
        toggleVocabulary()
    }
    const onAddVocabulary = (wordType, definition, sentence, vocabularyText) => {

        setVocabularyOpened(false)
        sendMessage(JSON.stringify({ message: 'highlight', color: 'blue', type: 'vocabulary' }))
    }
    const calculateTimeSpent = () => {
        let minSeconds, hourSeconds, daySeconds;
        daySeconds = days * 86400;
        hourSeconds = hours * 3600
        minSeconds = minutes * 60

        return daySeconds + hourSeconds + minSeconds + seconds
    }
    const deletePolygon = () => {
        sendMessage(JSON.stringify({ message: 'removeSvg', polygonId: selectedPolygonId }))

        let bookMediaTmp = bookMedia
        let currentPageNumber;
        if (currentOrientation == 'portrait') {
            currentPageNumber = currentPage
        } else if (currentOrientation == 'landscape') {
            if (currentPage == 0) {
                currentPageNumber = currentPage
            } else if (currentPage == bookMediaTmp.pages.length - 1) {
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
        let drawingIndex = bookMediaTmp.pages[currentPageNumber].drawings.findIndex(function (drawing) {
            return drawing.polygonId == selectedPolygonId
        })

        bookMediaTmp.pages[currentPageNumber].drawings.splice(drawingIndex, 1)
        saveBookMedia(bookMedia, 'deleteDrawing')
        // if (this.drawingRecordPlayer != null && this.drawingRecordPlayer != undefined) {
        //     this.drawingRecordPlayer.pause();
        //     this.drawingRecordPlayer.currentTime = 0
        // }
        setBookMedia({ ...bookMediaTmp })
        setShowColorPopup(false)
    }
    const savePolygonAudio = () => {
        let bookMediaTmp = bookMedia;
        // bookMedia.pages[currentPageNumber].drawings
        let drawingIndex = bookMediaTmp.pages[currentPageNumber].drawings.findIndex(drawing => {
            return drawing.polygonId == selectedPolygonId
        })
        console.log('drawingIndex', drawingIndex)
        if (drawingIndex != -1) {

            if (isSafari) {
                bookMedia.pages[currentPageNumber].drawings[drawingIndex] = {
                    ...bookMedia.pages[currentPageNumber].drawings[drawingIndex],
                    record: 'data:audio/wav;base64,' + base64MainAudio,
                    shared: false,
                    sharedDate: null,
                    audioAttached: true,
                    saveDate: moment().format('D.MM.YYYY'),
                    duration: self.state.drawingCurrentTime
                }
            } else {
                bookMediaTmp.pages[currentPageNumber].drawings[drawingIndex] = {
                    ...bookMediaTmp.pages[currentPageNumber].drawings[drawingIndex],
                    record: 'data:audio/ogg;base64,' + base64MainAudio,
                    shared: false,
                    sharedDate: null,
                    audioAttached: true,
                    saveDate: moment().format('D.MM.YYYY'),
                    duration: self.state.drawingCurrentTime
                }
            }

            // self.saveBookMedia(bookMedia)
            setBookMedia({ ...bookMediaTmp })
            setSelectionPopupHaveShareBtn(true)
            setSelectionPopupShareBtnEnable(true)
            setSelectionPopupHavePlayBtn(true)

            sendMessage(JSON.stringify({ message: 'addPolygonAudioClass', polygonId: selectedPolygonId }))
        }

    }
    const stopDrawingRecorder = (url, audioChunks, currentPageNumber,) => {
        const audioBlob = audioChunks;
        // const audio = new Audio(audioUrl);

        // return null
        var reader = new window.FileReader();
        var base64MainAudio;
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
            base64MainAudio = reader.result;
            base64MainAudio = base64MainAudio.split(',')[1];
            let bookTmp = book;
            // bookStorageData.mainRecord = 'data:audio/ogg;base64,'+base64MainAudio
            let bookMediaTmp = bookMedia;


            let drawingIndex = bookMediaTmp.pages[currentPageNumber].drawings.findIndex(drawing => {
                return drawing.polygonId == selectedPolygonId
            })
            console.log('2222222222222222222222222222222222222222222222222222222')
            console.log('bookMediaTmp', drawingIndex)
            console.log('2222222222222222222222222222222222222222222222222222222')
            if (drawingIndex != -1) {
                if (isSafari) {
                    bookMedia.pages[currentPageNumber].drawings[drawingIndex] = {
                        ...bookMedia.pages[currentPageNumber].drawings[drawingIndex],
                        record: isSafari ? 'data:audio/wav;base64,' + base64MainAudio : 'data:audio/ogg;base64,' + base64MainAudio,
                        recordLink: url,
                        shared: false,
                        sharedDate: null,
                        audioAttached: true,
                        saveDate: moment().format('D.MM.YYYY'),
                        duration: self.state.drawingCurrentTime
                    }
                } else {

                    bookMediaTmp.pages[currentPageNumber].drawings[drawingIndex] = {
                        ...bookMediaTmp.pages[currentPageNumber].drawings[drawingIndex],
                        record: isSafari ? 'data:audio/wav;base64,' + base64MainAudio : 'data:audio/ogg;base64,' + base64MainAudio,
                        recordLink: url,
                        shared: false,
                        sharedDate: null,
                        audioAttached: true,
                        saveDate: moment().format('D.MM.YYYY'),
                        duration: 0
                    }
                    console.log('bookMediaTmp.pages[currentPageNumber].drawings[drawingIndex]', bookMediaTmp.pages[currentPageNumber].drawings[drawingIndex])
                }

                // self.saveBookMedia(bookMedia)
                setBookMedia({ ...bookMediaTmp })
                setRecordingStatus('notStarted')
                setSelectionPopupHaveShareBtn(true)
                setSelectionPopupShareBtnEnable(true)
                setSelectionPopupHavePlayBtn(true)
                sendMessage(JSON.stringify({ message: 'addPolygonAudioClass', polygonId: selectedPolygonId }))
                setSelectedPolygonPage(currentPageNumber)
                setPolygonAudio({
                    ...bookMediaTmp.pages[currentPageNumber].drawings[drawingIndex],
                    record: isSafari ? 'data:audio/wav;base64,' + base64MainAudio : 'data:audio/ogg;base64,' + base64MainAudio,
                    recordLink: url,
                    shared: false,
                    sharedDate: null,
                    audioAttached: true,
                    saveDate: moment().format('D.MM.YYYY'),
                    duration: 0
                })
            }

        }
    }
    const onPolygonShare = () => {
        let bookMediaTmp = bookMedia;
        let currentPageNumber = selectedPolygonPage;

        console.log({ polygonAudio, selectedPolygonPage, polygonRecord: polygonAudio.record })
        // return

        // if (drawingRecordSheetShareRef) {
        //     drawingRecordSheetShareRef.dismiss()
        // }


        let file1 = dataURLtoFile(polygonAudio.record,"audio.ogg");

        if (isSafari) {
            file1 = dataURLtoFile(polygonAudio.record,"audio.wav");
        }

        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('page_no', selectedPolygonPage + 1);
        formData.append('book_id', bookId);
        formData.append('audioData', file1);
        formData.append('shareType', 'drawing_audio');
        formData.append('s3', true);

        if (isSafari) {
            formData.append('type', 'wav');
        } else {
            formData.append('type', 'ogg');
        }

        setPreloadPopup(true);

        axios.post('https://school.kutubee.com:4000/share/user', formData)
            .then(res => {
                console.log('ddddddddddddddddddd', res.data, formData);
                if (res.data.message == 'success') {

                    // bookMediaTmp.pages[selectedPolygonPage].drawings.map(record => {
                    //     if (record.polygonId == selectedPolygonId) {
                    //         record.shared = true;
                    //         record.sharedDate = moment().format('D.MM.YYYY');
                    //     }
                    // });

                    let selectedDrawingIndex = bookMediaTmp.pages[selectedPolygonPage].drawings.findIndex((drawing) => {
                        return drawing.polygonId == selectedPolygonId
                    })
                    bookMediaTmp.pages[selectedPolygonPage].drawings[selectedDrawingIndex].audioAttached = true
                    bookMediaTmp.pages[selectedPolygonPage].drawings[selectedDrawingIndex].shared = true
                    bookMediaTmp.pages[selectedPolygonPage].drawings[selectedDrawingIndex].sharedDate = moment().format('D.MM.YYYY');
                    setBookMedia({ ...bookMediaTmp })
                    setSelectionPopupShareBtnEnable(false)

                    setSentMessageText(i18n.t('doneMessages.shareAudio', { lng: bookData.language }))

                    setTimeout(() => {
                        setPreloadPopup(false);
                        setOpenSentModal(true)
    
                    }, 3000);

                }
            })
    }
    const onOpenDrawingAudioShare = () => {
        setConfirmationMessageText(i18n.t('bookComponent.shareRecord', { lng: bookData.language }))
        setConfirmationType('shareDrawingAudio')
        setOpenConfirmationModal(true)
        // onPolygonShare()
    }
    const onBookEnd = (timer, mode) => {

        console.log({ timer, mode })
        let originalTime = originalReadingTimer
        let studentTime = studentReadingTimer

        if (currentMode == 'original') {
            originalTime = timer
        } else {
            studentTime = timer
        }

        let bookFinishedData = {
            bookId: bookId,
            studentModeTime: studentTime,
            originalModeTime: originalTime,
            pagesFlipped: bookPagesFlipped,
            pagesFlippedOriginal: bookPagesFlippedOriginal,
            studentModeFinished: studentModeFinished,
            originalModeFinished: originalModeFinished,
            minTimeSpent: bookData.minTimeSpent,
            quizOpened: quizOpened,
        }
        if (bookEndOnClose == false) {
            if (currentMode == 'student') {
                if (studentTime >= bookData.minTimeSpent) {
                    setStudentModeFinished(true)
                    bookFinishedData.studentModeFinished = true
                } else {
                    setStudentModeFinished(false)
                    bookFinishedData.studentModeFinished = false
                }
            }
            if (currentMode == 'original') {
                if (originalTime >= bookData.minTimeSpent) {
                    console.log("setOriginalModeFinished4")
                    setOriginalModeFinished(true)
                    bookFinishedData.originalModeFinished = true
                } else {
                    console.log("setOriginalModeFinished5")
                    setOriginalModeFinished(false)
                    bookFinishedData.originalModeFinished = false
                }
            }
            if (bookFinishedData.originalModeFinished || bookFinishedData.studentModeFinished) {
                setQuizOpened(true)
            }
            bookFinishedData.quizOpened = true
        }
        console.log('bookProgress.quizOpened = true', bookFinishedData)

        setBookFinishData(bookFinishedData)
        setShowBookFinish(true)
        setStudentReadingTimer(studentTime)
        setOriginalReadingTimer(originalTime)
        setBookLoaded(false)
    }
    const onReadAgain = () => {
        setShowBookFinish(false)
        setBookEnd(false)
        setBookLoaded(true)
        setBookProgressSaved(false)
        console.log('Read Again')
    }
    const toggleFont = () => {
        toggleBookMenu()
        setFontMode(!fontMode)
    }

    const onFontSizeChanged = (e) => {
        // setCurrentFontSize(e)
        // zoomRef.current.centerView(1 + ((currentZoom + 1) * 0.2))
        // let size = '16px';
        // if (e == 0) {
        //     size = '16px'
        // } else if (e == 1) {
        //     size = '18px'
        // } else if (e == 2) {
        //     size = '20px'
        // } else if (e == 3) {
        //     size = '22px'
        // } else if (e == 4) {
        //     size = '24px'
        // }
        // reflowableRendition.current.themes.fontSize(size)
        setCurrentFontSize(e)

    }

    const onIncreaseFontSize = () => {
        if (currentFontSize < 4) {
            // zoomRef.current.centerView(1 + ((currentZoom + 1) * 0.2))
            // let size = '16px';
            // if (currentFontSize == 0) {
            //     size = '16px'
            // } else if (currentFontSize == 1) {
            //     size = '18px'
            // } else if (currentFontSize == 2) {
            //     size = '20px'
            // } else if (currentFontSize == 3) {
            //     size = '22px'
            // } else if (currentFontSize == 4) {
            //     size = '24px'
            // }
            // reflowableRendition.current.themes.fontSize(size)
            setCurrentFontSize(currentFontSize + 1)

        }

    }
    const onDecreaseFontSize = () => {
        if (currentFontSize > 0) {
            // let size = '16px';
            // if (currentFontSize == 0) {
            //     size = '16px'
            // } else if (currentFontSize == 1) {
            //     size = '18px'
            // } else if (currentFontSize == 2) {
            //     size = '20px'
            // } else if (currentFontSize == 3) {
            //     size = '22px'
            // } else if (currentFontSize == 4) {
            //     size = '24px'
            // }
            // reflowableRendition.current.themes.fontSize(size)
            setCurrentFontSize(currentFontSize - 1)

        }

    }
    useEffect(() => {
        let size = '16px';
        if (currentFontSize == 0) {
            size = '16px'
        } else if (currentFontSize == 1) {
            size = '18px'
        } else if (currentFontSize == 2) {
            size = '20px'
        } else if (currentFontSize == 3) {
            size = '22px'
        } else if (currentFontSize == 4) {
            size = '24px'
        }
        if (reflowableRendition.current) {
            reflowableRendition.current.themes.fontSize(size)
        }

        // setCurrentFontSize(e)
        return () => {

        }
    }, [currentFontSize, reflowableRendition.current])
    const onDeleteVocabulary = () => {
        sendMessage(JSON.stringify({ message: 'removeHighlight', highlightId: selectedHighlightId }));
        let bookMediaTmp = bookMedia
        let currentPageNumber;
        if (currentPage == 0) {
            currentPageNumber = currentPage
        } else if (currentPage == bookMediaTmp.pages.length - 1) {
            if (currentPage % 2 != 0) {
                if (selectedHighlightPage == 1) {
                    currentPageNumber = currentPage
                } else {
                    currentPageNumber = currentPage + 1
                }
            } else {
                currentPageNumber = currentPage
            }
        } else {
            if (currentPage % 2 != 0) {
                if (selectedHighlightPage == 1) {
                    currentPageNumber = currentPage
                } else {
                    currentPageNumber = currentPage + 1
                }
            } else {
                if (selectedHighlightPage == 1) {
                    currentPageNumber = currentPage - 1
                } else {
                    currentPageNumber = currentPage
                }
            }
        }
        let highlightIndex = bookMediaTmp.pages[currentPageNumber].vocabularies.findIndex((highlight) => {
            return highlight.highlightId == selectedHighlightId
        })
        if (highlightIndex != -1) {
            console.log('highlightIndex',)
            let highlightBackendId = bookMediaTmp.pages[currentPageNumber].vocabularies[highlightIndex].highlightBackendId
            const formData = new FormData();
            formData.append('user_id', userId);
            formData.append('book_id', bookId);
            formData.append('vocabulary_id', highlightBackendId);

            axios.post('https://school.kutubee.com:4000/share/dictionary/delete', formData)
                .then(response => {
                    bookMediaTmp.pages[currentPageNumber].vocabularies.splice(highlightIndex, 1)
                    setBookMedia(bookMediaTmp)
                    saveBookMedia(bookMediaTmp, 'vocabulary')
                    setShowColorPopup(false)
                    setSelectedHighlightId('')
                })


            // })
        }
    }
    const onAfterSavingProgress = () => {
        setBookProgressSaved(true)
    }
    const onConfirmationYes = () => {
   
        if (confirmationType == 'shareHighlight') {
            setOpenConfirmationModal(false)
            addNewHighlight()

        } else if (confirmationType == 'deleteHighlight') {
            deleteHighlight()
            setOpenConfirmationModal(false)
        } else if (confirmationType == 'shareDrawingAudio') {
            onPolygonShare()
            setOpenConfirmationModal(false)
        } else if (confirmationType == 'shareMainAudio') {
            onShareMainAudio()
            setOpenConfirmationModal(false)

        } else if (confirmationType == 'deleteMainAudio') {
            onDeleteMainRecord()
            setOpenConfirmationModal(false)

        } else if (confirmationType == 'shareVocabulary') {
            onAddVocabulary()
            setOpenConfirmationModal(false)

        } else if (confirmationType == 'deleteVocabulary') {
            onAddVocabulary()
            setOpenConfirmationModal(false)

        }
    }
    useEffect(() => {
        if (bookLoaded) {
            console.log('bookMedia', bookMedia)
            let additions = getBookAdditionsNumber(bookMedia, bookData.bookSource)
            setAdditionsNumber(
                additions.allHighlights + + additions.allVocabularies + + additions.allNotes
            )
        }
        // setAddistionsNumber(
        //     additions.allHighlights + + additions.allRecordings + + additions.allVocabularies
        // )
        return () => {

        }
    }, [bookMedia, bookLoaded])
    return (

        <div ref={bookWrapper} id="book-reader-page" class="ltrDir">

            <PreloaderPopup open={preloadPopup} setOpen={setPreloadPopup} currentLanguage={bookData?.language} />
            <ConfirmationMessage onConfirmationYes={onConfirmationYes} open={openConfirmationModal} setOpen={setOpenConfirmationModal} confirmationMessage={confirmationMessageText} confirmationType={confirmationType} currentLanguage={bookData?.language} />
            <DiscardMessage open={openDiscardMessage} setOpen={setOpenDiscardMessage} confirmationMessage={t('bookComponent.discardRecord')} currentLanguage={bookData?.language} />
            <SentMessage open={openSentModal} setOpen={setOpenSentModal} sentMessage={sentMessageText} confirmationType={sentType} />

            {bookLoaded &&
                <Timer
                    onBookEnd={onBookEnd}
                    bookEnd={bookEnd}
                    bookProgressSaved={bookProgressSaved}
                    bookId={bookId}
                    bookPagesFlipped={bookPagesFlipped}
                    bookPagesFlippedOriginal={bookPagesFlippedOriginal}
                    studentModeFinished={studentModeFinished}
                    originalModeFinished={originalModeFinished}
                    loggedInUser={loggedInUser}
                    bookData={bookData}
                    bookLoaded={bookLoaded}
                    currentMode={currentMode}
                    originalReadingTimer={originalReadingTimer}
                    studentReadingTimer={studentReadingTimer}
                />
            }
            {!showBookFinish ?
                bookLoaded &&
                <>
                    <div
                        className={`book-wrapper${zoomMode ? ' zoom-enabled' : ''}`}
                    >
                        <TransformWrapper
                            disabled={currentZoom == 0}
                            doubleClick={{
                                disabled: true
                            }}
                            ref={zoomRef}
                        >
                            <TransformComponent>

                                <div
                                    ref={iframeScaleWrapper}
                                    className="iframe-scale-wrapper">
                                    <div className="iframe-wrapper"
                                        ref={iframeWrapper}
                                        scrolling="no"
                                        style={{
                                            top: bookData.bookSource == 'reflowable' ? 0 : bookTop,
                                            left: bookData.bookSource == 'reflowable' ? 0 : bookLeft,
                                            right: bookData.bookSource == 'reflowable' ? 0 : 'auto',
                                            transform: bookData.bookSource == 'reflowable' ? `scale(1)` : `scale(${scale})`,
                                            transformOrigin: bookOrigin,
                                            width: bookData.bookSource == 'reflowable' ? '100%' : bookWidth != '100%' ? bookWidth * 2 : '100%',
                                            height: bookHeight == '100%' ? bookHeight : parseInt(bookHeight),
                                        }}>
                                        {showColorPopup ?
                                            <SelectionMenu
                                                onDeleteVocabulary={onDeleteVocabulary}
                                                allowMic={allowMic}
                                                stream={stream}
                                                userType={userType}
                                                selectionPopupHaveShareBtn={selectionPopupHaveShareBtn}
                                                polygonAudio={polygonAudio}
                                                selectionPopupShareBtnEnable={selectionPopupShareBtnEnable}
                                                selectionPopupHavePlayBtn={selectionPopupHavePlayBtn}
                                                selectedPolygonId={selectedPolygonId}
                                                selectedPolygonPage={selectedPolygonPage}
                                                currentPage={currentPage}
                                                currentOrientation={currentOrientation}
                                                book={book}
                                                stopDrawingRecorder={stopDrawingRecorder}
                                                onPolygonShare={onOpenDrawingAudioShare}
                                                bookId={bookId}
                                                savePolygonAudio={savePolygonAudio}
                                                deletePolygon={deletePolygon}
                                                showSelectionMenu={showColorPopup}
                                                showVocabularies={showVocabularies}
                                                popup={popup}
                                                popupType={popupType}
                                                // addNewHighlight={onShareHighlight}
                                                enableVocabulary={enableVocabulary}
                                                enableHighlight={enableHighlight}
                                                addNewHighlight={onShareHighlight}
                                                // onSelectionMenuLayout={onSelectionMenuLayout}
                                                addNewVocabularies={toggleVocabulary}

                                            />
                                            :
                                            null
                                        }
                                        {bookData.bookSource != 'reflowable' && !disableIframe ?
                                            // <TransformWrapper ref={zoomRef}>
                                            //     <TransformComponent>
                                            <iframe
                                                className={`${zoomMode ? 'zoom-enabled' : ''}`}
                                                id="book-iframe"
                                                allow="autoplay" style={{
                                                }} onLoad={_onPageLoad} ref={iframe} src={currentPageUrl} />
                                            //     </TransformComponent>
                                            // </TransformWrapper>
                                            :
                                            ''
                                        }
                                        {bookData.bookSource == 'reflowable' &&
                                            <div
                                                id="reflowable-book-wrapper"
                                                allow="autoplay"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginTop: 50
                                                }}
                                            // ref={(ref) => this.iframe = ref}
                                            />
                                        }
                                    </div>
                                </div>
                            </TransformComponent>
                        </TransformWrapper>

                    </div>
                    <BookProgress reflowable={bookData.bookSource == 'reflowable'} reflowableCurrentProgress={reflowableCurrentProgress} language={bookData.language} numberOfPages={numberOfPages} currentPage={currentPage} currentOrientation={'landscape'} currentTheme={currentTheme} />
                    <BookMenu
                        toggleZoom={toggleZoom}
                        // goToAdditions={goToAdditions}
                        toggleFont={toggleFont}
                        currentTheme={currentTheme == 'nightMode'}
                        addNote={toggleNote}
                        currentOrientation={'landscape'}
                        drawing={drawing}
                        language={bookData.language}
                        // onBookMenuHeight={onBookMenuHeight}
                        onMenuButtonPressed={onMenuButtonPressed}
                        showBookMenu={showBookMenu}
                        // onLayout={onBottomMenuLayout}
                        currentMode={currentMode}
                        playForMeMode={playForMeMode}
                        onPlayforMePressed={onPlayforMePressed}
                        currentPage={currentPage}
                        numberOfPages={numberOfPages}
                        reflowable={bookData.bookSource == 'reflowable'}
                    // onToggleNightMode={toggleNightMode}
                    // additionsNumber={additionsNumber}
                    />
                    <ZoomMenu
                        zoomMode={zoomMode}
                        currentZoom={currentZoom}
                        onZoomChange={onZoomChange}
                        onZoomIn={onZoomIn}
                        onZoomOut={onZoomOut}
                        currentLanguage={bookData.language}
                        toggleZoom={toggleZoom}
                    />
                    <FontMenu
                        fontMode={fontMode}
                        currentFontSize={currentFontSize}
                        onFontSizeChanged={onFontSizeChanged}
                        onIncreaseFontSize={onIncreaseFontSize}
                        onDecreaseFontSize={onDecreaseFontSize}
                        currentLanguage={bookData.language}
                        toggleFont={toggleFont}
                    />
                    <RecordingMenu
                        setRecordingStatus={setRecordingStatus}
                        stream={stream}
                        book={bookMedia}
                        mainAudioExist={mainRecordExist}
                        stopMainRecorder={stopMainRecorder}
                        onShare={() => {
                            setConfirmationMessageText(i18n.t('bookComponent.shareRecord', { lng: bookData.language }))
                            setConfirmationType('shareMainAudio')
                            setOpenConfirmationModal(true)
                            // onShareMainAudio()
                        }}
                        language={bookData.language}
                        currentTheme={currentTheme == 'nightMode'}
                        currentOrientation={currentOrientation}
                        // openConfirmationSheet={openConfirmationSheet} 
                        openConfirmationSheet={() => {
                            setConfirmationMessageText(i18n.t('bookComponent.deleteRecord', { lng: bookData.language }))
                            setConfirmationType('deleteMainAudio')
                            setOpenConfirmationModal(true)

                        }}
                        bookId={bookId}
                        userId={userId}
                        userType={userType}
                        hasPermission={hasPermission}
                        recordFile={bookMedia.mainRecord}
                        recordingMode={recordingMode}
                        onToggleRecording={toggleRecording}
                        currentPage={currentPage}
                        numberOfPages={numberOfPages}
                        allowMic={allowMic}
                    />


                    <div
                        onClick={() => {
                            bookData.language != 'ar' ? _nextPage() : _prevPage()
                        }}
                        className={'prev-icon'}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: 15
                        }}>
                        <div className="icon-back-arrow prev-page" />

                    </div>
                    <div
                        onClick={
                            () => {
                                bookData.language != 'ar' ? _prevPage() : _nextPage()
                            }
                        }
                        className={'next-icon'}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: 15
                        }}>
                        <div className="icon-back-arrow next-page" />
                    </div>
                    <div
                        onClick={goBack}
                        className={'back-icon'}
                        style={{
                            position: 'absolute',
                            top: '25px',
                            left: '2vw'
                        }}>
                        <div className="icon-close" />
                    </div>
                    {currentMode == 'student' &&
                        <div
                            onClick={() => {
                                setAddtionsOpened(true)
                            }}
                            className={'additions-number'}>
                            {additionsNumber}{'  '}{t('bookComponent.additions', { lng: bookData.language })}

                        </div>
                    }

                    <AddVocabulary
                        currentSelectedText={currentSelectedText}
                        onVocabulariesClose={onVocabulariesClose}
                        onAddVocabulary={(wordType, definition, sentence, vocabularyText) => {
                            let voc = {
                                wordType,
                                definition,
                                sentence,
                                vocabularyText
                            }
                            // toggleText()
                            setVocabularyData({ ...voc })
                            console.log('aaaaad new vocabulary')
                            setConfirmationMessageText(i18n.t('bookComponent.shareVocabulary', { lng: bookData.language }))
                            setConfirmationType('shareVocabulary')
                            setOpenConfirmationModal(true)
                        }}
                        language={bookData.language}
                        open={vocabularyOpened}
                        bookMedia={bookMedia}
                    />
                    <AddNote onNoteClose={onNoteClose} onSaveNote={onSaveNote} onShareNote={onShareNote} language={bookData.language} open={noteOpened} onNoteTextChange={onNoteTextChange} note={bookMedia} />
                    <Additions initialAdditionTab={a} onAddtionsClose={onAddtionsClose} language={bookData?.language} open={additionsOpened} bookMedia={bookMedia} source={bookData.bookSource} />
                </>

                :
                <BookFinish reflowableCurrentProgress={reflowableCurrentProgress} reflowableFinished={reflowableFinished} bookEndOnClose={bookEndOnClose} onAfterSavingProgress={onAfterSavingProgress} bookData={bookData} loggedInUser={loggedInUser} onReadAgain={onReadAgain} bookFinishData={bookFinishData} bookId={bookId} currentMode={currentMode} currentLanguage={bookData.language} />
            }

        </div>

    )
}


Read.layout = "Empt";

export default Read;
