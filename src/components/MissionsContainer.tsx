import {useQuery} from "@apollo/client";
import {GET_MISSIONS} from "../graphql/getMissionsQuery";
import {useState} from "react";

export const MissionsContainer = () => {
    const [missionLimit, setMissionLimit] = useState<number>(10)
    const {loading, error, data} = useQuery(GET_MISSIONS,
    {variables: {
        limit: 10
    }
})
    return (
        <div>

            {data.launches.map(mission => (
                <span>
                    {mission.mission_name}
                </span>
            ))}
        </div>
    )
}