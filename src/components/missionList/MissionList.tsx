import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_MISSIONS } from "../../graphql/queries/getMissionsQuery";
import { useState } from "react";
import { MissionItem } from "../missionItem/MissionItem";
import {
	likedMissionsVar,
	selectedMissionId,
	selectedMissionImage,
	selectedMissionName,
} from "../../graphql/apollo/apolloStore";
import { createPortal } from "react-dom";
import { MissionDetailsModal } from "../missionDetailsModal/MissionDetailsModal";
import { useLoadMoreControl } from "./useLoadMoreControl";
import { ITEMS_PER_PAGE } from "./missionListConst";

export const MissionList = () => {
	const [isLikedModeToggled, setIsLikedModeToggled] = useState<boolean>(false);
	const likedMissions = useReactiveVar(likedMissionsVar);
	const selectedMission = useReactiveVar(selectedMissionId);
	const { nextPage, resetPage, offset, limit } = useLoadMoreControl();

	const { loading, error, data, fetchMore } = useQuery(GET_MISSIONS, {
		variables: { offset: 0, limit: ITEMS_PER_PAGE },
	});

	const switchDisplayMissions = () => {
		resetPage();
		setIsLikedModeToggled(!isLikedModeToggled);
	};

	const getDataFromLocalstorage = () => {
		const resultArray = [];
		const currentPageIds = Object.keys(likedMissions).slice(0, limit);
		currentPageIds.forEach((key) => {
			resultArray.push(JSON.parse(likedMissions[key]));
		});
		return {
			launches: resultArray,
		};
	};

	const loadMorePages = () => {
		console.log(offset)
		console.log(limit)
		const  {newLimit, newOffset} = nextPage();
		console.log(newOffset)
		console.log(newLimit)
		fetchMore({
			variables: { offset: newOffset, limit: newLimit },
		});
	};

	const chosenDate = isLikedModeToggled ? getDataFromLocalstorage() : data;

	return (
		<div>
			<button onClick={switchDisplayMissions}>switch missions</button>
			{chosenDate?.launches.map((mission) => (
				<MissionItem key={mission.id} mission={mission} />
			))}
			<button onClick={loadMorePages} disabled={limit > chosenDate?.launches.length}>
				Load More
			</button>
			{selectedMission !== "" &&
				createPortal(
					<MissionDetailsModal
						missionId={selectedMissionId()}
						missionImage={selectedMissionImage()}
						missionName={selectedMissionName()}
					/>,
					document.body,
				)}
		</div>
	);
};
