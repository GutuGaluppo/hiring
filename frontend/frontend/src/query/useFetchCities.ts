import { useQuery } from "react-query";
import { City } from "../Types";

const getCities = async (page: number, limit: number, country: string | null) => {
	const url = new URL("http://localhost:3001/api/cities");
	const from = page * limit;

	if (country) {
		url.searchParams.append("country", country);
	}
	url.searchParams.append("from", from.toString());
	url.searchParams.append("limit", limit.toString());

	return await fetch(url.href)
		.then((response) => response.json())
		.then((data) => {
			return data;
		});
};

export function useFetchCities(page: number, limit: number, country: string | null) {
	return useQuery<City[]>(
		["cities", page, limit, country],
		() => getCities(page, limit, country),
		{
			// in order to keep the list always up to date, every time the component mounts, or the window is focused
			refetchOnMount: true,
			refetchOnWindowFocus: true
		}
	);
}