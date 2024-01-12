import { chunk, map } from "lodash";

export const convertText = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
export const url = process.env.NEXT_PUBLIC_SERVER_URL;
export const formatGia = (params: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params)
}



export function splitRanges(input: any | undefined, length = 2) {
    if (input) {
        const ranges = input.split('_');
        if (ranges[0] === 'between') ranges.shift();
        const chunkedRanges = chunk(ranges, length);
        const result = map(chunkedRanges, range => range.join('_'));
        return result;
    } else return []
}