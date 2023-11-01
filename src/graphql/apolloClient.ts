import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const link = new HttpLink({
	uri: "https://spacex-production.up.railway.app/",
});

export const apolloClient = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});
