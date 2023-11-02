import { makeVar } from "@apollo/client";
import { getLikedMissions } from "../../utils/getLikedMissions";

export const likedMissionsVar = makeVar(getLikedMissions());
export const selectedMissionId = makeVar<string>("");
export const selectedMissionName = makeVar<string>("");
export const selectedMissionImage = makeVar<string>("");
