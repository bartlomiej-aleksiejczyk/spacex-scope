import { useQuery } from "@apollo/client";
import { GET_MISSIONS } from "../graphql/getMissionsQuery";
import { useState } from "react";
import {MissionItem} from "./missionItem/MissionItem";

export const MissionsContainer = () => {
	const [missionLimit, setMissionLimit] = useState<number>(10);
	const { loading, error, data } = useQuery(GET_MISSIONS, {
		variables: { limit: missionLimit },
	});

	return (
		<div>
			{data?.launches.map((mission) => (
				<MissionItem mission={mission}/>
				)
				)}
		</div>
	);
};
