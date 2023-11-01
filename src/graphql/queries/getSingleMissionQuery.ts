import gql from 'graphql-tag';

export const GET_SINGLE_MISSION = gql`
query GetSingleLaunch($launchId: ID!) {
  launch(id: $launchId) {
    details
    launch_date_local
    links {
      article_link
    }
  }
}
`;
