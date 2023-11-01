import {useQuery} from "@apollo/client";
import {GET_MISSIONS} from "../graphql/getMissionsQuery";
import {useState} from "react";

export const MissionsContainer = () => {
    const [missionLimit, setMissionLimit] = useState<number>(10)
    const {loading, error, data} = useQuery(GET_MISSIONS, {
        variables: {limit: missionLimit}
    })
    return (
        <div>

            {data?.launches.map(mission => (
                <div>

                    <span>
                        {mission.mission_name}
                    </span>
                </div>
            ))}
        </div>
    )
}