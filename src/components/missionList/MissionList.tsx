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
import { ITEMS_PER_PAGE } from "./missionListConsts";
import { getDataFromLocalstorage } from "../../utils/getDataFromLocalstorage";
import "./MissionList.scss"
import "../../styles/global/components.scss"
import {apolloClient} from "../../graphql/apollo/apolloClient";

export const MissionList = () => {
	const [isLikedModeToggled, setIsLikedModeToggled] = useState<boolean>(false);
	const likedMissions = useReactiveVar(likedMissionsVar);
	const selectedMission = useReactiveVar(selectedMissionId);
	const { nextPage, resetPage, limit } = useLoadMoreControl();

	const { loading, error, data, fetchMore } = useQuery(GET_MISSIONS, {
		variables: { offset: 0, limit: ITEMS_PER_PAGE },
	});

	const switchDisplayMissions = () => {
		resetPage();
		apolloClient.resetStore()
		setIsLikedModeToggled(!isLikedModeToggled);
	};

	const loadMorePages = () => {
		const { newLimit, newOffset } = nextPage();
		fetchMore({ variables: { offset: newOffset, limit: newLimit } });
	};

	const chosenDate = isLikedModeToggled ? getDataFromLocalstorage(likedMissions, limit) : data;
	const isEverythingLoaded = limit > chosenDate?.launches.length

	return (
		<div>
			<div>
				<button onClick={switchDisplayMissions}>switch missions</button>
			</div>
			<div className="mission-list">
				{chosenDate?.launches.map((mission) => (
					<MissionItem key={mission.id} mission={mission} />
				))}
			</div>
			<div className="bottom-button-container">
				{!isEverythingLoaded &&
					< button className="button button--big" onClick={loadMorePages} disabled={isEverythingLoaded}>
					Load More
					</button>}
			</div>
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
