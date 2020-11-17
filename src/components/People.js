import React from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const People = () => {
	const fetchPeople = async () => {
		const res = await fetch('https://swapi.dev/api/people');
		return res.json();
	};

	const { data, status } = useQuery('people', fetchPeople);
	return (
		<div>
			<h2>Planets</h2>
			{(status === 'loading' && <h2>data is loading</h2>) ||
				(status === 'success' && (
					<div>
						{data.results.map((person) => (
							<Person person={person} />
						))}
					</div>
				)) ||
				(status === 'error' && <h2>Error fetching data</h2>)}
		</div>
	);
};

export default People;
