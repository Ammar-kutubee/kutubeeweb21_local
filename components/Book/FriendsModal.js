import React, { useEffect, useRef, useState } from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'
import CustomButton from '../CustomButton'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { getFriendsList } from '../../src/utils/apis';
export default function FriendsModal({ language, bookId, uid, onOpenStudentProfile }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [open, setOpen] = React.useState(false)

    const [Friends, setFriends] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        setFriends([])
        setLoading(true)
        let friends = await getFriendsList(uid, bookId, true)


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
        //         "_id": "user_36",
        //         "avatarlink": "../assets/images/bee.png",
        //         "lname": "Almousa",
        //         "fname": "Nardine",
        //         "grade": "One B"
        //     },
        //     {
        //         "_id": "user_37",
        //         "avatarlink": "../assets/images/bee.png",
        //         "lname": "Almousa",
        //         "fname": "Nardine",
        //         "grade": "One B"
        //     },
        //     {
        //         "_id": "user_38",
        //         "avatarlink": "../assets/images/bee.png",
        //         "lname": "Almousa",
        //         "fname": "Nardine",
        //         "grade": "One B"
        //     }
        // ]
        setFriends(friends)
        setLoading(false)

        return () => {

        }
    }, [])
    return (
        <div style={{

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>


            <Modal className={`friendsModal ratingsmodal ${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}
                open={open}
                mountNode={document.querySelector('.themewrapper')}
                size="tiny"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                trigger={<div className={`blueText ${language == 'ar' ? 'arabicText' : ''}`}>
                    {Friends.length > 3 ?
                         `${Friends.length - 3} +`  
                        :
                        <> </>

                    }

                </div>}
            >
                <Modal.Header> <div style={{

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }} className={`sectionTitle ${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}>
                    {t('bookScreen.frientsReadThisBook', { lng: language })}

                </div>
                    <Modal.Actions >
                        <Button class="ui icon button" onClick={() => setOpen(false)} primary>
                            <i class="bluek large close icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal.Header>

                <Modal.Content scrolling>

                    <Modal.Description className={`${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}>
                        <div className="ratingList">
                            {Friends.map((friend, index) => {
                                return <div className={`rating ${friend.length - 1 == index ? 'lastRating' : ''}`} key={friend._id} onClick={() => {
                                    onOpenStudentProfile(friend._id)
                                }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <img
                                            src={friend.avatarlink}
                                            className="userRatingAvatar"
                                        />
                                        <div className="userRating" style={{paddingRight:20}}>{friend.lname != undefined ? friend.fname + ' ' + friend.lname : friend.fname}</div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', display: 'flex' }}>
                                        <div className="userRating">{friend.grade}</div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </Modal.Description>
                </Modal.Content>

            </Modal>

        </div >
    )
}