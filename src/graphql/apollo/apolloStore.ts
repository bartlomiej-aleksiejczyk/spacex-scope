import { makeVar } from "@apollo/client";
import {getLikedMissions} from "../../utils/getLikedMissions";

export const likedMissionsVar = makeVar(getLikedMissions());
export const selectedMission = makeVar<string>("");
