import * as React from "react";
import {BASE_ROW_SPAN} from "./missionItemConsts";


export const handleImageLoad = (image: HTMLImageElement, setRowSpan: React.Dispatch<React.SetStateAction<number>>) => {
    const ratio =  image.naturalHeight / image.naturalWidth;
    const mod = ratio % 1.5 < 0.5 ? 0.5 : ratio % 1.5;
    const rowSpan = Math.round(mod * 10 - 4);
    setRowSpan(rowSpan + BASE_ROW_SPAN)
}