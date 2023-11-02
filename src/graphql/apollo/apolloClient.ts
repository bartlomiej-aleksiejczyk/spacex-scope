import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {API_LINK} from "../graphqlConsts";

const link = new HttpLink({
    uri: API_LINK,
});

const cache = new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    launches: {
                        keyArgs: false,
                        merge(existing, incoming, { args: { offset = 0 }}) {
                            const merged = existing ? existing.slice(0) : [];
                            for (let i = 0; i < incoming.length; ++i) {
                                merged[offset + i] = incoming[i];
                            }
                            return merged;
                        }
                    }
                }
            }
        }
    }
)

export const apolloClient = new ApolloClient({
    link,
    cache,
});
