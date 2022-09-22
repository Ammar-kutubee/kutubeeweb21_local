import { getDynamicBookHeight, getFriendsList } from '../../src/utils/apis'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import React, { useEffect, useState } from 'react'
import LevelDescriptionpopup from './LevelDescriptionpopup';
import FriendsModal from './FriendsModal';
import StudentProfileModal from './StudentProfileModal';

export default function BookInfo({ bookData, uid }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [Friends, setFriends] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = React.useState(false)
    const [userID, setuserID] = React.useState(false)

    useEffect(async () => {
        setFriends([])
        setLoading(true)
        let friends = await getFriendsList(uid, bookData._id, false)


        // let friends = [
        //     {
        //         "_id": "user_34",
        //         "avatarlink": "../assets/images/bee.png",
        //         "lname": "Almousa",
        //         "fname": "Nardine",
        //         "grade": "One B"
        //     },
        //     {
        //         "_id": "user_35",
        //         "avatarlink": "../assets/images/bee.png",

        //         "lname": "Almousa",
        //         "fname": "Nardine",
        //         "grade": "One A"
        //     },
        //     {
        //         "_id": "user_35",
        //         "avatarlink": "../assets/images/bee.png",

        //         "lname": "Almousa",
        //         "fname": "Nardine",
        //         "grade": "One A"
        //     },

        // ]
        setFriends(friends)
        setLoading(false)

        return () => {

        }
    }, [])
    const data = {
        publsherName: "Ahmad Mahmoud",
        writerName: "Khaled mohamad",
        bookLevel: "1",
        bookDescription: "Lorem ipsum dolor sit amet, consectetur adi elit. Suspendisse viverra enim et diam maximus dapibus. Vestibulum volutpat nibh pellentesque lacus porta, vitae semper ex molestie."
    }
    const bookLevel = () => {
        if (bookData.language == 'ar') {
            if (bookData.level21[0]) {
                return bookData.level21[0].nameAr
            } else {
                return ''
            }

        } else if (bookData.language == 'en') {
            if (bookData.levelEn[0]) {
                return bookData.levelEn[0].nameAr
            } else {
                return ''
            }


        } else if (bookData.language == 'fr') {
            if (bookData.levelFr[0]) {
                return bookData.levelFr[0].nameAr
            } else {
                return ''
            }
        }
        return ''
    }
    const bookLeveldes = () => {
        if (bookData.language == 'ar') {
            if (bookData.level21[0]) {
                return bookData.level21[0].description
            } else {
                return ''
            }

        } else if (bookData.language == 'en') {
            if (bookData.levelEn[0]) {
                return bookData.levelEn[0].description
            } else {
                return ''
            }


        } else if (bookData.language == 'fr') {
            if (bookData.levelFr[0]) {
                return bookData.levelFr[0].description
            } else {
                return ''
            }
        }
        return ''
    }
    const showStudentProfile = (id) => {
        setuserID(id)
        setOpen(true)

    }
    const onOpenStudentProfile = (id) => {
        setuserID(id)
        setOpen(true)
    }
    return (
        <div className="bookInfoWrapper ">
            <div className="bookInfoColumn">
                <div className={`bookInfoTitle ${bookData.language == 'ar' ? 'arabicTex t' : ''} `}>{t('bookScreen.publisherName', { lng: bookData.language })}</div>
                <div className="bookInfoText">{bookData.publisherName}</div>
            </div>
            <div className="bookInfoColumn">
                <div className={`bookInfoTitle ${bookData.language == 'ar' ? 'arabicText ' : ''} `}>{t('bookScreen.writerName', { lng: bookData.language })}</div>
                <div className="bookInfoText" >{bookData.author}</div>
            </div>
            <div className="bookInfoColumn">
                <div className={`bookInfoTitle ${bookData.language == 'ar' ? 'arabicText ' : ''}`}>{t('bookScreen.bookLevel', { lng: bookData.language })}</div>
                <div>
                    <div style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center' }}>
                        <div className={`bookInfoText leveltext yellow ${bookData.language == 'ar' ? 'arabicText' : ''}`}> {bookLevel()}</div>
                        <LevelDescriptionpopup Title={bookLevel()} Description={bookLeveldes()} language={bookData.language}> <div name="info" className="infoIcon icon-info" /></LevelDescriptionpopup>
                    </div>
                </div>
            </div>
            {Friends.length > 0 &&
                <div className="bookInfoColumn">
                    <div className={`bookInfoTitle ${bookData.language == 'ar' ? 'arabicText ' : ''} `}>{t('bookScreen.friends', { lng: bookData.language })}</div>
                    <div className="flex-wrapper-row">
                        <div className="flex-wrapper-row">
                            {Friends.map((friend, index) => {
                                return <img onClick={() => { showStudentProfile(friend._id) }}
                                    src={friend.avatarlink}
                                    className="userRatingAvatar"
                                    style={index !== Friends.length - 1?{margin:"0px -8px"}:{margin:"0px -8px 0px 0px"}}
                                />
                            })}
                        </div>
                        <FriendsModal language={bookData.language} bookId={bookData._id} uid={uid} onOpenStudentProfile={onOpenStudentProfile} />
                        <StudentProfileModal language={bookData.language} uid={userID} open={open} setOpen={setOpen} />
                    </div>
                </div>
            }
            <div className="bookInfoColumn bookInfoFullColumn">
                <div className={`bookInfoTitle ${bookData.language == 'ar' ? 'arabicText ' : ''}`}>{t('bookScreen.bookDescription', { lng: bookData.language })}</div>
                <div className="bookInfoText">{bookData.description}</div>
            </div>


        </div>
    )
}
