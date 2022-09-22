import { getDynamicBookHeight } from '../../src/utils/apis'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { toggleFavorite } from '../../src/utils/apis'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkIfBookFav } from '../../src/utils/functions';


export default function TextBookCover({ bookWidth, bookData, bookProgress, loggedInUser, favBooks }) {
    console.log('bookprog', bookProgress)
    const state = useSelector(state => state.mainReducer)

    let fav = checkIfBookFav(bookData._id, state.favBooks.favBooks)
    const [favoriteLoading, setFavoriteLoading] = useState(false)
    // let fav = checkIfBookFav(bookData._id, favBooks)
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const dispatch = useDispatch()
    const language = i18n.language
    const onFav = async () => {
        if (state.loggedInUser && !favoriteLoading) {

            setFavoriteLoading(true)
            let favorite = await toggleFavorite(state.loggedInUser.userData._id, bookData._id, fav, dispatch)
            if (!fav)
                if (language == "ar") {
                    { dispatch({ type: 'CHANGE_MESSAGE', message: "تم إضافة الكتاب للمفضلة بنجاح" }) }
                }
                else { dispatch({ type: 'CHANGE_MESSAGE', message: "Book Added to Favorite Successfully" }) }

            // onFavAll && onFavAll()
            setFavoriteLoading(false)

        }


    }
    return (
        <div>
            <div className="bookWrapper">
                <div
                    className="coverWrapper">

                    <img className="cover inside-book-cover" src={bookData.coverPhoto} />

                </div>
                <div className="progressBarWrapper">
                    <div className="progressBar">
                        {console.log('bookProgress.bookProgress.propgress', bookProgress.bookProgress.propgress)}
                        <div className="progressBarGreen" style={{
                            width: bookProgress.bookProgress.progress + '%'

                        }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: bookData.language == 'ar' ? 0 : 5, marginRight: bookData.language == 'ar' ? 5 : 0, alignItems: 'center', justifyContent: 'center' }}>
                        <div name={'book'} className="typeIcon icon-book" />
                        <div className="typeText">{t('book.book', { lng: bookData.language })}</div>
                    </div>
                </div>
                <div
                    className="fav"
                    onClick={onFav}
                >
                    <div>
                        <div name={fav ? 'favorite' : 'favorite-border'} className={`${fav ? 'icon-full-heart' : 'icon-empty-heart'} favIcon`} />
                    </div>

                </div>
            </div>
        </div>
    )
}
