import {MissionsContainer} from "./components/MissionsContainer";
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./graphql/apolloClient";

export const App = () => {
	return <>
		<ApolloProvider client={apolloClient}>
			<MissionsContainer/>
		</ApolloProvider>
	</>;
};
