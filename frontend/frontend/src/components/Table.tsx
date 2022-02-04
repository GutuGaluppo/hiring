import "./Table.css";
import { useEffect, useState } from "react";
import useFetchCities from "../query/useFetchCities";

type Props = {
	filters: string | null;
}
const PAGE_SIZE = 15;


export const Table = ({ filters }: Props) => {
	const [page, setPage] = useState(0);

	const { data, isLoading } = useFetchCities(page, PAGE_SIZE, filters);

	useEffect(() => {
		setPage(0);
	}, [filters]);

	if (isLoading) return <h1>Loading...</h1>

	return (
		<div id="cities-table-wrapper">
			<table>
				<thead>
					<tr>
						<th>City</th>
						<th>Country</th>
						<th>Sub-Country</th>
						<th>Link to geoname page</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((city, index) => (
						<tr key={index}>
							<td>{city.name}</td>
							<td>{city.country}</td>
							<td>{city.subcountry}</td>
							<td>
								<a href={`https://www.geonames.org/${city.geonameid}/`} target="_blank" rel='noreferrer'>
									{city.name}
								</a>
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={4}>
							<button onClick={() => setPage(page - 1)} disabled={page === 0}>
								&lt; Previous
							</button>
							<button onClick={() => setPage(page + 1)} disabled={data?.length === 0}>
								Next &gt;
							</button>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};
