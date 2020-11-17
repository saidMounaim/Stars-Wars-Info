import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const Planets = () => {
	const [page, setPage] = useState(1);
	const fetchPlanets = async (key, page) => {
		const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
		return res.json();
	};

	const { data, status } = useQuery(['planets', page], fetchPlanets, {
		onSuccess: () => console.log('DATA FETCHED WITH NO PROBLEM'),
	});
	return (
		<div>
			<button onClick={() => setPage(1)}>Page 1</button>
			<button onClick={() => setPage(2)}>Page 2</button>
			<button onClick={() => setPage(3)}>Page 3</button>
			<h2>Planets</h2>
			{(status === 'loading' && <h2>data is loading</h2>) ||
				(status === 'success' && (
					<div>
						{data.results?.map((planet) => (
							<Planet planet={planet} />
						))}
					</div>
				)) ||
				(status === 'error' && <h2>Error fetching data</h2>)}
		</div>
	);
};

export default Planets;
