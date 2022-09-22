import { getCategories, getContinueReading, getUserFav } from '../../src/utils/apis'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useEffect, useRef, useState } from 'react'
import { getCategoriesBooks } from '../../src/utils/apis'
import BookOutside from '../../components/BookOutside';
import Insidelayout from '../../components/layouts/insidelayout'
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { getTagBooks } from '../../src/utils/apis';

import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import withAuth from '../../src/utils/withAuth';
import { useWindowSize } from '../../src/utils/useWindowSize';

const Tagbooks = () => {
    const state = useSelector(state => state.mainReducer)
    const loggedInUser = state.loggedInUser
    const router = useRouter()
    const { value } = router.query
    const { tagname } = router.query

    const { t, i18n } = useTranslation([], { useSuspense: false });
    const [tabIndex, setTabIndex] = useState(0);
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false);
    const [noOfColumns, setNoOfColumns] = useState(null);
    const booksWrapper = useRef(null)
    const resize = useWindowSize()

    const isRTL = (string) => {
        var ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF'
        var rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC'
        var rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']')
        console.log("rrrr", rtlDirCheck.test(string))
        return rtlDirCheck.test(string)
    };
    useEffect(async () => {
        if (!router.isReady) return;

        let books = []
        setLoading(true)


        books = await getTagBooks(loggedInUser.userData._id, value)


        setBooks(books)
        setLoading(false)

    }, [router.isReady, value]);
    useEffect(() => {
        setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190))
        return () => {

        }
    }, [booksWrapper])
    useEffect(() => {
        setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190))
        return () => {

        }
    }, [resize])

    const bookslist = books.map((book) =>

        <BookOutside book={book} bookWidth={160} bookMargin={15} itemWidth={160} index={0} noOfColumns={noOfColumns} />

    );
    return (
        <>
            <div className={`sectionTitle ${isRTL(tagname) ? 'rtlDir' : ltrDir}`}>
                {tagname}
            </div>
            <div ref={booksWrapper} className={`bookswrapper  ${isRTL(tagname) ? 'rtlDir' : ltrDir}`}>

                {bookslist}
            </div>
        </>
    )
}


Tagbooks.layout = "In";

export default Tagbooks;
