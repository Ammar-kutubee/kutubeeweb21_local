import { getCategories, getContinueReading, getPublisherBooks, getUserFav } from '../../src/utils/apis';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, { useEffect, useRef, useState } from 'react';
import { getCategoriesBooks } from '../../src/utils/apis';
import BookOutside from '../../components/BookOutside';
import Insidelayout from '../../components/layouts/insidelayout';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import FilterModal from '../../components/Filter/FilterModal';

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import withAuth from '../../src/utils/withAuth';
import { useWindowSize } from '../../src/utils/useWindowSize';
import Head from 'next/head';

const Category = () => {
	const state = useSelector((state) => state.mainReducer);
	const loggedInUser = state.loggedInUser;
	const router = useRouter();

	// we can put them in  one line !!
	const { id } = router.query;
	const { catname } = router.query;
	const { type } = router.query;
	const { objecttype } = router.query;

	const [noOfColumns, setNoOfColumns] = useState(null);
	const booksWrapper = useRef(null);
	const { t, i18n } = useTranslation([], { useSuspense: false });
	const [tabIndex, setTabIndex] = useState(0);
	const [books, setBooks] = useState([]);
	const [tabslang, setTabslang] = useState('ar');
	const [loading, setLoading] = useState(false);
	const resize = useWindowSize();

	const isRTL = (string) => {
		var ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' + '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
		var rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
		var rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');
		console.log('rrrr', rtlDirCheck.test(string));
		return rtlDirCheck.test(string);
	};
	useEffect(() => {
		if (booksWrapper.current) {
			setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190));
		}
		return () => {};
	}, [booksWrapper]);

	useEffect(() => {
		if (booksWrapper.current) {
			setNoOfColumns(Math.floor(booksWrapper.current.clientWidth / 190));
		}
		return () => {};
	}, [resize]);
	useEffect(async () => {
		if (!router.isReady) return;
		let books = [];
		setLoading(true);

		if (objecttype == 'publishers') {
			books = await getPublisherBooks(loggedInUser.userData._id, id);
		} else {
			books = await getCategoriesBooks(loggedInUser.userData._id, id);

			if (books.length > 0) {
				setTabslang(books[0].language);
			}
		}

		setBooks(books);
		setLoading(false);
	}, [router.isReady, id]);

	const bookslist = books.map((book) => (
		<BookOutside book={book} bookWidth={160} bookMargin={15} itemWidth={160} index={0} noOfColumns={noOfColumns} />
	));
	return (
		<>
			{/* <BackCrumb type={"cat"} language={`${isRTL(catname) ? 'ar' : 'en'}`} /> */}
			<div className={`sectionTitle flex-wrapper-row ${isRTL(catname) ? 'rtlDir' : 'ltrDir'}`} style={{ justifyContent: 'space-between' }}>
				{catname}
				<FilterModal type={type} currentLanguage={tabslang}></FilterModal>
			</div>
			{!loading ? (
				<>
					<div ref={booksWrapper} className={`bookswrapper  ${isRTL(catname) ? 'rtlDir' : 'ltrDir'}`}>
						{bookslist}
					</div>
				</>
			) : (
				<div class='ui bottom attached segment active loading tab'></div>
			)}
		</>
	);
};

Category.layout = 'In';

export default Category;
