import Link from 'next/link';

const ErrorPage = () => {
	return (
		<div
			className='errorPage'
			style={{ minWidth: '20vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 30, alignItems: 'center' }}
		>
			<title>404 - Page not Found</title>
			<meta name='description' content='The page you are looking for is not found go back to the homepage' />

			<h1 className='title'>404 - Error</h1>
			<h4 className='subtitle font-light'>
				The page you are looking for is not available
				<br /> please go back to homepage
			</h4>

			<Link href='/'>
				<button className='aa'>Back to Homepage</button>
			</Link>

			<br />
		</div>
	);
};

export default ErrorPage;
