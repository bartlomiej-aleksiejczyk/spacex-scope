import {useQuery, useReactiveVar} from "@apollo/client";
import {GET_MISSIONS} from "../../graphql/queries/getMissionsQuery";
import {useState} from "react";
import {MissionItem} from "./missionItem/MissionItem";
import {
    likedMissionsVar,
    selectedMissionId,
    selectedMissionImage,
    selectedMissionName
} from "../../graphql/apollo/apolloStore";
import {createPortal} from "react-dom";
import {MissionDetailsModal} from "../missionDetailsModal/MissionDetailsModal";

const ITEMS_PER_NEXT_PAGE = 10;

export const MissionList = () => {
    const [currentOffset, setCurrentOffset] = useState<number>(0);
    const [currentLimit, setCurrentLimit] = useState<number>(ITEMS_PER_NEXT_PAGE);

    const [isLikedModeToggled, setIsLikedModeToggled] = useState<boolean>(false);
    const likedMissions = useReactiveVar(likedMissionsVar)
    const selectedMission = useReactiveVar(selectedMissionId)

    const {loading, error, data, fetchMore} = useQuery(GET_MISSIONS, {
        variables: {
            offset: 0, limit: ITEMS_PER_NEXT_PAGE
        },
    });

    const switchDisplayMissions = () => {
        setCurrentLimit(ITEMS_PER_NEXT_PAGE)
        setCurrentOffset(0)
        setIsLikedModeToggled(!isLikedModeToggled)
    }

    const getDataFromLocalstorage = () => {
        const resultArray = []
        const currentPageIds = Object.keys(likedMissions).slice(0, currentLimit );
        currentPageIds.forEach(key => {
            resultArray.push(JSON.parse(likedMissions[key]));
        })
        return {
            launches: resultArray
        };
    }

    const loadMorePages = () => {
        const newOffsetValue = (currentOffset + ITEMS_PER_NEXT_PAGE) % 100;
        const newLimitValue = currentLimit + ITEMS_PER_NEXT_PAGE;
        setCurrentLimit(newLimitValue)
        setCurrentOffset(newOffsetValue)

        fetchMore({
            variables: {
                offset: newOffsetValue, limit: newLimitValue
            },
        })
    }

    const chosenDate = isLikedModeToggled ? getDataFromLocalstorage() : data

    console.log()
    return (
        <div>
            <button onClick={switchDisplayMissions}>
                switch missions
            </button>
            {chosenDate?.launches.map((mission) => <MissionItem key={mission.id} mission={mission}/>)}
            <button onClick={loadMorePages} disabled={currentLimit > chosenDate?.launches.length}>
                Load More
            </button>
            {selectedMission !== "" && createPortal(
                <MissionDetailsModal missionId={selectedMissionId()} missionImage={selectedMissionImage()} missionName={selectedMissionName()}/>,
                document.body
            )}
        </div>
    );
};
