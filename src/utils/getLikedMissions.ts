export const getLikedMissions = () => {
	const result = Object.keys(localStorage).reduce((accumulator: Record<string, string>, key) => {
		accumulator[key] = localStorage.getItem(key);
		return accumulator;
	}, {});
	return result;
};
