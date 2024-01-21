import { chunk, map } from "lodash";
import moment from "moment-timezone";
moment.tz("Asia/Ho_Chi_Minh")
export const convertText = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
export const url = process.env.NEXT_PUBLIC_SERVER_URL;
export const formatGia = (params: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params)
}
export const tagProduct = "product-detail"
export const perDiscount = ({ per_discount, price }: IProduct) => {
    const gia = per_discount ? price * ((100 - Number(per_discount)) / 100) : price;
    return gia
}


export const formatTimeAgo = (timestamp: Date | string): string => {
    const now = moment();
    const time = moment(timestamp);

    const minutes = now.diff(time, 'minutes');
    if (minutes < 1) {
        return 'Bây giờ';
    } else if (minutes < 60) {
        return `${minutes} phút trước`;
    }

    const hours = now.diff(time, 'hours');
    if (hours < 24) {
        return `${hours} giờ trước`;
    }

    const days = now.diff(time, 'days');
    return `${days} ngày trước`;
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