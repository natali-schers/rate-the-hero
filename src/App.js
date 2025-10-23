import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Search } from './screens/Search';
import { Details } from './screens/Details';
import { NotFound } from './screens/NotFound';
import { NormalizeStyles } from './shared/NormalizeStyles';
import { Header } from './common-components/Header/Header';

export function App() {
	return (
		<>
			<NormalizeStyles />
			<Header />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Search />} />
					<Route path="/details/:id" element={<Details />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}