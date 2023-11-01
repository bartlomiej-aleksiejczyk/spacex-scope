import {gql} from "../generatedTypes";

export const GET_SINGLE_MISSION = gql`
query GetSingleLaunch($launchId: ID!) {
  launch(id: $launchId) {
    details
    launch_year
    links {
      article_link
    }
  }
}
`;
