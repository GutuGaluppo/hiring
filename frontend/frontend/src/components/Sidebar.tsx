import "./Sidebar.css";
import { useEffect, useState } from "react";
import { Country } from "../Types";

type Props = {
	onFilterByCountry: (country: string | null) => void;
}

const Sidebar = ({ onFilterByCountry }: Props) => {
	const [countries, setCountries] = useState<Country[]>([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		fetch("http://localhost:3001/api/countries")
			.then((response) => response.json())
			.then((data) => {
				setCountries(data);
				setLoading(false);
			})
			.catch((error) => console.log(error));
	}, []);

	const toggleAllCities = (e: string | null) => {
		if (e === 'all') {
			onFilterByCountry(null);
		} else {
			onFilterByCountry(e);
		}
	}

	if (isLoading) return <h1>Loading...</h1>

	return (
		<div id="sidebar" data-testid="sidebar-test">
			<h2>Cities App</h2>

			<ul className="list-container">
				<li className="side-bar-list">
					<button className="list-btn" onClick={() => onFilterByCountry(null)}>
						All cities
					</button>
				</li>
				{countries.map(({ name, count }) => (
					<li key={name} className={"side-bar-list"}>
						<button className="list-btn" onClick={() => onFilterByCountry(name)}>
							{name}: ({count})
						</button>
					</li>
				))}
			</ul>
			{/* Dropdow for mobile */}
			<select className="dropdown-menu" id="countries" onChange={(event) => toggleAllCities(event.target.value)}>
				<option value="all">All cities</option>
				{countries.map(({ name, count }) => (
					<option key={name} value={name}>
						{name} ({count})
					</option>
				))}
			</select>

		</div>
	);
};

export default Sidebar