import React, { useEffect, useState } from 'react'
import { toggleFavorite } from '../../src/utils/apis';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { checkIfBookFav } from '../../src/utils/functions';
import { useDispatch, useSelector } from 'react-redux';

const BookOutside = ({ onPress,dest, bookWidth, bookMargin, index, itemWidth, readFinished, listenFinished, quizFullmark, quizExist, hideButtons, book, favBooks, loggedInUser, onFavAll, noOfColumns }) => {
    // console.log('book', book)
    const state = useSelector(state => state.mainReducer)

    let fav = checkIfBookFav(book._id, state.favBooks.favBooks)
    // let fav = true
    const [favoriteLoading, setFavoriteLoading] = useState(false)
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const language = i18n.language
    const dispatch = useDispatch()

    const onFav = async () => {
        if (state.loggedInUser && !favoriteLoading) {
            setFavoriteLoading(true)
            let favorite = await toggleFavorite(state.loggedInUser.userData._id, book._id, fav, dispatch)
            if (!fav)
                if (language == "ar") {
                    { dispatch({ type: 'CHANGE_MESSAGE', message: "تم إضافة الكتاب للمفضلة بنجاح" }) }
                }
                else { dispatch({ type: 'CHANGE_MESSAGE', message: "Book Added to Favorite Successfully" }) }
            onFavAll && onFavAll()
            setFavoriteLoading(false)

        }


    }
    return (
        <div className={'bookItemWrapper'} style={{ position: 'relative' }}
            style={{
                width: `calc(100% / ${noOfColumns} - 0.86vw)`
            }}
        >
            <Link 
                        href={
                            dest !== undefined?`/book/${book._id}${dest}`:`/book/${book._id}`}

            // href={`/book/${book._id}?destination=/Assignment/assignment_10084&type=assignment`}
            >


                <div
                    className="bookWrapper">

                    <img className="bg-contain cover" src={book.coverPhoto}

                    />
                    <div className="progressBarWrapper">
                        <div className="progressBar">
                            <div className="progressBarGreen" style={{
                                width: book.bookProgress.progress + '%'
                            }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: book.language == 'ar' ? 0 : 5, marginRight: book.language == 'ar' ? 5 : 0, alignItems: 'center', justifyContent: 'center' }}>
                            <div name={'book'} className="typeIcon icon-book" />
                            <div className={`typeText ${book.language == 'ar' ? 'arabicText' : ''}`}>
                                {book.language ? t('book.book', { lng: book.language }) : t('book.book')}
                            </div>
                        </div>
                    </div>
                    {hideButtons ? null
                        :
                        <div className="buttonsWrapper">
                                                       

                            {book.audioExist ?
                                <div className="button" className={`${book.bookProgress.readmode ? 'buttonFinished' : ""}`}>
                                    {book.quizExist ? <div className="buttonDot" /> : null}
                                    <div className="tick" style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100%',
                                        display: 'flex'
                                    }}>
                                        <div>
                                            <div className={`buttonText ${book.bookProgress.readmode ? 'buttonFinishedText ' : ''} ${book.language == 'ar' ? 'arabicText ' : ''}`}>
                                                {book.language ? t('book.listen', { lng: book.language }) : t('book.listen')}

                                            </div>
                                            {book.bookProgress.readmode ?
                                                <svg
                                                    width={16}
                                                    height={12}
                                                    viewBox="0 0 16 12"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M5.655 7.994l7.053-6.686a1.484 1.484 0 112.042 2.154L7.031 10.78a2 2 0 01-2.752 0L1.136 7.8a1.484 1.484 0 012.042-2.154l2.477 2.348z"
                                                        fill="#86CF0E"
                                                        stroke="#fff"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                            }


<div className={`button ${book.bookProgress.stdmode ? 'buttonFinished ' : ''}`}>
                                <div className="buttonDot" />
                                <div className="tick" style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    display: 'flex'
                                }}>
                                    <div>
                                        <div className={`buttonText ${book.bookProgress.stdmode ? 'buttonFinishedText ' : ''} ${book.language == 'ar' ? 'arabicText ' : ''}`}>
                                            {book.language ? t('book.read', { lng: book.language }) : t('book.read')}</div>
                                        {book.bookProgress.stdmode ?
                                            <svg
                                                width={16}
                                                height={12}
                                                viewBox="0 0 16 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"

                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M5.655 7.994l7.053-6.686a1.484 1.484 0 112.042 2.154L7.031 10.78a2 2 0 01-2.752 0L1.136 7.8a1.484 1.484 0 012.042-2.154l2.477 2.348z"
                                                    fill="#86CF0E"
                                                    stroke="#fff"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            :
                                            null
                                        }
                                    </div>
                                </div>
                            </div>
                            {book.quizExist ?
                                <div className={`button ${book.bookProgress.quiz ? 'buttonFinished ' : ''} lastButton`}>
                                    <div className="tick" style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100%',
                                        display: 'flex'
                                    }}>
                                        <div>
                                            <div className={`buttonText ${book.bookProgress.quiz ? 'buttonFinishedText' : ''} ${book.language == 'ar' ? 'arabicText' : ''}`}>
                                                {book.language ? t('book.quiz', { lng: book.language }) : t('book.quiz')}</div>
                                            {book.bookProgress.quiz ?
                                                <svg
                                                    width={16}
                                                    height={12}
                                                    viewBox="0 0 16 12"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"

                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M5.655 7.994l7.053-6.686a1.484 1.484 0 112.042 2.154L7.031 10.78a2 2 0 01-2.752 0L1.136 7.8a1.484 1.484 0 012.042-2.154l2.477 2.348z"
                                                        fill="#86CF0E"
                                                        stroke="#fff"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                            }
                            {/* <RectButton style={styles.button}>
                    </RectButton> */}
                        </div>
                    }

                </div>

            </Link>
            <div
                className="fav"
                onClick={onFav}
            >
                <div>

                    <div>
                        <div name={fav ? 'favorite' : 'favorite-border'} className={`${fav ? 'icon-full-heart' : 'icon-empty-heart'} favIcon`} />
                    </div>
                </div>

            </div >
        </div >
    )
}

// const mapStateToProps = (state) => ({
//     loggedInUser: state.mainReducer.loggedInUser,
//     favBooks: state.mainReducer.favBooks
// })

// export default connect(mapStateToProps)(React.memo(BookOutside));
export default BookOutside;