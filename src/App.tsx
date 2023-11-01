import { MissionsContainer } from "./components/MissionsContainer";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./graphql/apollo/apolloClient";

export const App = () => {
	return (
		<>
			<ApolloProvider client={apolloClient}>
				<MissionsContainer />
			</ApolloProvider>
		</>
	);
};
