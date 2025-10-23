import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Search } from './screens/Search';
import { Details } from './screens/Details';
import { NotFound } from './screens/NotFound';
export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Search />} />
				<Route path="/details/:id" element={<Details />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}