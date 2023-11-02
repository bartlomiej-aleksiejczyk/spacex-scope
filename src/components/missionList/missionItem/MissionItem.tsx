import { isEmpty } from "lodash";
import { Launch } from "../../../graphql/generatedTypes/graphql";
import {randomSpaceImage} from "../../../utils/randomSpaceImage";
import {
	likedMissionsVar,
	selectedMissionId,
	selectedMissionImage,
	selectedMissionName
} from "../../../graphql/apollo/apolloStore";
import {useReactiveVar} from "@apollo/client";

export const MissionItem = ({ mission }: Launch) => {

	const likedList = useReactiveVar(likedMissionsVar)
	const selectMission = () => {
		selectedMissionId(mission.id)
		selectedMissionName(mission.mission_name)
		selectedMissionImage(imageLink)
	}
	const isLiked = mission.id in likedList;
	const imageLink = isEmpty(mission.links.flickr_images[0]) ? randomSpaceImage() : mission.links.flickr_images[0];
	return (
		<div>
			<img src={imageLink} alt={mission.mission_name} />
			<div>{mission.mission_name}</div>
			<div>{isLiked ? "Liked" : "Not Liked"}</div>
			<button onClick={selectMission}>
				Details
			</button>
		</div>
	)
};
