import { useState } from "react";
import { ITEMS_PER_PAGE } from "../missionListConsts";

export const useLoadMoreControl = () => {
	const [offset, setOffset] = useState<number>(0);
	const [limit, setLimit] = useState<number>(ITEMS_PER_PAGE);

	const nextPage = () => {
		const newLimit = limit + ITEMS_PER_PAGE;
		let newOffset = (offset + ITEMS_PER_PAGE) % 100;
		if (newLimit >= 150) newOffset = 0;
		setLimit(newLimit);
		setOffset(newOffset);
		return { newLimit, newOffset };
	};

	const resetPage = () => {
		setLimit(ITEMS_PER_PAGE);
		setOffset(0);
	};

	return { nextPage, resetPage, offset, limit };
};
