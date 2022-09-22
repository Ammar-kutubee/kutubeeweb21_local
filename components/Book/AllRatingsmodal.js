import React, { useEffect, useRef, useState } from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'
import CustomButton from '../../components//CustomButton'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'
import { getBookRatings } from '../../src/utils/apis';
export default function AllRatingsmodal({ language, bookId, opened, setOpened }) {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [open, setOpen] = React.useState(false)
    const [ratings, setRatings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        setRatings([])
        setLoading(true)
        let ratings = await getBookRatings(bookId, true)
        setRatings(ratings)
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
            <Modal className={` ratingsmodal ${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}
                open={opened}
                mountNode={document.querySelector('.themewrapper')}
                size="tiny"
                onClose={() => setOpened(false)}
                onOpen={() => setOpened(true)}
            >
                <Modal.Header> <div style={{

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }} className={`sectionTitle ${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}>
                    {ratings.length}  {t('bookScreen.ratings', { lng: language })}

                </div>
                    <Modal.Actions >
                        <Button class="ui icon button" onClick={() => setOpened(false)} primary>
                            <i class="bluek large close icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal.Header>

                <Modal.Content scrolling>

                    <Modal.Description className={`${language == 'ar' ? 'rtlDir' : 'ltrDir'}`}>
                        <div className="ratingList">
                            {ratings.map((rating, index) => {
                                return <div className={`rating ${ratings.length - 1 == index ? 'lastRating' : ''}`} key={rating._id}>
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
                    </Modal.Description>
                </Modal.Content>

            </Modal>

        </div >
    )
}