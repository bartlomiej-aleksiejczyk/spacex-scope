import "./MissionDetailsModal.scss";
import "../../styles/global/components.scss";
import { likedMissionsVar, selectedMissionId } from "../../graphql/apollo/apolloStore";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_MISSION } from "../../graphql/queries/getSingleMissionQuery";
import { useState } from "react";
import { omit } from "lodash";
import { formatForMissionList } from "../../utils/formatForMissionList";

interface MissionDetailsModalProps {
	missionId: string;
	missionImage: string;
	missionName: string;
}

export const MissionDetailsModal = ({
	missionId,
	missionImage,
	missionName,
}: MissionDetailsModalProps) => {
	const { loading, data } = useQuery(GET_SINGLE_MISSION, {
		variables: { launchId: missionId },
	});
	const [isLiked, setIsLiked] = useState<boolean>(!!localStorage.getItem(missionId));

	const pushMissionToStorage = () => {
		const resultObject = formatForMissionList(missionId, missionName, missionImage);
		localStorage.setItem(missionId, JSON.stringify(resultObject));

		likedMissionsVar({
			...likedMissionsVar(),
			[missionId]: JSON.stringify(resultObject),
		});
		setIsLiked(true);
	};

	const removeMissionFromStorage = () => {
		localStorage.removeItem(missionId);
		setIsLiked(false);

		const partial = omit(likedMissionsVar(), [missionId]);
		likedMissionsVar(partial);
	};

	return (
		<div className="modal">
			<div className="modal-box">
				<button
					className="button-round-ghost button-round-ghost--close"
					onClick={() => selectedMissionId("")}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
					>
						<path
							fill="#C9CACF"
							d="M9.036 7.976a.75.75 0 0 0-1.06 1.06L10.939 12l-2.963 2.963a.75.75 0 1 0 1.06 1.06L12 13.06l2.963 2.964a.75.75 0 0 0 1.061-1.06L13.061 12l2.963-2.964a.75.75 0 1 0-1.06-1.06L12 10.939 9.036 7.976Z"
						></path>
						<path
							fill="#C9CACF"
							d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1ZM2.5 12a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5A9.5 9.5 0 0 0 12 2.5 9.5 9.5 0 0 0 2.5 12Z"
						></path>
					</svg>
				</button>
				<img className="modal-box__image" src={missionImage} alt={missionName} />
				<div className="modal-box-content">
					{loading ? (
						<div className="loading">
							<div className="loading__Spinner" />
						</div>
					) : (
						<div className="modal-box-content-info">
							<h2>{missionName}</h2>
							<hr className="modal-box-content-info__separator" />
							<strong>Description:</strong>
							<div className="modal-box-content-info__paragraph">
								{data?.launch.details ? (
									data.launch.details
								) : (
									<i>Description not found</i>
								)}
							</div>
							<strong>Launch date:</strong>
							<div className="modal-box-content-info__paragraph">
								{data?.launch.launch_date_local ? (
									data.launch.launch_date_local
								) : (
									<i>Launch date not found</i>
								)}
							</div>
						</div>
					)}
					<div className="modal-box-content__button-wrapper">
						{isLiked ? (
							<button
								className="button button--modal"
								onClick={removeMissionFromStorage}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24"
									height="24"
								>
									<path
										fill="#f4c152"
										d="m12.672.668 3.059 6.197 6.838.993a.75.75 0 0 1 .416 1.28l-4.948 4.823 1.168 6.812a.75.75 0 0 1-1.088.79L12 18.347l-6.116 3.216a.75.75 0 0 1-1.088-.791l1.168-6.811-4.948-4.823a.749.749 0 0 1 .416-1.279l6.838-.994L11.327.668a.75.75 0 0 1 1.345 0Z"
									></path>
								</svg>
								Unlike
							</button>
						) : (
							<button className="button button--modal" onClick={pushMissionToStorage}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24"
									height="24"
								>
									<path
										fill="#05080FCC"
										d="M12 .25a.75.75 0 0 1 .673.418l3.058 6.197 6.839.994a.75.75 0 0 1 .415 1.279l-4.948 4.823 1.168 6.811a.751.751 0 0 1-1.088.791L12 18.347l-6.117 3.216a.75.75 0 0 1-1.088-.79l1.168-6.812-4.948-4.823a.75.75 0 0 1 .416-1.28l6.838-.993L11.328.668A.75.75 0 0 1 12 .25Zm0 2.445L9.44 7.882a.75.75 0 0 1-.565.41l-5.725.832 4.143 4.038a.748.748 0 0 1 .215.664l-.978 5.702 5.121-2.692a.75.75 0 0 1 .698 0l5.12 2.692-.977-5.702a.748.748 0 0 1 .215-.664l4.143-4.038-5.725-.831a.75.75 0 0 1-.565-.41L12 2.694Z"
									></path>
								</svg>
								Like
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
