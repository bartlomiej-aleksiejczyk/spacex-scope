import { isEmpty } from "lodash";
import { Launch } from "../../graphql/generatedTypes/graphql";

const likedList = {
	"5eb87cd9ffd86e000604b32a": {
		id: "633f71240531f07b4fdf59bb",
		mission_id: ["633f71240531f07b4fdf59bb"],
		mission_name: "Galaxy 33 (15R) & 34 (12R)",
		links: {
			flickr_images: [],
		},
	},
};

export const MissionItem = ({ mission }: Launch) => {
	const isLiked = mission.id in likedList;
	console.log(mission.links.flickr_images);
	return (
		<div>
			{isEmpty(mission.links.flickr_images) ? (
				<img src={mission.links.flickr_images[0]} alt={mission.mission_name} />
			) : (
				<img src="https://www.w3schools.com/images/w3schools_green.jpg" alt={"alt"} />
			)}
			<div>{mission.mission_name}</div>
			<div>{isLiked ? "Liked" : "Not Liked"}</div>
		</div>
	);
};
