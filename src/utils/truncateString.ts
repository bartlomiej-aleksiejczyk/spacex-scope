export const truncateString =  (string: string, maxLen: number) => {
        return (string.length > maxLen ? string.substring(0, maxLen - 1) + "..." : string);
}