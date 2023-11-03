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
import { useLoadMoreControl } from "./hooks/useLoadMoreControl";
import { ITEMS_PER_PAGE } from "./missionListConsts";
import { getDataFromLocalstorage } from "../../utils/getDataFromLocalstorage";
import "./MissionList.scss";
import "../../styles/global/components.scss";
import { apolloClient } from "../../graphql/apollo/apolloClient";
import {useChangeOverflow} from "./hooks/useChangeOverflow";

export const MissionList = () => {
	const [isLikedModeToggled, setIsLikedModeToggled] = useState<boolean>(false);
	const likedMissions = useReactiveVar(likedMissionsVar);
	const selectedMission = useReactiveVar(selectedMissionId);
	const { nextPage, resetPage, limit } = useLoadMoreControl();

	const { loading, data, fetchMore } = useQuery(GET_MISSIONS, {
		variables: { offset: 0, limit: ITEMS_PER_PAGE },
	});
	useChangeOverflow()

	const switchDisplayMissions = () => {
		resetPage();
		apolloClient.resetStore();
		setIsLikedModeToggled(!isLikedModeToggled);
	};

	const loadMorePages = () => {
		const { newLimit, newOffset } = nextPage();
		fetchMore({ variables: { offset: newOffset, limit: newLimit } });
	};

	const chosenDate = isLikedModeToggled ? getDataFromLocalstorage(likedMissions, limit) : data;
	const isEverythingLoaded = limit > chosenDate?.launches.length;
	const styleGlobalContainer = {
		overflow: likedMissions === "" ? "auto" : "hidden",
	};



	return (
		<div className="globalContainer" style={styleGlobalContainer}>
			<div className="topbar">
				<h2 className="topbar__text">{isLikedModeToggled ? <strong>YOUR FAVORITES LIST</strong> : <strong>MISSION BROWSER</strong>}</h2>
				<button className="button" onClick={switchDisplayMissions}>
					{isLikedModeToggled ? "Show All Missions" : "Show My Favorites"}
				</button>
			</div>

			{loading ? (
				<div className="loading loading--topspace">
					<div className="loading__Spinner" />
				</div>
			) : (
				<>
					<div className="mission-list" >
						{chosenDate?.launches.map((mission) => (
							<MissionItem
								key={mission.id}
								mission={mission}
								isLikedModeToggled={isLikedModeToggled}
							/>
						))}
					</div>
					<div className="bottom-button-container">
						{!isEverythingLoaded && (
							<button
								className="button button--big"
								onClick={loadMorePages}
								disabled={isEverythingLoaded}
							>
								Load More
							</button>
						)}
					</div>
				</>
			)}
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
