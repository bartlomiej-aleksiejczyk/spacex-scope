import {useEffect, useState} from "react";
import {ITEMS_PER_PAGE} from "./missionListConst";


export const useLoadMoreControl = () => {
    const [offset, setOffset] = useState<number>(0);
    const [limit, setLimit] = useState<number>(ITEMS_PER_PAGE);

    useEffect(() => {
    }, [offset, limit])

    const nextPage = () => {
        setLimit((offset + ITEMS_PER_PAGE) % 100);
        setOffset(limit + ITEMS_PER_PAGE);
    }

    const resetPage = () => {
        setLimit(ITEMS_PER_PAGE);
        setOffset(0);
    }

    return {nextPage, resetPage, offset, limit}
}