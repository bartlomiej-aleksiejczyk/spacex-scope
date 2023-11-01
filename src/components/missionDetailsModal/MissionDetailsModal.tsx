import "./MissionDetailsModal.scss"
import {likedMissionsVar, selectedMission} from "../../graphql/apollo/apolloStore";
import {useQuery} from "@apollo/client";
import {GET_SINGLE_MISSION} from "../../graphql/queries/getSingleMissionQuery";
import {useState} from "react";
import {omit} from "lodash"

interface MissionDetailsModalProps {
    missionId: string;
    missionImage: string;
    missionName: string;
}

export const MissionDetailsModal = ({missionId, missionImage, missionName}: MissionDetailsModalProps) => {
    const {loading, error, data} = useQuery(GET_SINGLE_MISSION, {
        variables: {launchId: missionId},
    });
    const [isLiked, setIsLiked] = useState<boolean>(!!localStorage.getItem(missionId))

    async function pushMissionToStorage()  {
        console.log(likedMissionsVar())
        const resultObject = {
            id: missionId,
            mission_id: missionId,
            mission_name: [missionName],
            links: {
                flickr_images: [missionImage]
            }
        }
        localStorage.setItem(missionId, JSON.stringify(resultObject))

        const oldLikedMissions = likedMissionsVar()

        const ss = {
            ...oldLikedMissions,
            [missionId]: JSON.stringify(resultObject)
        }
        console.log(ss)

        likedMissionsVar(ss)
        console.log(likedMissionsVar())
        setIsLiked(true)
    }

    const removeMissionFromStorage = () => {
        localStorage.removeItem(missionId)
        setIsLiked(false)
        const partial = omit(likedMissionsVar(), [missionId])
        console.log(partial)
        likedMissionsVar(partial)
    }


    return (
        <div className="modal">
            <div className="box">
                <hr/>
                <img src={missionImage} alt={missionName}/>
                <div>
                    {missionName}
                </div>
                <div>
                    {data?.launch.details}
                </div>
                <div>
                    {data?.launch.launch_date_local}
                </div>

                <button onClick={() => selectedMission("")}>
                    Close
                </button>
                {isLiked ?
                    <button onClick={removeMissionFromStorage}>
                        Unlike
                    </button>
                    :
                    <button onClick={pushMissionToStorage}>
                        Like
                    </button>}
            </div>

        </div>
    )
}