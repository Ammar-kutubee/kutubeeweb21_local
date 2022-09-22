import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getBookUserRate, saveBookProgress } from '../../src/utils/apis'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import CustomButton from '../CustomButton'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import UserRateModal from './../../components/Book/UserRateModal'

const BookFinish = ({reflowableFinished,currentMode, currentLanguage, bookId, bookFinishData, onReadAgain, loggedInUser, openLevelUpPopup, bookData ,reflowableCurrentProgress}) => {
    const router = useRouter()
    const [newLevelData, setNewLevelData] = useState(null)
    const [dataSaved, setDataSaved] = useState(false)
    const [levelUp, setLevelUp] = useState(false)
    const [pointsData, setPointsData] = useState(false)
    const [userCurrentRate, setUserCurrentRate] = useState(null)
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch()
    let ratingSheet = useRef(null);

    const onRatingSheetRef = (ref) => {
        ratingSheet = ref
    }
    const onSendRating = async (rating) => {
        if (rating.pointIncrease.increase) {
            dispatch({ type: 'POINTS_EARNED', message: { pointIncrease: rating.pointIncrease } })
        }
        const userRate = await getBookUserRate(bookId, loggedInUser.userData._id)
        setUserCurrentRate(userRate)
    }
    const toLibrary = () => {
        router.replace('/book/' + bookId)
    }
    const goToQuiz = () => {
        router.replace(
            {
                pathname: '/quiz',
                query: {
                    bookId,
                    currentLanguage
                },
            },
            undefined,
            {
                shallow: true
            })
        // navigation.replace('BookQuiz', { bookId, userId: loggedInUser.userData._id, currentLanguage })
    }
    const readAgain = () => {
        onReadAgain()
    }
    useEffect(async () => {


        bookFinishData.reflowableCurrentProgress = reflowableCurrentProgress;

        console.log("reflowableFinished",reflowableFinished,bookFinishData,currentMode)
        let pushData = await saveBookProgress(loggedInUser, bookId, bookFinishData)

        const userRate = await getBookUserRate(bookId, loggedInUser.userData._id)
        setUserCurrentRate(userRate)
        setDataSaved(true)
        setPointsData(pushData.pointIncrease)
        // if (pushData.levelUp) {
        //     setLevelUp(true)

        //     setNewLevelData(pushData.newLevel)
        // }

        return () => {

        }
    }, [])
    let congratsSheetRef = useRef(null)
    // const handleRef = useCallback((ref) => {
    //     congratsSheetRef.current = ref
    // }, []);
    const onCongratsSheetRef = (ref) => {
        congratsSheetRef = ref
    }
    useEffect(() => {
        if (dataSaved && levelUp) {
            // congratsSheetRef.present()
        }
        return () => {

        }
    }, [dataSaved, levelUp])
    const onOpenRating = () => {
        if (ratingSheet) {
            ratingSheet.present()
        }
    }
    return (
        <div className="bookFinishedWrapper">
            {
                dataSaved ?
                    (currentMode == 'original' && bookFinishData.originalModeFinished) || (currentMode == 'student' && bookFinishData.studentModeFinished) ?
                        <motion.div
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            from={{
                                opacity: 0,
                                y: -50,
                            }}

                            className={'bookFinished'}
                            contentContainerStyle={{
                                minHeight: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                    width: 125.98,
                                    height: 152.99,
                                    alignSelf: 'center'
                                }}
                                viewBox="0 0 125.98 152.99"
                            >
                                <path
                                    d="M91.27 21.08c-1.96-1.78-4.84-2.38-7.57-2.03-3.31.42-6.52 1.95-9.1 4.03-6.15 4.96-9.4 12.49-9.62 20.27-.06 1.83 2.8 1.82 2.84-.01.15-5.85 2.15-11.38 6.12-15.74 1.93-2.13 4.45-4.25 7.21-5.18 1.66-.56 3.55-.9 5.3-.66.77.11 1.53.34 2.2.74.6.34 1.36 1.09 1.65 1.74-1.6.69-3.02 1.96-2.31 3.89.75 2.04 3.57 2.48 4.99.89.95-1.06.82-2.89.51-4.16a7.645 7.645 0 00-2.22-3.78zM34.38 21.27c1.94-1.81 4.82-2.41 7.56-2.08 3.32.4 6.54 1.91 9.14 3.98 6.18 4.91 9.49 12.42 9.75 20.21.07 1.83-2.79 1.84-2.84.01-.2-5.85-2.23-11.35-6.23-15.7-1.94-2.11-4.47-4.22-7.24-5.13-1.66-.55-3.55-.88-5.31-.63-.77.11-1.53.35-2.2.75-.6.35-1.36 1.1-1.64 1.75 1.16.48 2.15 1.12 2.49 2.42.72 2.75-3.42 4.27-5.14 2.38-.95-1.05-.84-2.87-.53-4.16.32-1.44 1.1-2.79 2.19-3.8z"
                                    fill="#010202"
                                />
                                <path
                                    d="M61.25 36.55C71.69 24.53 83.43 13.33 96.29 3.13c-.93 15.75-1.87 33.74-3.87 49.38"
                                    fill="#ef781f"
                                />
                                <path
                                    d="M17.5 97.97c-9.73 7.95-11.18 22.29-3.22 32.01 7.96 9.72 22.31 11.17 32.04 3.22l20.81-16.99c9.73-7.95 11.17-22.29 3.22-32.01-7.96-9.72-22.31-11.17-32.04-3.22L17.5 97.97z"
                                    fill="#bfe3ee"
                                />
                                <path
                                    d="M108.48 97.68c9.79 7.88 11.32 22.21 3.43 31.99s-22.23 11.31-32.02 3.43l-20.92-16.86c-9.79-7.89-11.32-22.21-3.43-31.99 7.89-9.78 22.23-11.31 32.02-3.42l20.92 16.85z"
                                    fill="#bfe3ee"
                                />
                                <path
                                    d="M57.4 88.2l-17-20.79c-7.96-9.72-22.31-11.17-32.04-3.22-9.73 7.95-11.18 22.29-3.22 32.01 4.53 5.53 9.15 11.21 13.8 16.73 4.46 5.3 8.82 10.91 14.59 14.85.31.21.6.11.78-.11.25-.08.46-.28.45-.6-.03-.78-.09-1.56-.15-2.33 6.65 1.54 13.91.11 19.59-4.54 9.72-7.93 11.17-22.27 3.2-32z"
                                    fill="#94d3e6"
                                />
                                <path
                                    d="M68.59 88.2l17-20.79c7.96-9.72 22.31-11.17 32.04-3.22 9.73 7.95 11.17 22.29 3.22 32.01-4.53 5.53-9.15 11.21-13.8 16.73-4.46 5.3-8.82 10.91-14.59 14.85-.31.21-.6.11-.78-.11-.25-.08-.46-.28-.45-.6.03-.78.09-1.56.15-2.33-6.65 1.54-13.91.11-19.59-4.54-9.73-7.93-11.17-22.27-3.2-32z"
                                    fill="#94d3e6"
                                />
                                <path
                                    d="M66.44 149.04c-.18 1.04-.36 2.16-1.06 3.04-.86 1.1-2.45 1.25-3.52.24-.85-.79-1.16-1.98-1.43-3.01-.3-1.15-.48-2.32-.65-3.49-.35-2.42-.55-4.88-1.04-7.29-.47-2.3.14-3.47 1.32-4.44.95-.78 2.09-1.44 3.16-1.44 1.37 0 3.47.78 4.34 2.75.67 1.53-.03 3.76-.31 5.37-.33 1.98-.33 3.99-.54 5.98-.06.71-.14 1.51-.27 2.29z"
                                    fill="#010202"
                                />
                                <path
                                    d="M100.57 85.58c.02-.94.02-1.88.01-2.82 0-.21 0-.41-.01-.62-.01-1.02-.04-2.05-.1-3.08-.01-.14-.01-.3-.02-.44-.06-1.02-.12-2.05-.2-3.07 0-.06-.01-.11-.01-.15-.09-1.09-.21-2.17-.33-3.26-.01-.12-.03-.23-.04-.35-.13-1.09-.28-2.17-.45-3.26-1.54-9.72-5.09-18.85-12.51-25.57-.42-.39-.85-.75-1.29-1.11-6.3-5.19-14.29-8.13-22.48-8.15H62.7c-8.2.02-16.18 2.96-22.48 8.15-.44.36-.87.73-1.29 1.11-7.42 6.72-10.97 15.84-12.51 25.57-.18 1.08-.32 2.17-.45 3.26-.01.12-.03.23-.04.35-.13 1.08-.24 2.17-.33 3.26 0 .06-.01.11-.01.15-.09 1.02-.15 2.05-.2 3.07-.01.14-.02.3-.02.44-.04 1.02-.08 2.05-.1 3.08 0 .21 0 .41-.01.62-.01.94-.01 1.88.01 2.82v.33c-.08 6.84.34 13.73 1.17 20.34 1.12 8.86 3.52 18.14 8.08 25.9 3.04 5.19 7.41 9.25 12.44 12 .08.04.14.09.22.13 4.96 2.74 10.38 4.02 15.75 3.99 5.37.02 10.79-1.24 15.75-3.99.08-.04.14-.09.22-.13 5.04-2.75 9.4-6.82 12.44-12 4.56-7.75 6.95-17.03 8.08-25.9.84-6.61 1.25-13.5 1.17-20.34-.03-.12-.02-.22-.02-.33z"
                                    fill="#ffd218"
                                />
                                <path
                                    d="M75.7 69.13c7.93 0 14.36-6.42 14.36-14.35S83.63 40.43 75.7 40.43s-14.36 6.42-14.36 14.35c0 7.92 6.43 14.35 14.36 14.35z"
                                    fill="#fff"
                                />
                                <path
                                    d="M73.95 63.02a4.991 4.991 0 10-4.99-4.99c0 2.76 2.24 4.99 4.99 4.99z"
                                    fill="#010202"
                                />
                                <g fill="#020203">
                                    <path d="M99.7 103.69c.62-5.79.94-11.74.87-17.67-.01-.12 0-.22 0-.33.01-.41 0-.83 0-1.24a147.694 147.694 0 01-75.38.22v1.35c-.07 5.99.26 12.02.9 17.86a147.75 147.75 0 0073.61-.19zM97.68 115.91a147.73 147.73 0 01-69.55.16c1.38 5.7 3.4 11.29 6.32 16.27 1 1.7 2.15 3.27 3.41 4.73 16.6 2.82 33.55 2.79 50.13-.1 1.23-1.43 2.35-2.96 3.33-4.63 2.95-5.02 4.98-10.67 6.36-16.43z" />
                                </g>
                                <path
                                    d="M50.09 69.13c7.93 0 14.36-6.42 14.36-14.35s-6.43-14.35-14.36-14.35-14.36 6.42-14.36 14.35c0 7.92 6.43 14.35 14.36 14.35z"
                                    fill="#fff"
                                />
                                <path
                                    d="M51.81 63.2a4.991 4.991 0 10-.002-9.978 4.991 4.991 0 00.002 9.978z"
                                    fill="#010202"
                                />
                                <path
                                    d="M105.56 38.25c-.47-.85-1.5-1.18-2.39-.74-1.92.95-.72 3.49-.54 5.02.22 1.88.44 3.77.65 5.65.08.68.46 1.27 1.19 1.35.68.08 1.31-.32 1.51-.99.6-2.02.78-4.16.54-6.26-.08-.84-.28-2.83-.96-4.03z"
                                    fill="#aec312"
                                />
                                <path
                                    d="M74.77 15.21c-.02-.17-.04-.33-.08-.5-.26-1.34-.91-2.58-1.37-3.87-.45-1.29-.71-2.75-.18-4.01.3-.69.82-1.31.91-2.06.12-.91-.63-1.92-1.55-1.87-.53.02-.99.36-1.31.77-1.36 1.78-1.06 4.17-.43 6.19.49 1.55 1.19 3.03 1.7 4.57.4 1.18.66 2.51.12 3.63-.21.45-.54.83-.79 1.26-.3.51-.62 1.48.08 1.82.97.48 1.95-1.44 2.26-2.1.57-1.16.79-2.52.64-3.83zM23.66 17.83c-.18-1.65.01-3.33.08-4.99.03-1 .14-2.2-.15-3.17-.28-.9-.91-.93-1.28-.06-.8 1.92-1.38 3.92-1.71 5.97-.3 1.85-1.12 6.2 1.82 6.31.46.02.95-.09 1.28-.42.62-.64.33-1.67.14-2.53-.08-.37-.13-.73-.18-1.11z"
                                    fill="#ffd218"
                                />
                                <path
                                    d="M18.78 32.49c-1.64-1.64-3.79-2.71-5.23-4.58-.34-.44-.61-.99-.54-1.55.04-.35.21-.73.04-1.05-.33-.68-1.26-1.15-1.98-1.2-2.18-.17-1.29 3.11-.94 4.25.6 1.94 1.71 3.7 3.13 5.13 1.17 1.18 2.56 2.21 3.04 3.88.07.23.12.47.04.7-.21.68-1.02.87-1.04 1.7-.01 1.78 3.21 1.98 4.42 2.29 1.68.42 2.18-.96 2.14-2.4-.08-2.41-1.02-4.77-2.59-6.61-.12-.2-.3-.38-.49-.56z"
                                    fill="#aec312"
                                />
                                <path
                                    d="M56.61 11.79c-.03-.23-.09-.45-.15-.67-.75-2.5-2.29-4.68-4.21-6.43-.97-.88-2.03-1.66-3.14-2.33-.87-.53-2.28-1.61-3.33-1.26-1.04.34-1.65 1.77-1.73 2.76-.11 1.29.31 2.6 1.14 3.59 1.28 1.53 3.32 2.15 5.22 2.69 1.23.34 1.63.53 1.98 1.75.14.5.32 1.17.8 1.45.42.24 1.06.08 1.52.12.39.04.79.07 1.16-.08.63-.24.82-1 .74-1.59z"
                                    fill="#c9a0ca"
                                />
                                <path
                                    d="M92.85 10.85c-.07-.35-.19-.7-.32-1.05-.96-2.54-1.91-5.1-2.87-7.64-.23-.61-.47-1.23-.95-1.66-.48-.43-1.18-.61-1.81-.43-.63.18-1.14.72-1.26 1.34-.09.48.02.97.14 1.44.62 2.4 1.12 5.14 2.29 7.33.51.95 1.27 2.33 2.27 2.83 1.06.53 2.44-.5 2.52-1.62.04-.17.03-.35-.01-.54z"
                                    fill="#aec312"
                                />
                                <path
                                    d="M13.04 60.89c-.02-.2-.07-.41-.13-.59-.46-1.38-1.58-1.81-2.73-2.44-1.19-.66-2.29-1.52-3.04-2.67-1.14-1.75-1.31-3.94-1.66-6-.09-.5-.21-1.02-.58-1.34-.37-.33-1.09-.29-1.26.19-.03.11-.04.22-.04.34-.07 1.52-.2 3.04-.28 4.54-.07 1.08.03 3.27.87 4.11.62 1.13 1.6 1.96 2.58 2.78.71.58 1.5 1.13 1.99 1.93.52.81.3 1.99 1.48 2.25.61.13 1.26-.1 1.73-.48.77-.65 1.16-1.66 1.07-2.62zM122.59 35.66c-.03-.35-.13-.7-.31-1.05-1.1-2.05-3.86-2.33-5.16-4.21-.5-.7-.88-1.49-1.27-2.26-.71-1.41-.33-2.71-.73-4.17-.14-.51-.73-1.53-1.32-1.61-1.11-.15-.67 1.76-.66 2.38.01.95-.21 1.87-.23 2.82-.04 1.45.18 2.92.87 4.21.62 1.13 1.6 1.96 2.58 2.78 1 .83 1.97 1.57 2.37 2.87.11.35.19.75.45 1 .89.86 2.01.25 2.67-.57.51-.64.79-1.42.74-2.19z"
                                    fill="#ffd218"
                                />
                                <path
                                    d="M118 64.43c-.21-.3-.42-.58-.65-.86-.9-1.1-1.92-2.1-2.73-3.27-.97-1.37-1.64-3.22-.85-4.69.21-.4.53-.76.6-1.21.12-.76-.56-1.49-1.32-1.61-.89-.14-1.79.35-2.45.91-1.18.99-1.8 2.63-2.34 4.03-.75 1.95-.84 4.09.31 5.9.47.75 1.12 1.33 1.87 1.8.73.44 1.51.76 2.09 1.4.96 1.05 1.27 2.54.89 3.9-.21.77.26 1.43.96 1.7 1.81.69 3.81-.47 4.62-2.14.99-2.01.19-4.13-1-5.86zM33.4 41.59c-.02-.29-.07-.56-.15-.84-.29-.95-1.2-1.89-2.24-1.32-.65.35-.72.84-.64 1.51.09.87.14 1.73.07 2.61-.1 1.18-.36 2.35-.77 3.46-.4 1.07-1.02 2.04-1.32 3.14-.37 1.42-.19 3.14.61 4.39.71 1.11 2.91 2.25 3.95.87.28-.36.31-.86.33-1.31.18-3.84.2-7.68.2-11.52-.01-.34-.02-.67-.04-.99z"
                                    fill="#c9a0ca"
                                />
                                <path
                                    d="M91.38 75.71c-.96-3.36-5.79-4.99-8.51-2.74-1.33 1.09-1.99 3.01-1.27 4.63.73 1.61 2.61 2.52 4.31 1.93 1.27-.44 1.34-2.25 0-2.65-.76-.23-1.91-1.88-.46-2.06.97-.12 2.33 1.64 2.48 2.47.51 2.8-3.7 3.76-5.62 3.77-2.84.02-5.87-.69-8.59-1.53-2.77-.86-5.07-2.65-7.3-4.44-1.06-.86-2.48.12-2.41 1.12-.65.43-1 1.4-.34 2.17 2.53 2.94 6.27 4.37 10.03 4.92 2.08.31 4.2.42 6.3.5 2.03.08 4.13.1 6.09-.52 3.08-.99 6.3-4.02 5.29-7.57z"
                                    fill="#ef781f"
                                />
                                <path
                                    d="M67.32 75.25c-.18-2.07-2.18-2.68-3.97-2.62-2.1.07-4.62.62-4.74 3.17-.09 1.83 1.51 3.13 2.6 4.39.43.51.88.99 1.34 1.46.53.54 1.11 1.15 1.88 1.31 1.04.22 2.1-.37 2.3-1.45.12-.72-.07-1.43-.33-2.09-.26-.65-.62-1.24-1.05-1.8.34-.03.68-.12 1-.33.67-.44 1.03-1.23.97-2.04zm-3.29 5.78v-.02c0 .03.01.06 0 .08v-.06z"
                                    fill="#2c2522"
                                />
                            </svg>
                            <div className={'yellowText'}>{t('bookComponent.bravo', { lng: currentLanguage })}</div>
                            <div className={'blackText'}>{t('bookComponent.youFinished', { mode: currentMode == 'original' ? t('bookComponent.listening', { lng: currentLanguage }) : t('bookComponent.reading', { lng: currentLanguage }), lng: currentLanguage })}</div>
                            {pointsData.points ?
                                <div style={{ alignItems: 'flex-end', display: 'flex' }}>
                                    <div className={'blackPointsText'}>{t('bookComponent.points3', { points: pointsData.points, lng: currentLanguage })}</div>
                                    <div className={'pointsText'}>{pointsData.points}</div>
                                    <div className={'blackPointsText'}>{t('bookComponent.points', { points: pointsData.points, lng: currentLanguage })}</div>
                                </div>
                                :
                                null
                            }

                            {/* {userCurrentRate?.rate_value ?
                                null
                                :
                                <div className={'blackText'} style={{ marginTop: 15 }}>{t('bookScreen.addRating', { lng: currentLanguage })}</div>
                            } */}
                            {/* <Text style={[styles.blackText, { marginTop: mScale(35) }]}>{t('bookComponent.rateBook', { locale: currentLanguage })}</Text> */}
                            {userCurrentRate?.rate_value ?
                                null
                                :
                                <div
                                    onPress={onOpenRating}
                                    style={{
                                        marginTop: 10
                                    }}
                                >
                                    {/* {console.log("loggedInUserloggedInUser",loggedInUser.userData._id)} */}
                                    <UserRateModal currentPage={"finishBook"} currentRating={userCurrentRate} userId={loggedInUser.userData._id} bookId={bookId} language={currentLanguage} onSendRating={onSendRating} />
                                    
                                    {/* <StarRating
                                        containerStyle={{
                                            width: 250,
                                        }}
                                        disabled
                                        emptyStar={'half-star'}
                                        fullStar={'full-star'}
                                        fullStarColor={'#FFD217'}
                                        emptyStarColor={'#FFD217'}
                                        starSize={35}
                                        icoMoonJson={icoMoonConfig}
                                        disabled={true}
                                        maxStars={5}
                                        rating={userCurrentRate?.rate_value ? userCurrentRate.rate_value : 0}
                                    /> */}
                                </div>
                            }
                            <div
                                className="finish-buttons-wrapper">

                                <div className="toLibrary">
                                    <CustomButton

                                        buttonStyle={{ marginTop: 35, width: '100%' }}
                                        onPress={toLibrary}
                                        text={t('bookComponent.goBack', { lng: currentLanguage })}
                                    />
                                </div>
                                {bookData.quizExist !== false && <CustomButton
                                    buttonStyle={{ marginTop: 35, width: '100%' }}
                                    onPress={goToQuiz}
                                    text={t('bookComponent.takeQuiz', { lng: currentLanguage })}
                                />}

                            </div>
                        </motion.div>
                        :
                        <motion.div
                            animate={{
                                opacity: 1,
                                translateY: 0,
                            }}
                            from={{
                                opacity: 0,
                                translateY: -50,
                            }}
                            contentContainerStyle={{

                            }}
                            style={{
                                minHeight: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            className={'bookFinished'} >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 125.98 133.99"
                                style={{
                                    width: 125.98,
                                    height: 133.99,
                                    alignSelf: 'center'
                                }}
                            >
                                <path
                                    d="M17.5 78.99c-9.73 7.95-11.18 22.28-3.22 32 7.96 9.72 22.31 11.16 32.04 3.21l20.82-17c9.73-7.95 11.18-22.28 3.22-32-7.96-9.72-22.31-11.16-32.04-3.21l-20.82 17z"
                                    fill="#b1dde7"
                                />
                                <path
                                    d="M108.48 78.7c9.79 7.88 11.32 22.21 3.43 31.98-7.89 9.78-22.23 11.31-32.02 3.42L58.98 97.26c-9.79-7.88-11.32-22.2-3.43-31.98 7.89-9.78 22.23-11.31 32.02-3.42l20.91 16.84z"
                                    fill="#b1dde7"
                                />
                                <path
                                    d="M57.4 69.22L40.39 48.44c-7.96-9.72-22.31-11.16-32.04-3.21s-11.18 22.28-3.22 32c4.53 5.53 9.15 11.21 13.8 16.72 4.46 5.3 8.82 10.91 14.59 14.84.31.21.6.11.78-.11.25-.08.46-.28.45-.6-.03-.78-.09-1.56-.15-2.33 6.65 1.54 13.91.11 19.59-4.53 9.73-7.94 11.18-22.28 3.21-32z"
                                    fill="#86cee0"
                                />
                                <path
                                    d="M68.59 69.22l17-20.78c7.96-9.72 22.31-11.16 32.04-3.21s11.17 22.28 3.22 32c-4.53 5.53-9.15 11.21-13.8 16.72-4.46 5.3-8.82 10.91-14.59 14.84-.31.21-.6.11-.78-.11-.25-.08-.46-.28-.45-.6.03-.78.09-1.56.15-2.33-6.65 1.54-13.91.11-19.59-4.53-9.73-7.94-11.17-22.28-3.2-32z"
                                    fill="#86cee0"
                                />
                                <path
                                    d="M66.44 130.03c-.18 1.04-.36 2.16-1.06 3.04-.86 1.1-2.45 1.24-3.52.24-.85-.79-1.16-1.98-1.43-3.01-.3-1.14-.48-2.32-.65-3.49-.35-2.42-.55-4.88-1.04-7.29-.47-2.3.14-3.47 1.32-4.44.95-.78 2.09-1.44 3.16-1.44 1.37 0 3.47.78 4.34 2.75.67 1.53-.03 3.75-.31 5.37-.33 1.98-.33 3.99-.54 5.98-.06.72-.14 1.51-.27 2.29zM91.27 2.12C89.31.34 86.43-.26 83.7.09c-3.31.42-6.52 1.95-9.1 4.03-6.15 4.95-9.4 12.48-9.62 20.27-.06 1.83 2.8 1.82 2.84-.01.15-5.85 2.15-11.37 6.12-15.73 1.93-2.12 4.45-4.25 7.21-5.17 1.66-.56 3.55-.9 5.3-.66.77.11 1.53.34 2.2.74.6.34 1.36 1.09 1.65 1.74-1.6.69-3.02 1.96-2.31 3.89.75 2.04 3.57 2.48 4.99.89.95-1.06.82-2.88.51-4.16a7.576 7.576 0 00-2.22-3.8zM34.38 2.31C36.32.5 39.2-.1 41.94.23c3.32.4 6.54 1.9 9.14 3.97 6.18 4.91 9.49 12.42 9.75 20.2.07 1.83-2.79 1.84-2.84.01-.2-5.85-2.23-11.35-6.23-15.7-1.94-2.11-4.47-4.22-7.24-5.13-1.66-.55-3.55-.88-5.31-.63-.77.11-1.53.35-2.2.75-.6.35-1.36 1.1-1.64 1.75 1.16.48 2.15 1.12 2.49 2.42.72 2.75-3.42 4.27-5.14 2.38-.95-1.05-.84-2.87-.53-4.16a7.46 7.46 0 012.19-3.78z"
                                    fill="#010202"
                                />
                                <path
                                    d="M100.57 65.36c0-.53.01-1.05.01-1.58 0-.21 0-.41-.01-.62-.01-1.02-.04-2.05-.1-3.08-.01-.14-.01-.3-.02-.44-.05-1.02-.12-2.05-.2-3.07 0-.06-.01-.11-.01-.15-.09-1.09-.21-2.17-.33-3.26-.01-.12-.03-.23-.04-.35-.13-1.09-.28-2.17-.45-3.26-1.54-9.72-5.09-18.85-12.51-25.56-.42-.39-.85-.75-1.29-1.11-6.3-5.19-14.29-8.12-22.48-8.15H62.7c-8.2.02-16.18 2.96-22.48 8.15-.44.36-.87.73-1.29 1.11-7.43 6.71-10.98 15.83-12.52 25.56-.18 1.08-.32 2.17-.45 3.26-.01.12-.03.23-.04.35-.13 1.08-.24 2.17-.33 3.26 0 .05-.01.11-.01.15-.09 1.02-.15 2.05-.2 3.07-.01.14-.02.3-.02.44-.04 1.02-.08 2.05-.1 3.08 0 .21 0 .41-.01.62-.01.6 0 1.2.01 1.8 24.7 6.44 50.65 6.36 75.31-.22z"
                                    fill="#ffd131"
                                />
                                <path
                                    d="M75.7 50.15c7.93 0 14.36-6.42 14.36-14.34S83.63 21.47 75.7 21.47s-14.36 6.42-14.36 14.34 6.43 14.34 14.36 14.34z"
                                    fill="#fff"
                                />
                                <path
                                    d="M75.05 45.14c2.76 0 4.99-2.23 4.99-4.99 0-2.75-2.24-4.99-4.99-4.99a4.991 4.991 0 000 9.98z"
                                    fill="#010202"
                                />
                                <path
                                    d="M50.09 50.15c7.93 0 14.36-6.42 14.36-14.34s-6.43-14.34-14.36-14.34-14.36 6.42-14.36 14.34 6.43 14.34 14.36 14.34z"
                                    fill="#fff"
                                />
                                <path
                                    d="M50.71 40.93c2.76 0 4.99-2.23 4.99-4.99 0-2.75-2.24-4.99-4.99-4.99-2.76 0-4.99 2.23-4.99 4.99 0 2.76 2.23 4.99 4.99 4.99zM52.03 59.98c3.57-2.29 7.84-.44 11.54.56 3.85 1.03 8.12 1.43 11.58-.89 1.47-.98.09-3.37-1.39-2.38-3.55 2.38-7.79 1.1-11.56.01-3.82-1.1-7.98-1.97-11.56.32-1.48.96-.11 3.34 1.39 2.38z"
                                    fill="#010202"
                                />
                                <path
                                    d="M97.68 96.76c.76-3.16 1.32-6.35 1.72-9.5.11-.89.2-1.8.29-2.7a147.86 147.86 0 01-73.55.2c.09.83.17 1.68.27 2.5.41 3.2.98 6.44 1.76 9.66 22.86 5.48 46.69 5.42 69.51-.16zM37.91 117.88c2.58 2.98 5.65 5.43 9.03 7.28.08.04.14.09.22.13a31.984 31.984 0 0015.75 3.98c5.37.02 10.79-1.24 15.75-3.98.08-.04.14-.09.22-.13 3.42-1.87 6.52-4.36 9.12-7.38a147.795 147.795 0 01-50.09.1z"
                                    fill="#ffd131"
                                />
                                <path
                                    d="M99.69 84.57c.62-5.78.94-11.72.87-17.64-.01-.12 0-.22 0-.33.01-.41 0-.83 0-1.24a147.683 147.683 0 01-75.32.22v1.35c-.07 5.98.26 11.99.9 17.83 24.15 6.14 49.45 6.07 73.55-.19zM97.68 96.76a147.78 147.78 0 01-69.5.16c1.38 5.69 3.4 11.27 6.32 16.24 1 1.7 2.15 3.27 3.41 4.72 16.58 2.82 33.52 2.78 50.09-.1 1.22-1.42 2.35-2.96 3.32-4.62 2.95-5.01 4.98-10.64 6.36-16.4z"
                                    fill="#010202"
                                />
                            </svg>
                            <div className={'yellowText'}>{t('bookComponent.tryAgain', { lng: currentLanguage })}</div>
                            <div className={'blackText'}>{t('bookComponent.spendMoreTime', { mode: currentMode == 'original' ? t('bookComponent.listening', { lng: currentLanguage }) : t('bookComponent.reading', { lng: currentLanguage }), lng: currentLanguage })}</div>
                            {/* <Text style={[styles.blackText, { marginTop: mScale(35) }]}>{t('bookComponent.rateBook', { locale: currentLanguage })}</Text> */}
                            <div
                                className="finish-buttons-wrapper">

                                <div className="toLibrary">
                                    <CustomButton

                                        buttonStyle={{ marginTop: 35, width: '100%' }}
                                        onPress={toLibrary}
                                        text={t('bookComponent.goBack', { lng: currentLanguage })}
                                    />
                                </div>
                                {bookData.bookSource != 'reflowable' &&
                                    <div>
                                        <CustomButton
                                            buttonStyle={{ marginTop: 35, width: '100%' }}
                                            onPress={readAgain}
                                            text={t('bookComponent.readAgain', { lng: currentLanguage })}
                                        />
                                    </div>
                                }

                            </div>

                        </motion.div>
                    :
                    null
            }
            {/* <CongratsSheet onBottomSheetRef={onCongratsSheetRef} level={newLevelData} sheetHeight={250} confirmationMessage={t('bookComponent.levelUp', { locale: bookData.language })} bookData={bookData} confirmText={t('bookComponent.yes', { locale: bookData.language })} />
            <UserAddRating onSendRating={onSendRating} currentRating={userCurrentRate} onBottomSheetRef={onRatingSheetRef} language={currentLanguage} bookId={bookId} uid={loggedInUser.userData._id} /> */}
        </div>
    )
}

export default BookFinish