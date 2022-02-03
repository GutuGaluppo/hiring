export type City = {
	name: string;
	country: string;
	subcountry?: string;
	geonameid?: number;
};

export type Country = {
	name: string;
	count: number;
}