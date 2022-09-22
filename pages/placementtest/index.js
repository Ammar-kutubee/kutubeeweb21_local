import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import GridItemindex from '../../components/Categoryitem/index'
import CustomButton from '../../components/CustomButton';
import GlobalAudio from '../../components/PlacementTest/GlobalAudio';
import PlacementTestItem from '../../components/PlacementTest/PlacementTestItem';
import { getFiltersCategories, getUserPlacementTests } from '../../src/utils/apis';
import Insidelayout from '../../components/layouts/insidelayout'
import { useDispatch, useSelector } from 'react-redux';

const PlacementTest = ({ userId }) => {


    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);
    const [books, setBooks] = useState([]);
    const [audioLink, setAudioLink] = useState(null)
    const [audioPaused, setAudioPaused] = useState(true)
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const dispatch = useDispatch()

    // const { currentLanguage } = route.params
    const currentLanguage = useSelector(state => state.mainReducer.placementLanguage)

    useEffect(async () => {

        if (currentLanguage) {
            setBooks([])
            let books = await getUserPlacementTests(userId, currentLanguage)
            setAudioLink(books.ptGeneralAudio)
            setAudioPaused(false)
            setBooks(books.ptList)
        }
        else {
            router.back()
        }

        return () => {
            setAudioPaused(true)

        }
    }, [])

    const onSelectBook = (index) => {
        setSelectedBook(index)
    }
    const goToPlacementTest = () => {
        const placementData = books[selectedBook];
        dispatch({
            type: 'SELECTED_TEST',
            placementData: placementData,
        })
        router.push('/placementtest/description')
    }
    return (


        <div className={` ${currentLanguage == "ar" ? "rtlDir" : "ltrDir"}`} style={{
            flexGrow: 1,
            justifyContent: 'flex-start',
            paddingTop: 50,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '72%',
            margin: 'auto'
        }}>
            {currentLanguage &&
                <div className="placmentbooks" style={{
                    width: '100%',
                    // paddingHorizontal: mScale(20)
                }}>

                    <div className="section-title">{t('placementTest.chooseStory', { lng: currentLanguage })}</div>
                    <div className="testitems">
                        {books.map((book, index) => {
                            return <PlacementTestItem selected={selectedBook == index} data={book} index={index} onSelect={onSelectBook} />
                        })}
                    </div>
                    <div style={{ paddingRight: '4vw', paddingLeft: '4vw' }} className="btn-wrapper-quiz-width">

                        <CustomButton
                            onPress={goToPlacementTest}
                            disabled={selectedBook == null}
                            buttonStyle={{
                                marginTop: '20px'
                            }}
                            text={t('login.next', { lng: currentLanguage })}
                        />
                    </div>
                </div>
            }
            {(audioLink != null && audioLink != '') &&
                <GlobalAudio audioLink={audioLink} paused={audioPaused} />
            }

        </div>

    )

}

PlacementTest.layout = "Empt";

export default PlacementTest;