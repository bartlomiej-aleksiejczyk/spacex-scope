import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_LINK = "https://spacex-production.up.railway.app/";

export const apolloClient = new ApolloClient({
	API_LINK,
	cache: new InMemoryCache(),
});
