import { isEmpty } from "lodash";
import { Launch } from "../../graphql/generatedTypes/graphql";
import { randomSpaceImage } from "../../utils/randomSpaceImage";
import {
	likedMissionsVar,
	selectedMissionId,
	selectedMissionImage,
	selectedMissionName,
} from "../../graphql/apollo/apolloStore";
import { useReactiveVar } from "@apollo/client";
import "./MissionItem.scss";
import { useState } from "react";
import { handleImageLoad } from "./onImageLoad";
import { BASE_ROW_SPAN, MAX_TITLE_LENGTH } from "./missionItemConsts";
import { truncateString } from "../../utils/truncateString";
import { omit } from "lodash";
import * as React from "react";

interface MissionItemProps {
	mission: Launch;
	isLikedModeToggled: boolean;
}

export const MissionItem = ({ mission, isLikedModeToggled }: MissionItemProps) => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [rowSpan, setRowSpan] = useState<number>(BASE_ROW_SPAN);
	const likedList = useReactiveVar(likedMissionsVar);

	const isLiked = mission.id in likedList;
	const imageLink = isEmpty(mission.links?.flickr_images)
		? randomSpaceImage(mission.id as string)
		: mission.links?.flickr_images?.[0];

	const selectMission = () => {
		selectedMissionId(mission.id);
		selectedMissionName(mission.mission_name);
		selectedMissionImage(imageLink);
	};
	const onLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
		handleImageLoad(event.currentTarget, setRowSpan);
		setIsLoaded(true);
	};

	const handleRemoveButton = (event: React.SyntheticEvent) => {
		event.stopPropagation();
		localStorage.removeItem(mission.id as string);
		const partial = omit(likedMissionsVar(), [mission.id as string]);
		likedMissionsVar(partial);
	};

	const styleImageContainer = {
		"--item-span": rowSpan,
	};
	const styleImage = {
		opacity: isLoaded ? 1 : 0,
	};
	return (
		<div className="mission-list-item" style={styleImageContainer} onClick={selectMission}>
			{isLikedModeToggled && (
				<button
					className="button-round-ghost button-round-ghost--remove"
					onClick={handleRemoveButton}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="24"
						height="24"
					>
						<path d="M16 1.75V3h5.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75Zm-6.5 0V3h5V1.75a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25ZM4.997 6.178a.75.75 0 1 0-1.493.144L4.916 20.92a1.75 1.75 0 0 0 1.742 1.58h10.684a1.75 1.75 0 0 0 1.742-1.581l1.413-14.597a.75.75 0 0 0-1.494-.144l-1.412 14.596a.25.25 0 0 1-.249.226H6.658a.25.25 0 0 1-.249-.226L4.997 6.178Z"></path>
						<path d="M9.206 7.501a.75.75 0 0 1 .793.705l.5 8.5A.75.75 0 1 1 9 16.794l-.5-8.5a.75.75 0 0 1 .705-.793Zm6.293.793A.75.75 0 1 0 14 8.206l-.5 8.5a.75.75 0 0 0 1.498.088l.5-8.5Z"></path>
					</svg>
				</button>
			)}
			<div className="image-container">
				<img
					className="image-container__image"
					src={imageLink as string}
					alt={mission.mission_name as string}
					onLoad={onLoad}
					loading="lazy"
					style={styleImage}
				/>
			</div>
			<div className="mission-list-item-bottom">
				<span>{truncateString(mission.mission_name as string, MAX_TITLE_LENGTH)}</span>
				{isLiked ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						width="16"
						height="16"
					>
						<path
							fill="#f4c152"
							d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
						></path>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						width="16"
						height="16"
					>
						<path
							fill="#C9CACF"
							d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"
						></path>
					</svg>
				)}
			</div>
		</div>
	);
};
