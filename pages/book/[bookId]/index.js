import React, { useEffect, useState } from 'react'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { useRouter } from 'next/router'
import TextBookCover from '../../../components/Book/TextBookCover'
import { getBookData, getBookProgress, getBookRatings, getBookUserRate, getRelatedBooks } from '../../../src/utils/apis'
import BookButtons from '../../../components/Book/BookButtons'
import BookTitleAndRating from '../../../components/Book/BookTitleAndRating'
import BookInsideActivity from '../../../components/Book/BookInsideActivity'

import BookInfo from '../../../components/Book/BookInfo'
import BookScreenshots from '../../../components/Book/BookScreenshots'
import BookTags from '../../../components/Book/BookTags'
import BookRatings from '../../../components/Book/BookRatings'
import withAuth from '../../../src/utils/withAuth';

import ShareModal from '../../../components/Book/ShareModal';
import QuizModal from '../../../components/Book/QuizModal';
import { getBookAdditionsNumber } from '../../../src/utils/functions';
import FriendsModal from '../../../components/Book/FriendsModal';
import AllRatingsmodal from '../../../components/Book/AllRatingsmodal';
import { useSelector } from 'react-redux';

const Book = ({ userId }) => {

    const loggedInUser = useSelector((state) => state.mainReducer.loggedInUser);
    const router = useRouter()
    const { bookId } = router.query
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [loading, setLoading] = useState(true)
    const [bookData, setBookData] = useState(null)
    const [currentLanguage, setLanguage] = useState(null)
    const [bookProgress, setBookProgress] = useState(null)
    const [bookRatings, setBookRatings] = useState([])
    const [userCurrentRate, setUserCurrentRate] = useState(null)
    const [relatedBooks, setRelatedBooks] = useState('notDownloaded')
    const [highlightsNumber, setHighlightsNumber] = useState(0)
    const [vocabulariesNumber, setVocabulariesNumber] = useState(0)
    const [recordingsNumber, setRecordingsNumber] = useState(0)
    const [notesNumber, setNotesNumber] = useState(0)
    const [showShare, setShare] = React.useState(false)
    const [quizModalOpened, setQuizModalOpened] = React.useState(false)
    const [allRatingsOpened, setAllRatingsOpened] = React.useState(false)
    const [userType, setUserType] = React.useState("")

    const [bookReads, setBookReads] = React.useState(0)

    const onButtonPressed = (type) => {

        if(type === 'quiz-teacher') {


            router.push(
                {
                    pathname: '/book/' + bookId + '/quiz',
                    query: {
                        currentLanguage
                    },
                },
                undefined,
                {
                    shallow: true
                })
            
        }
        if (type == 'listen' || type == 'read') {
            router.push(`/book/${bookId}/read?mode=${type == 'listen' ? 'original' : 'student'}`)
        } if (type == 'quiz') {
            // navigation.navigate('BookQuiz', { bookId, userId: loggedInUser.userData._id, currentLanguage: bookData.language })
            router.push(
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
        }
        if (type == 'quiz-closed') {
            setQuizModalOpened(true)
        }
    }

    const goToAdditions = (index) => {
        router.push(`/book/${bookId}/read?mode=student&a=${index}`)
    }
    useEffect(async () => {
        console.log('type', userId)
        // console.log("loggedInUser",loggedInUser) 
        if(loggedInUser.userData.type !== undefined) {
            setUserType(loggedInUser.userData.type)
        }
        setLoading(true)

        if (!router.isReady) return;



        let [bookData, bookProgress] = await Promise.all([
            getBookData(bookId,userId),
            getBookProgress(userId, bookId),
        ])
        setBookData(bookData)
        setBookProgress(bookProgress)
        setLoading(false)

        if(bookData.bookReads !== undefined) {
            setBookReads(bookData.bookReads)
        }

        let bookStorageData = localStorage.getItem(userId + '_' + bookId);
        let jsonFile = JSON.parse(bookStorageData)
        if (jsonFile) {
            console.log('jsonFile', jsonFile)
            let additions = getBookAdditionsNumber(jsonFile, bookData.bookSource)
            setHighlightsNumber(additions.allHighlights)
            setRecordingsNumber(additions.allRecordings)
            setVocabulariesNumber(additions.allVocabularies)
            setNotesNumber(additions.allNotes)
            console.log('additions', additions)
        }


        const bookRatings = await getBookRatings(bookId, false)


        setLanguage(bookData.language)
        setBookRatings(bookRatings)

        const userRate = await getBookUserRate(bookId, userId)
        setUserCurrentRate(userRate)
        console.log('boosssk', bookData)


    }, [router.isReady, bookId]);
    const onSendRating = async (rating) => {
        if (rating.pointIncrease.increase) {
            // dispatch({ type: 'POINTS_EARNED', message: { pointIncrease: rating.pointIncrease } })
        }
        const userRate = await getBookUserRate(bookId, userId)
        setUserCurrentRate(userRate)
    }
    const showshareicons = () => {
        if (showShare == false)
            setShare(true)
        else setShare(false)
    }

    const assignAssigment = () => {
        window.open("https://school.kutubee.com/teacherreport/assignments/reporting", '_blank').focus();
        

    }
    return (

        <div>
            {!loading ?
                <>
                    <QuizModal language={bookData.language} open={quizModalOpened} setOpen={(val) => {
                        setQuizModalOpened(val)
                    }} />
                    <div style={{ position: 'relative' }} className={`${bookData.language == 'ar' ? 'rtlDir' : 'ltrDir'}`}>
                        <div className="shareWrapper"
                        style={currentLanguage === "ar"?{left:0,right:"auto",display:"flex",alignItems:"center"}:{right:0,left:"auto",display:"flex",alignItems:"center"}}
                        >
                            {showShare == true &&
                                <ShareModal bookId={bookId}></ShareModal>
                            }
                            {userType === "teacher" &&
                            <>
                            {/* <div onClick={assignAssigment} className={'assign-bt2 assign-assigment-' + bookData.language}>
                            <div>{i18n.t("filter.assign",{lng:bookData.language})}</div>
                        <div id={"assign-svg-" + bookData.language}>
                        <svg
xmlns="http://www.w3.org/2000/svg"
width={25}
height={25}
style={{
  enableBackground: "new 0 0 459.325 459.325",
}}
xmlSpace="preserve"
viewBox='0 0 459 459'
>
<path fill='#fff' d="M459.319 229.668c0 22.201-17.992 40.193-40.205 40.193H269.85v149.271c0 22.207-17.998 40.199-40.196 40.193-11.101 0-21.149-4.492-28.416-11.763-7.276-7.281-11.774-17.324-11.769-28.419l-.006-149.288H40.181c-11.094 0-21.134-4.492-28.416-11.774C4.501 250.817.006 240.769.006 229.668 0 207.471 17.992 189.475 40.202 189.475h149.267V40.202C189.469 17.998 207.471 0 229.671 0c22.192.006 40.178 17.986 40.19 40.187v149.288h149.282c22.196.012 40.165 17.996 40.176 40.193z" />
</svg>
                        </div>
                        </div> */}
                            </>
                            
                            }
                            
                            <div onClick={showshareicons} className='icon-share'></div>
                        </div>
                        <div className="flex-wrapper-row " style={{ gap: '30px', marginTop: '3vw',paddingTop:50 }}>

                            <TextBookCover loggedInUser={userId} bookData={bookData} bookProgress={bookProgress} />
                            <div className="flex-wrapper-col fullwidth">

                                <BookTitleAndRating setOpened={setAllRatingsOpened} allRatingsOpened={allRatingsOpened} language={bookData.language} title={bookData.name} rating={bookData.ratingData.avg} numberOfRatings={bookData.ratingData.count} bookReads={bookReads} />

                                <BookButtons userType={userType} bookProgress={bookProgress} language={bookData.language} onButtonPressed={onButtonPressed} />
                                <BookInsideActivity roleType={loggedInUser.userData.type} goToAdditions={goToAdditions} language={bookData.language} bookData={bookData} vocabulariesNumber={vocabulariesNumber} highlightsNumber={highlightsNumber} recordingsNumber={recordingsNumber} notesNumber={notesNumber} />

                            </div>


                        </div>
                        <BookInfo language={bookData.language} bookData={bookData} uid={userId} />
                        {/* {bookData.screenshots.length != 0 ?
                            <BookScreenshots screenShots={bookData.screenshots} language={bookData.language} />
                            :
                            null
                        } */}
                        <div className="flex-wrapper-row greyborder">

                            {bookData.tags.length != 0 &&
                                <BookTags tags={bookData.tags} bookData={bookData} language={bookData.language} />
                            }

                            <BookRatings setAllRatingsOpened={setAllRatingsOpened} userId={userId} BookID={bookId} currentRating={userCurrentRate} bookRatings={bookRatings} language={bookData.language} onSendRating={onSendRating} />
                        </div>
                        <AllRatingsmodal setOpened={setAllRatingsOpened} opened={allRatingsOpened} bookId={bookId} language={bookData.language}></AllRatingsmodal>
                    </div>
                </>
                :
                null

            }
        </div >
    )
}


Book.layout = "In";

export default Book;