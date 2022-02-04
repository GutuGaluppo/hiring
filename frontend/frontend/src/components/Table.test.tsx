import { render } from "@testing-library/react";
import { City } from "../Types";
import Table from "./Table";

const data: Array<City> = [{ "country": "Andorra", "geonameid": 3040051, "name": "les Escaldes", "subcountry": "Escaldes-Engordany" }, { "country": "Andorra", "geonameid": 3041563, "name": "Andorra la Vella", "subcountry": "Andorra la Vella" }, { "country": "United Arab Emirates", "geonameid": 290594, "name": "Umm al Qaywayn", "subcountry": "Umm al Qaywayn" }, { "country": "United Arab Emirates", "geonameid": 291074, "name": "Ras al-Khaimah", "subcountry": "Raʼs al Khaymah" }, { "country": "United Arab Emirates", "geonameid": 291696, "name": "Khawr Fakkān", "subcountry": "Ash Shāriqah" }, { "country": "United Arab Emirates", "geonameid": 292223, "name": "Dubai", "subcountry": "Dubai" }, { "country": "United Arab Emirates", "geonameid": 292231, "name": "Dibba Al-Fujairah", "subcountry": "Al Fujayrah" }, { "country": "United Arab Emirates", "geonameid": 292239, "name": "Dibba Al-Hisn", "subcountry": "Al Fujayrah" }, { "country": "United Arab Emirates", "geonameid": 292672, "name": "Sharjah", "subcountry": "Ash Shāriqah" }, { "country": "United Arab Emirates", "geonameid": 292688, "name": "Ar Ruways", "subcountry": "Abu Dhabi" }]


let mockIsLoading = false

jest.mock('../query/useFetchCities', () => {
	return {
		useFetchCities: () => (
			{
				isLoading: mockIsLoading,
				data: data
			}
		)
	}
})
describe('Table component', () => {

	test('will render loading while data is fetching', () => {
		mockIsLoading = true
		const { getByText } = render(<Table filters={null} />)
		const table = getByText(/loading.../i)
		expect(table).toBeInTheDocument();
	})

	test('will render table with data', () => {
		mockIsLoading = false
		const { getByText } = render(<Table filters={null} />)
		const table = getByText(/city/i)
		expect(table).toBeInTheDocument();
	})

})
