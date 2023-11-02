import { MissionList } from "./components/missionList/MissionList";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./graphql/apollo/apolloClient";

export const App = () => {
	return (
			<ApolloProvider client={apolloClient}>
				<MissionList />
			</ApolloProvider>
	);
};
