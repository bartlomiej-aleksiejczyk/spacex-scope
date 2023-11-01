import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

const API_LINK = new HttpLink({
	uri: "https://spacex-production.up.railway.app/"
});

export const apolloClient = new ApolloClient({
	API_LINK,
	cache: new InMemoryCache(),
});
