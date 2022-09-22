import Illustrations from '../../components/Illustrations';

export default function Layout({ children }) {
	return (
		<>
			<Illustrations></Illustrations>
			<main>{children}</main>
		</>
	);
}
