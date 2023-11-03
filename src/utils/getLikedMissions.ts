export const getLikedMissions = () => {
	const result = Object.keys(localStorage).reduce((accumulator: Record<string, string>, key) => {
		accumulator[key] = localStorage.getItem(key) as string;
		return accumulator;
	}, {});
	return result;
};
