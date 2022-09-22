import React, { useEffect, useRef, useState } from 'react';
import Searchfield from '../components/Search/SearchComp';
import Insidelayout from '../components/layouts/insidelayout';
import { useSelector } from 'react-redux';
import BookOutside from '../components/BookOutside';
import { useWindowSize } from '../src/utils/useWindowSize';
import Cry from '../components/Bees/Cry';
import router from 'next/router';
import { useTranslation } from 'react-i18next';

const Search = () => {
	const { lang } = router.query;
	const { title } = router.query;

	const [noOfColumns, setNoOfColumns] = useState(null);
	const booksWrapper = useRef(null);
	const state = useSelector((state) => state.mainReducer);
	const resize = useWindowSize();
	const { t, i18n } = useTranslation([], { useSuspense: false });

	useEffect(() => {
		// console.log('booksWrapper', booksWrapper.current.clientWidth)
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
	let resultslist = [];
	if (state.searchResults != null) {
		resultslist = state.searchResults.map((book) => (
			<BookOutside book={book} bookWidth={160} bookMargin={15} itemWidth={160} index={0} noOfColumns={noOfColumns} />
		));
	} else resultslist = '';
	return (
		<div>
			{resultslist.length != 0 ? (
				<>
					<div className={`section-title   ${lang == 'ar' ? 'rtlDir' : 'ltrDir'}`}>
						{' '}
						{t('search.searchResults')} {title}
					</div>

					<div ref={booksWrapper} className={`bookswrapper   ${lang == 'ar' ? 'rtlDir' : 'ltrDir'}`} style={{ marginTop: '3vw' }}>
						{resultslist}
					</div>
				</>
			) : (
				<div style={{ justifyContent: 'center', alignItems: 'center', marginTop: '6vw' }} className='flex-wrapper-col'>
					<Cry width={125} height={133}></Cry>
					{/* <div className="section-title"> {t("Sorry! We Could't find any books for")}  {title} </div> */}
					<div className='section-title'>
						{' '}
						{t('search.sorrynobook')} {title}{' '}
					</div>
				</div>
			)}
		</div>
	);
};

Search.layout = 'In';

export default Search;
