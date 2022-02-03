import "./App.css";
import { Table } from "./components/Table";
import { Sidebar } from "./components/Sidebar";
import { useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
	const [filters, setFilters] = useState<string | null>(null);

	return (
		<div className="App">
			<Sidebar onFilterByCountry={setFilters} />
			<Table filters={filters} />
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</div>
	);
}

export default App;
