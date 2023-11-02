export const formatForMissionList = (missionId: string, missionName: string, missionImage: string) => {
    return {
        id: missionId,
        mission_id: missionId,
        mission_name: [missionName],
        links: {
            flickr_images: [missionImage],
        },
    };
}