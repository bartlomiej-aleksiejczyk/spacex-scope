import { selectedMissionId } from "../../../graphql/apollo/apolloStore";
import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";

export const useChangeOverflow = () => {
	const selectedMission = useReactiveVar(selectedMissionId);
	useEffect(() => {
		document.body.style.overflow = selectedMission == "" ? "auto" : "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, [selectedMission]);
};
