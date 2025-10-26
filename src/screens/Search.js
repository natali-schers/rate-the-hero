import React from 'react';
import { Flex, Box } from 'reflexbox';
import styled from 'styled-components';
import { Button } from '../common-components/Button/Button';
import { SearchField } from '../common-components/SearchField/SearchField';
import { HeroCard } from '../components/HeroCard/HeroCard';
import { Spaces } from '../shared/DesignTokens';
import axios from 'axios';

async function searchHero(heroName) {
	const { data } = await axios.get(`/search/${heroName}`, {
		baseURL: `${process.env.REACT_APP_SUPER_HERO_API_BASE_URL}/${process.env.REACT_APP_SUPER_HERO_API_KEY}`,
	});
	return data.results || [];
}

const HeroesGrid = styled(Box)`
	display: grid;
	grid-template-columns: 1fr;
	gap: ${Spaces.ONE_HALF};
	@media (min-width: 1024px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: ${Spaces.TWO};
	}
`;

export function Search() {
	const [heroes, setHeroes] = React.useState([]);
	const [search, setSearch] = React.useState({
		value: '',
		doSearch: false,
	});

	function handleUpdateSearchValue({ target: { value } }) {
		setSearch((prevValue) => ({ ...prevValue, value }));
	}

	function handleSearch() {
		setSearch((prevValue) => ({ ...prevValue, doSearch: true }));
	}

	React.useEffect(() => {
		if (search.doSearch) {
			searchHero(search.value).then((heroes) => {
				setHeroes(heroes);
				setSearch((prevValue) => ({ ...prevValue, doSearch: false }));
			});
		}
	}, [search]);

	return (
		<>
			<Flex
				width={['100%', '600px']}
				mx={[Spaces.None, 'auto']}
				mt={[Spaces.THREE, Spaces.FIVE]}
				px={[Spaces.ONE, Spaces.NONE]}
				mb={[Spaces.TWO, Spaces.FOUR]}
			>
				<Box flexGrow="1">
					<SearchField
						placeholder="Digite um nome de herói ou heroína"
						onKeyUp={handleUpdateSearchValue}
					/>
				</Box>
				<Box ml={Spaces.TWO}>
					<Button onClick={handleSearch}>Buscar</Button>
				</Box>
			</Flex>

			<HeroesGrid
				px={[Spaces.ONE, Spaces.TWO]}
				pb={[Spaces.ONE, Spaces.TWO]}
			>
				{heroes.map((hero) => (
					<HeroCard
						key={hero.id}
						id={hero.id}
						secretIdentity={hero.biography['full-name']}
						name={hero.name}
						picture={hero.image.url}
						universe={hero.biography.publisher}
					/>
				))}
			</HeroesGrid>
		</>
	);
}