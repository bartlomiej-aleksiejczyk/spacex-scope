export const getDataFromLocalstorage = (likedMissions: Record<string, string>, limit: number) => {
	const currentPageIds = Object.keys(likedMissions).slice(0, limit);
	const result = currentPageIds.map((key) => JSON.parse(likedMissions[key]));
	return { launches: result };
};
