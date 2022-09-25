import { useTranslation, withTranslation, Trans } from 'react-i18next';
import React, { useEffect, useRef, useState } from 'react';
import BookOutside from '../components/BookOutside';
import { getCategories, getContinueReading, getUserFav } from '../src/utils/apis';
import { useSelector } from 'react-redux';
import { useWindowSize } from '../src/utils/useWindowSize';
import { useRouter } from 'next/router';
const ContinueBooks = ({ userId }) => {
	const { t, i18n } = useTranslation([], { useSuspense: false });
	const [books, setBooks] = useState([]);
	const [fav, setFav] = useState([]);
	const [continueReading, setContinueReading] = useState([]);
	const [reloading, setReloading] = useState(false);
	const booksWrapper = useRef(null);
	const [noOfColumns, setNoOfColumns] = useState(null);
	const resize = useWindowSize();
	const router = useRouter();
	const tabslang = router.query.tabslang;
	useEffect(async () => {
		setReloading(true);
		setContinueReading([]);
		const favBooks = await getUserFav(userId, tabslang, true);
		setFav(favBooks);

		setReloading(false);
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
	const onFavAll = async () => {
		console.log('onFavAll');
		let favBooks = await getUserFav(loggedInUser.userData._id, tabslang, true);
		setFav(favBooks);
	};
	const favbooksitems = fav
		.slice(0, noOfColumns)
		.map((book) => (
			<BookOutside onFavAll={onFavAll} book={book} bookWidth={160} bookMargin={15} itemWidth={160} index={0} noOfColumns={noOfColumns} />
		));

	return (
		<div>
			{continueReading.length != 0 && (
				<>
					<div className={`section-title ${tabslang == 'ar' ? 'rtlDir' : 'ltrDir'}`} style={{ marginTop: '0px' }}>
						{t('titles.continueReading', { lng: tabslang })}
					</div>
					<div ref={booksWrapper} className={`bookswrapper  ${tabslang == 'ar' ? 'rtlDir' : 'ltrDir'}`}>
						{favbooksitems}
					</div>
				</>
			)}
		</div>
	);
};

ContinueBooks.layout = 'In';

export default ContinueBooks;
