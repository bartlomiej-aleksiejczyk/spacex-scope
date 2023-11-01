import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { API_LINK } from "../graphqlConsts";

const link = new HttpLink({
	uri: API_LINK,
});

export const apolloClient = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});
