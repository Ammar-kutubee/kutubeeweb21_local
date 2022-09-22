import Insidelayout from '../../components/layouts/insidelayout'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useEffect, useRef, useState } from 'react'
import { getUserLevelBooks, getUserLevelData } from '../../src/utils/apis'
import BookOutside from '../../components/BookOutside';
import { useDispatch, useSelector } from 'react-redux';
import withAuth from '../../src/utils/withAuth';
import CompletedBooksGraph from '../../components/CompletedBooksGraph';
import Skeleton from 'react-loading-skeleton';
import { Loader, Segment } from 'semantic-ui-react';
import { useWindowSize } from '../../src/utils/useWindowSize';
import LockedLevel from "../../components/LockedLevel";
import LevelDescriptionpopup from '../../components/Book/LevelDescriptionpopup';
import { useRouter } from 'next/router';

const Home = () => {
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [tabIndex, setTabIndex] = useState(0);
    const [noOfColumns, setNoOfColumns] = useState(null);
    const [books, setBooks] = useState([])
    const tabLang = useSelector(state => state.mainReducer.tabLang)
    const [tabslang, setTabslang] = useState(tabLang)
    const state = useSelector(state => state.mainReducer)
    const mainState = useSelector(state => state)

    const loggedInUser = state.loggedInUser
    const [currentLanguage, setCurrentLanguage] = useState('ar')
    const [userLevelLoading, setUserLevelLoading] = useState(true)
    const [userLevel, setUserLevel] = useState(null)
    const [locked, setLocked] = useState(null)
    const dispatch = useDispatch()
    const router = useRouter()

    const booksWrapper = useRef(null)
    const resize = useWindowSize()
    const handleSelect = (key) => {
        console.log('chaaaange', key)
        if (key == 0) {
            setTabslang('ar')
            setCurrentLanguage('ar')
            dispatch({
                type: 'PLACEMENT_LANG',
                placementLanguage: tabslang,
            })
            dispatch({
                type: 'CHANGE_TAB_LANGUAGE',
                tabLang: 'ar',
            })

        }
        else if (key == 1) {
            setTabslang('en')
            setCurrentLanguage('en')
            dispatch({
                type: 'PLACEMENT_LANG',
                placementLanguage: tabslang,
            })
            dispatch({
                type: 'CHANGE_TAB_LANGUAGE',
                tabLang: 'en',
            })


        }
        else if (key == 2) {
            setTabslang('fr')
            setCurrentLanguage('fr')
            dispatch({
                type: 'PLACEMENT_LANG',
                placementLanguage: tabslang,
            })
            dispatch({
                type: 'CHANGE_TAB_LANGUAGE',
                tabLang: 'fr',
            })

        }
        setTabIndex(key)

    }




    useEffect(async () => {

        setTabslang(tabLang)
        if (tabslang == "ar") {
            setTabIndex(0)

        }
        if (tabslang == "en") {
            setTabIndex(1)

        }
        if (tabslang == "fr") {
            setTabIndex(2)

        }
        setCurrentLanguage(tabLang)

        setUserLevelLoading(true)
        dispatch({
            type: 'PLACEMENT_LANG',
            placementLanguage: tabslang,
        })
        const books = await getUserLevelBooks(loggedInUser.userData._id, tabslang)
        // setBooks(books.bookData)
        if (books.userLock) {
            setBooks(['locked'])
            setLocked(true)
        } else {
            setBooks([...books.bookData])
            setLocked(false)

            setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190))

        }
        const userLevel = await getUserLevelData(loggedInUser.userData._id, tabslang)
        setUserLevel(userLevel)
        setUserLevelLoading(false)
        return () => {

        }
    }, [currentLanguage, loggedInUser, tabslang])
    useEffect(() => {

        console.log("mainState",mainState)
        if (locked == false) {

            setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190))
        }
        return () => {

        }
    }, [booksWrapper])
    useEffect(() => {

    
        if (locked == false) {

            setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190))
        }
        return () => {

        }
    }, [resize])
    const CustomTab = ({ children }) => (
        <Tab selectedClassName="active-tab">
            <h3>{children}</h3>
        </Tab>
    );
    let booksitems = []
    CustomTab.tabsRole = 'Tab'; // Required field to use your custom Tab
    if (locked == false) {


        booksitems = books.map((book) =>
            <BookOutside dest={"?type=levels"} book={book} bookWidth={160} bookMargin={15} itemWidth={160} index={0} noOfColumns={noOfColumns} />
        );
    }

    return (
        <>
            {/* <div className="mainTitle">
                {t('titles.yourLevel', { lng: 'en' })}
            </div>
            <div className="mainNumber"> 10</div> */}
            {locked == true ?

                <div className="blur" >

                    <CompletedBooksGraph currentLanguage={tabslang} locked={"true"} userLevel={userLevel} userLevelLoading={userLevelLoading} />
                </div>
                :
                <div>
                    <CompletedBooksGraph currentLanguage={tabslang} locked={"false"} userLevel={userLevel} userLevelLoading={userLevelLoading} />
                </div>
            }

            <Tabs selectedTabClassName="active-tab" selectedIndex={tabIndex} onSelect={handleSelect} className={`${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`} >
                <div className={`flex-wrapper-row  sticky-top `}>

                    <TabList activeTabClassName="ActiveTab" className="level-tabs sticky-top">
                        <Tab>عربي</Tab>
                        <Tab>English</Tab>
                        <Tab>Français</Tab>


                    </TabList>
                </div>
                <TabPanel>
                    {locked == true ?

                        <>
                            <div style={{ position: 'relative' }}>
                                <div> <img src="../assets/images/blured.jpg" /> </div>

                                <LockedLevel currentLanguage={tabslang} userLevel={userLevel} uid={loggedInUser.userData._id} />
                            </div>
                        </>
                        :
                        <div

                            ref={booksWrapper}
                            className={`bookswrapper  ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>
                            {userLevelLoading ?
                                <div class="ui bottom attached segment active loading tab"></div>
                                :
                                booksitems
                            }
                        </div>
                    }
                </TabPanel>
                <TabPanel>
                    {locked == true ?
                        <div style={{ position: 'relative' }}>
                            <div> <img src="../assets/images/blured.jpg" /> </div>

                            <LockedLevel currentLanguage={tabslang} userLevel={userLevel} uid={loggedInUser.userData._id} />
                        </div>

                        :
                        <div
                            ref={booksWrapper}
                            className={`bookswrapper  ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>
                            {userLevelLoading ?
                                <div class="ui bottom attached segment active loading tab"></div>

                                :
                                booksitems
                            }
                        </div>
                    }
                </TabPanel>
                <TabPanel>
                    {locked == true ?
                        <div style={{ position: 'relative' }}>
                            <div> <img src="../assets/images/blured.jpg" /> </div>

                            <LockedLevel currentLanguage={tabslang} userLevel={userLevel} uid={loggedInUser.userData._id} />
                        </div>

                        :
                        <div

                            ref={booksWrapper}
                            className={`bookswrapper  ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>
                            {userLevelLoading ?
                                <div class="ui bottom attached segment active loading tab"></div>

                                :
                                booksitems
                            }
                        </div>
                    }
                </TabPanel>

            </Tabs>

        </>

    )
}




Home.layout = "In";

export default Home;