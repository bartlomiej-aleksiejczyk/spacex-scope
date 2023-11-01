import { gql } from "../generatedTypes";

export const GET_MISSIONS = gql`
	query GetLaunches($limit: Int) {
		launches(limit: $limit) {
			id
			mission_id
			mission_name
			links {
				flickr_images
			}
		}
	}
`;