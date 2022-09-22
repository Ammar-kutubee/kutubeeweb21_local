import '../styles/globals.css';
import '../styles/style.scss';
import '../src/i18n/i18n';
import 'semantic-ui-css/semantic.min.css';
import withRedux, { createWrapper } from 'next-redux-wrapper';
import { Provider, useDispatch } from 'react-redux';
import configureStore from '../store/configureStore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import withAuth from '../src/utils/withAuth';
import Layout1 from '../components/layouts/Layout';
import Layout2 from '../components/layouts/insidelayout';
import Layout3 from '../components/layouts/Empty';

import Insidelayout from '../components/layouts/insidelayout';
import i18n from '../src/i18n/i18n';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Head from 'next/head';
import MessageItem from '../components/MessageItem';
import router from 'next/router';
const layouts = {
	Out: Layout1,
	In: Layout2,
	Empt: Layout3,
};
const env = process.env.NODE_ENV;

if (env != 'development') {
	console.log = () => {};
}
function MyApp({ Component, pageProps, userId }) {
	const dispatch = useDispatch();
	const { appTheme, appLanguage } = useSelector((state) => state.mainReducer);

	const [fixedStyle, setFixedStyle] = useState({});

	// const loggedInUser = state.loggedInUser
	useEffect(async () => {
		i18n.changeLanguage('en');
		// checkuser()
	}, []);

	// Use the layout defined at the page level, if available
	const Layout = layouts[Component.layout] || ((children) => <>{children}</>);

	const scrollPage = (e) => {
		if (window.scrollY > 300) {
			setFixedStyle({ opacity: 1, visibility: 'visible' });
		} else {
			setFixedStyle({ opacity: 0, visibility: 'hidden' });
		}
	};
	useEffect(async () => {
		document.addEventListener('scroll', scrollPage);

		const appLanguage = await localStorage.getItem('appLanguage');
		// console.log('loaded lang', appLanguage)
		if (appLanguage) {
			dispatch({ type: 'CHANGE_LANGUAGE', appLanguage });
		} else {
			dispatch({ type: 'CHANGE_LANGUAGE', appLanguage: 'en' });
		}

		i18n.changeLanguage(appLanguage, (err, t) => {
			if (err) return console.log('something went wrong loading', err);
			else {
			}
		});
		const appColor = await localStorage.getItem('AppColor');
		if (appColor) {
			dispatch({ type: 'CHANGE_THEME', appTheme: appColor });
		} else {
			dispatch({ type: 'CHANGE_THEME', appTheme: 'blue-theme' });
		}
		return () => {
			document.removeEventListener('scroll', scrollPage);
		};
	}, []);

	const GoToTop = (e) => {
		console.log('GoToTop');
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};

	return (
		<Provider store={configureStore}>
			{/* <Head>
        <link rel="stylesheet" href="https://use.typekit.net/wju2pbz.css" />
      </Head> */}
			<Head>
				<title>منصة كتبي للقراءة التفاعلية</title>
			</Head>

			<div className={` themewrapper ${appTheme} ${appLanguage == 'ar' ? 'rtlDir' : ''}`}>
				{/* <PerfectScrollbar> */}
				<Layout>
					<MessageItem></MessageItem>
					<div className='floatBt' onClick={GoToTop} style={fixedStyle}>
						<div>
							<svg width={18} height={18} fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path d='M16 9 9 2 2 9M9 2v14' stroke='#fff' strokeWidth={3} strokeLinecap='round' strokeLinejoin='round' />
							</svg>
						</div>
						<div>Go up</div>
					</div>
					<Component {...pageProps} userId={userId} />
				</Layout>
				{/* </PerfectScrollbar> */}
			</div>
		</Provider>
	);
}

const makestore = () => configureStore;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(withAuth(MyApp));
