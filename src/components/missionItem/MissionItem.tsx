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
import {BASE_ROW_SPAN} from "./missionItemConsts";

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

    const style = {
        '--item-span': rowSpan,
        display: isLoaded ? 'block' : 'none'
    }
    return (
        <div className="mission-list-item" style={style}>
            <div className="image-container">
                <img className="mission-list-item__image" src={imageLink} alt={mission.mission_name} onLoad={onLoad} loading="lazy"/>
            </div>
            <div>{mission.mission_name}</div>
            <div>{isLiked ? "Liked" : "Not Liked"}</div>
            <button onClick={selectMission}>Details</button>
        </div>
    );
};
