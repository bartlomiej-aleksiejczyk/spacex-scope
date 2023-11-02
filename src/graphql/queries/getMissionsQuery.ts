import gql from "graphql-tag";

export const GET_MISSIONS = gql`
	query GetLaunches($offset: Int, $limit: Int) {
		launches(offset: $offset, limit: $limit) {
			id
			mission_id
			mission_name
			links {
				flickr_images
			}
		}
	}
`;
