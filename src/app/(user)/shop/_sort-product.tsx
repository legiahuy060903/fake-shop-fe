"use client"
import { useMemo } from "react"

import { Select } from "antd";
import { FaFilter } from "react-icons/fa";
import withBaseMethod, { WithBaseMethodProps } from "@/hooks/withBaseMethod";


const SorterShop = ({ queryConfig, router, queryString, screens, contexts }: WithBaseMethodProps) => {

    const { setOpenDrawFilter } = contexts;
    const handleChange = (value: string) => {
        if (value == "0") {
            const { _sort, _order, ...q } = queryConfig
            router.push('shop?' + queryString.stringify(q))
        } else router.push('shop?' + queryString.stringify({ ...queryConfig, ...queryString.parse(value) }));
    };
    const checkSort = (router: ISearchParams) => {
        const { _sort, _order } = router;
        return `${_sort ? `_sort=${_sort}` : ''}${_order ? `&_order=${_order}` : ''}`;
    };
    const optionsSort = useMemo(() => [
        { label: <span className="p-2 text-base font-normal text-gray-500 ">Chọn lọc :</span>, value: "0" },
        { label: <span className="p-2 text-base font-normal text-gray-500 ">Giá giảm dần</span>, value: "_sort=price&_order=desc" },
        { label: <span className="p-2 text-base font-normal text-gray-500">Giá tăng dần</span>, value: "_sort=price&_order=asc" },
        { label: <span className="p-2 text-base font-normal text-gray-500">Lượt xem nhiều</span>, value: "_sort=view" }
    ], []);
    const optionsLimit = useMemo(() => [
        { label: <span className="p-2 text-base font-normal text-gray-500 ">12 sản phẩm</span>, value: "_limit=12" },
        { label: <span className="p-2 text-base font-normal text-gray-500">24 sản phẩm</span>, value: "_limit=24" },
        { label: <span className="p-2 text-base font-normal text-gray-500">32 sản phẩm</span>, value: "_limit=32" }
    ], []);

    return (
        <div className="p-4 flex items-center gap-4 justify-between ">
            <div className="hidden md:flex w-1/12  items-center justify-center" onClick={() => setOpenDrawFilter(true)}>
                <FaFilter />
            </div>
            <div className="md:hidden text-base font-medium w-2/12"> Sắp xếp theo :</div>
            <div className="flex xs:justify-end md:w-11/12 lg:w-8/12 w-6/12 gap-2 overflow-hidden">
                <Select
                    size={`${screens.sm !== false ? "large" : "middle"}`}
                    className="w-6/12"
                    defaultValue={checkSort(queryConfig) || '0'}
                    style={{ width: "fit" }}
                    onChange={handleChange}
                    options={optionsSort}
                />
                <Select
                    size={`${screens.sm !== false ? "large" : "middle"}`}
                    className="w-6/12"
                    defaultValue={`_limit=${queryConfig._limit || 12}`}
                    style={{ width: "fit" }}
                    onChange={handleChange}
                    options={optionsLimit}
                />

            </div>

        </div>
    )
}

export default withBaseMethod(SorterShop) 