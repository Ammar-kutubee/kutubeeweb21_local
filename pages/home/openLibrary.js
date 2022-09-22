import Insidelayout from '../../components/layouts/insidelayout'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useEffect, useRef, useState } from 'react'
import { getPublishers, getUserLevelBooks } from '../../src/utils/apis'
import BookOutside from '../../components/BookOutside';
import { getCategories, getContinueReading, getUserFav } from '../../src/utils/apis'
import GridItemindex from '../../components/Categoryitem/index'
import FilterModal from '../../components/Filter/FilterModal';
import { useDispatch, useSelector } from 'react-redux';
import withAuth from '../../src/utils/withAuth';
import { useWindowSize } from '../../src/utils/useWindowSize';
import router from 'next/router';


const OpenLibrary = () => {
    const state = useSelector(state => state.mainReducer)
    const loggedInUser = state.loggedInUser
    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [tabIndex, setTabIndex] = useState(0);
    const [books, setBooks] = useState([])
    const tabLang = useSelector(state => state.mainReducer.tabLang)
    const [tabslang, setTabslang] = useState(tabLang)
    // const sections = ['Favorites', 'Subjects', 'Subjects', 'PYP-Transdisciplinary', 'Arabic Leveled Reading', 'Age', 'Publishers']
    const [sections, setSections] = useState(['Loading'])
    const [categories, setCategories] = useState([])
    const [publishers, setPublishers] = useState([])

    const [fav, setFav] = useState([])
    const [continueReading, setContinueReading] = useState([])
    const [reloading, setReloading] = useState(false)
    const booksWrapper = useRef(null)
    const [noOfColumns, setNoOfColumns] = useState(null);
    const resize = useWindowSize()
    const dispatch = useDispatch()

    const handleSelect = (key) => {
        if (key == 0) {
            setTabslang('ar')
            dispatch({
                type: 'CHANGE_TAB_LANGUAGE',
                tabLang: 'ar',
            })

        }
        else if (key == 1) {
            setTabslang('en')
            dispatch({
                type: 'CHANGE_TAB_LANGUAGE',
                tabLang: 'en',
            })


        }
        else if (key == 2) {
            setTabslang('fr')
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

        setReloading(true)

        setFav([])
        setContinueReading([])
        setCategories([])
        const continueReadingBooks = await getContinueReading(loggedInUser.userData._id, tabslang, true)
        setContinueReading(continueReadingBooks)
        const favBooks = await getUserFav(loggedInUser.userData._id, tabslang, true)
        setFav(favBooks)
        const cats = await getCategories(loggedInUser.userData._id, tabslang, true)
        setCategories(cats.children)
        const pubs = await getPublishers(tabslang)
        setPublishers(pubs)
        setReloading(false)
        if (booksWrapper.current) {
            setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190))
        }
        return () => {

        }

    }, [tabslang, booksWrapper])

    useEffect(() => {
        if (booksWrapper.current) {
            setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190))
        }
        return () => {

        }
    }, [resize])
    const onFavAll = async () => {
        console.log('onFavAll')
        let favBooks = await getUserFav(loggedInUser.userData._id, tabslang, true)

        setFav(favBooks)
    }
    const CustomTab = ({ children }) => (
        <Tab >
            <h3>{children}</h3>
        </Tab>
    );
    const goToMore = () => {
        router.push(
            {
                pathname: '/continue_reading_books',
                query: {
                    tabslang

                }
            },
            undefined,
            {
                shallow: true
            })
    }
    const goTofav = () => {
        router.push(
            {
                pathname: '/favorite_books',
                query: {
                    tabslang

                }
            },
            undefined,
            {
                shallow: true
            })
    }

    let continuebooksitems
    continueReading.length >= noOfColumns ?

        continuebooksitems = continueReading.slice(0, noOfColumns).map((book) =>
            <BookOutside dest={"?type=openlibrary"} onFavAll={onFavAll} book={book} bookWidth={160} bookMargin={15} itemWidth={160} index={0} noOfColumns={noOfColumns} />
        )
        :
        continuebooksitems = continueReading.map((book) =>
            <BookOutside dest={"?type=openlibrary"} onFavAll={onFavAll} book={book} bookWidth={160} bookMargin={15} itemWidth={160} index={0} noOfColumns={noOfColumns} />
        )
    let favbooksitems
    fav.length >= noOfColumns ?
        favbooksitems = fav.slice(0, noOfColumns).map((book) =>
            <BookOutside dest={"?type=openlibrary"} onFavAll={onFavAll} book={book} bookWidth={160} bookMargin={15} itemWidth={160} index={0} noOfColumns={noOfColumns} />
        )
        :
        favbooksitems = fav.map((book) =>
            <BookOutside dest={"?type=openlibrary"} onFavAll={onFavAll} book={book} bookWidth={160} bookMargin={15} itemWidth={160} index={0} noOfColumns={noOfColumns} />
        )
    return (
        <>

            {/* <div className="mainTitle">
                {t('titles.openLibrary', { lng: 'en' })}
            </div> */}

            <Tabs selectedTabClassName="active-tab" selectedIndex={tabIndex} onSelect={handleSelect} className={`${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`} >
                <div className="flex-wrapper-row sticky-top">
                    <TabList activeTabClassName="ActiveTab" className="level-tabs">
                        <Tab>عربي</Tab>
                        <Tab>English</Tab>

                        <Tab>Français</Tab>

                    </TabList>
                    <FilterModal type={"All"} currentLanguage={tabslang} ></FilterModal>
                </div>
                <TabPanel>
                    {reloading ?

                        <div class="ui bottom attached segment active loading tab"></div>
                        : <>
                            {continueReading.length != 0 && loggedInUser.userData.type !== "teacher" &&
                                <>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'revert',
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'

                                    }}>
                                        <div className={`section-title ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`} style={{ marginTop: '2vw' }}>
                                            {t('titles.continueReading', { lng: tabslang })}

                                        </div>
                                        <div onClick={goToMore} className={`viewMore ${tabslang == 'ar' ? 'arabicText' : ''}`}>   {t('search.more', { lng: tabslang })}</div>
                                    </div>
                                    <div
                                        ref={booksWrapper}
                                        className={`bookswrapper  ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>

                                        {continuebooksitems}
                                    </div>
                                </>

                            }
                            {favbooksitems.length != 0 && loggedInUser.userData.type !== "teacher" &&
                                <>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'revert',
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'

                                    }}>
                                        <div className={`section-title ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`} style={{ marginTop: '0px' }}>
                                            {t('titles.favorites', { lng: tabslang })}
                                        </div>
                                        <div onClick={goTofav} className={`viewMore ${tabslang == 'ar' ? 'arabicText' : ''}`}>   {t('search.more', { lng: tabslang })}</div>
                                    </div>
                                    <div
                                        ref={booksWrapper}

                                        className={`bookswrapper  ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>

                                        {favbooksitems}
                                    </div>

                                </>
                            }
                            <div className={`inside-cats ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>
                                {categories.map((cat, index) => {
                                    return <GridItemindex objecttype={"cat"} index={index} home title={cat.name} categories={cat.children} language={"en"} />
                                })}
                            </div>

                            <div className={`inside-cats ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>

                                <GridItemindex objecttype={"publishers"} home title={t('titles.publishers', { lng: tabslang })} categories={publishers} language={tabslang} />

                            </div>
                        </>
                    }
                </TabPanel>
                <TabPanel>
                    {reloading ?

                        <div class="ui bottom attached segment active loading tab"></div>
                        : <>
                            {continueReading.length != 0 && loggedInUser.userData.type !== "teacher" &&
                                <>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row-reverse',
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'

                                    }}>
                                        <div onClick={goToMore} className={`viewMore ${tabslang == 'ar' ? 'arabicText' : ''}`}>   {t('search.more', { lng: tabslang })}</div>

                                        <div
                                            ref={booksWrapper}

                                            className={`section-title ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`} style={{ marginTop: '30px' }}>
                                            {t('titles.continueReading', { lng: tabslang })}
                                        </div>
                                    </div>
                                    <div
                                        ref={booksWrapper}

                                        className={`bookswrapper  ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>
                                        {continuebooksitems}
                                    </div>

                                </>
                            }
                            {favbooksitems.length != 0 && loggedInUser.userData.type !== "teacher" && 
                                <>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'revert',
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'

                                    }}>
                                        <div onClick={goTofav} className={`viewMore ${tabslang == 'ar' ? 'arabicText' : ''}`} style={{ marginTop: '0px' }}>   {t('search.more', { lng: tabslang })}</div>

                                        <div className={`section-title ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>
                                            {t('titles.favorites', { lng: tabslang })}
                                        </div>
                                    </div>
                                    <div className={`bookswrapper  ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>

                                        {favbooksitems}
                                    </div>

                                </>
                            }
                            <div className={`inside-cats ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>
                                {categories.map((cat, index) => {
                                    return <GridItemindex index={index} home title={cat.name} categories={cat.children} language={"en"} />
                                })}
                            </div>
                        </>
                    }
                </TabPanel>
                <TabPanel>
                    {reloading ?

                        <div class="ui bottom attached segment active loading tab"></div>
                        : <>
                            {continueReading.length != 0 && loggedInUser.userData.type !== "teacher" &&
                                <>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'revert',
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'

                                    }}>
                                        <div className={`section-title ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`} style={{ marginTop: '30px' }}>
                                            {t('titles.continueReading', { lng: tabslang })}
                                        </div>
                                        <div onClick={goToMore} className={`viewMore ${tabslang == 'ar' ? 'arabicText' : ''}`} style={{ marginTop: '0px' }}>   {t('search.more', { lng: tabslang })}</div>

                                    </div>

                                    <div
                                        ref={booksWrapper}

                                        className={`bookswrapper  ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>
                                        {continuebooksitems}
                                    </div>

                                </>
                            }
                            {favbooksitems.length != 0 && loggedInUser.userData.type !== "teacher" &&
                                <>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'revert',
                                        width: '100%',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'

                                    }}>
                                        <div className={`section-title ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>
                                            {t('titles.favorites', { lng: tabslang })}
                                        </div>
                                        <div onClick={goTofav} className={`viewMore ${tabslang == 'ar' ? 'arabicText' : ''}`}>   {t('search.more', { lng: tabslang })}</div>
                                    </div>
                                    <div
                                        ref={booksWrapper}

                                        className={`bookswrapper  ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>

                                        {favbooksitems}
                                    </div>

                                </>
                            }
                            <div className={`inside-cats ${tabslang == "ar" ? "rtlDir" : 'ltrDir'}`}>
                                {categories.map((cat, index) => {

                                    return <GridItemindex index={index} home title={cat.name} categories={cat.children} language={"en"} />
                                })}
                            </div>
                        </>
                    }
                </TabPanel>

            </Tabs>
        </>
    )
}



OpenLibrary.layout = "In";

export default OpenLibrary;