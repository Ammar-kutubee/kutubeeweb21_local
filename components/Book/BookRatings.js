import { useTranslation, withTranslation, Trans } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import AllRatingsmodal from './AllRatingsmodal'
import UserRateModal from './UserRateModal'


export default function BookRatings({ BookID, toggleUserRating, bookRatings, language, onAllRatings, currentRating, onSendRating, userId, setAllRatingsOpened }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    return (
        <div className="ratingsWrapper ">
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div className="sectionTitle">{t('bookScreen.rating', { lng: language })}</div>
                <div>
                    <UserRateModal currentRating={currentRating} userId={userId} bookId={BookID} language={language} onSendRating={onSendRating}></UserRateModal>
                </div>
            </div>
            <div className="ratingList">
                {bookRatings.map((rating, index) => {
                    return <div className={`rating ${bookRatings.length - 1 == index ? 'lastRating' : ''}`} key={rating._id}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                src={rating.avatarlink}
                                className="userRatingAvatar"
                            />
                            <div className="userRating">{rating.lname != undefined ? rating.fname + ' ' + rating.lname : rating.fname}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', display: 'flex' }}>
                            <div className="icon-full-star" name={'full-star'} style={{ color: '#FFD217', fontSize: '18px' }} />
                            <div className="userRating">{rating.rate_value}</div>
                        </div>
                    </div>
                })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
                <div />
                <div>
                    <div onClick={() => setAllRatingsOpened(true)} className={`addRateText ${language == 'ar' ? 'arabicText' : ''}`}>{t('bookScreen.viewAllRatings', { lng: language })}</div>
                    {/* <div className={`addRateText ${language == 'ar' ? 'arabicText' : ''}`}>{t('bookScreen.viewAllRatings', { lng: language })}</div */}


                </div>
            </div>
        </div>
    )
}
