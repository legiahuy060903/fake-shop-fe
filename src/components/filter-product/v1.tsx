"use client"
import { useCallback, useMemo } from "react"
import { Checkbox, Divider, Rate } from 'antd';
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { splitRanges, convertText } from "@/utils/const";

import SkeletonCustom from "@/components/skeleton/v1";
import withBaseMethod, { WithBaseMethodProps } from "@/hooks/withBaseMethod";
type TodoPreview = Pick<ISearchParams, "_category" | "_price" | "_publish_date">;
const typeOpe: TodoPreview = {
    _category: "in_",
    _price: "between_",
    _publish_date: "in_",
}
const FilterShop = ({ contexts, queryString, router, queryConfig, mount }: WithBaseMethodProps) => {
    const { category } = contexts;
    const checkCategory = splitRanges(queryConfig._category || undefined, 1);
    const checkPrice = splitRanges(queryConfig._price || undefined);

    const onChangeFilter = useCallback((e: CheckboxValueType[], type: keyof TodoPreview) => {
        const updatedQuery: ISearchParams = { ...queryConfig, [type]: e.length > 0 ? typeOpe[type] + e.join('_') : undefined };
        router.push('shop?' + queryString.stringify(updatedQuery));
    }, [queryConfig, typeOpe, router]);
    const onChangeFilterRate = useCallback((value: number) => {
        router.push('shop?' + queryString.stringify({ ...queryConfig, _rating: value > 1 ? value : undefined }));
    }, [queryConfig, router]);

    const optionsPrice = useMemo(() => [
        { label: <span className="p-2 text-base font-normal text-gray-500 ">Từ 0đ-150,000đ</span>, value: "0_150000" },
        { label: <span className="p-2 text-base font-normal text-gray-500">Từ 150,000đ - 300,000đ</span>, value: "150000_300000" },
        { label: <span className="p-2 text-base font-normal text-gray-500">Từ 300,000đ - 500,000đ</span>, value: "300000_500000" },
        { label: <span className="p-2 text-base font-normal text-gray-500">Từ 500,000đ - 700,000đ</span>, value: "500000_700000" },
        { label: <span className="p-2 text-base font-normal text-gray-500">Từ 700,000đ trở lên</span>, value: "700000_10000000" },
    ], []);
    const optionsCat = useMemo(() => category.map(item => ({
        label: <span className="p-2 text-base font-normal text-gray-500">{convertText(item.name)}</span>,
        value: item.id.toString()
    })), [category]);
    const optionPub = useMemo(() => {
        const options = [];
        for (let i = 2011; i < (new Date()).getFullYear(); i++) {
            options.push({
                label: <span className="p-2 text-base font-normal text-gray-500">{`Năm ${i}`}</span>,
                value: i
            });
        }
        return options;
    }, []);

    return (
        <div className="p-4 ">
            <div className="text-black  py-4">Thể loại</div>
            {mount && optionsCat.length > 0 ?
                <Checkbox.Group options={optionsCat} onChange={(e) => onChangeFilter(e, "_category")} className="box-category" defaultValue={checkCategory} />
                : <SkeletonCustom />
            }
            <Divider />
            <div className="text-black  py-4">Lọc theo giá :</div>
            <Checkbox.Group options={optionsPrice} onChange={(e) => onChangeFilter(e, "_price")} className="box-category" defaultValue={checkPrice} />
            <Divider />
            <div className="text-black  py-4">Đánh giá sao</div>
            <div>
                <Rate onChange={(value) => onChangeFilterRate(value)} defaultValue={queryConfig._rating || 5} />
            </div>
            <Divider />
            <div className="text-black  py-4">Năm ra mắt</div>
            <Checkbox.Group options={optionPub} onChange={(e) => onChangeFilter(e, "_publish_date")} className="box-category" defaultValue={checkPrice} />
            <Divider />
        </div>
    )
}

export default withBaseMethod(FilterShop) 