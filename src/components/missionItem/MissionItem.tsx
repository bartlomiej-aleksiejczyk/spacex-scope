import {isEmpty} from "lodash";
import {Launch} from "../../graphql/generatedTypes/graphql";
import {randomSpaceImage} from "../../utils/randomSpaceImage";
import {
    likedMissionsVar,
    selectedMissionId,
    selectedMissionImage,
    selectedMissionName,
} from "../../graphql/apollo/apolloStore";
import {useReactiveVar} from "@apollo/client";
import "./MissionItem.scss"
import {useState} from "react";
import {handleImageLoad} from "./onImageLoad";
import {BASE_ROW_SPAN, MAX_TITLE_LENGTH} from "./missionItemConsts";
import {truncateString} from "../../utils/truncateString";

export const MissionItem = ({mission}: Launch) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [rowSpan, setRowSpan] = useState<number>(BASE_ROW_SPAN)
    const likedList = useReactiveVar(likedMissionsVar);

    const isLiked = mission.id in likedList;
    const imageLink = isEmpty(mission.links.flickr_images[0])
        ? randomSpaceImage()
        : mission.links.flickr_images[0];

    const selectMission = () => {
        selectedMissionId(mission.id);
        selectedMissionName(mission.mission_name);
        selectedMissionImage(imageLink);
    };
    const onLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        handleImageLoad(event.currentTarget, setRowSpan)
        setIsLoaded(true)
    }

    const styleImageContainer = {
        '--item-span': rowSpan,
    }
    const styleImage = {
        opacity: isLoaded ? 1 : 0
    }
    return (
        <div className="mission-list-item" style={styleImageContainer} onClick={selectMission}>
            <div className="image-container">
                <img className="image-container__image" src={imageLink} alt={mission.mission_name} onLoad={onLoad} loading="lazy" style={styleImage}/>
            </div>
            <div className="mission-list-item-bottom">
                <span>{truncateString(mission.mission_name,MAX_TITLE_LENGTH)}</span>
                    {isLiked ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill="#f4c152" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>:
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill="#C9CACF" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path></svg>
                    }
            </div>
        </div>
    );
};
