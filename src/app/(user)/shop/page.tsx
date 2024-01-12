import { sendRequest } from "@/hooks/sendRequest";
import FilterShop from "@/components/filter-product/v1";
import PaginationCustom from "@/components/pagination/v1";

import { url } from "@/utils/const";
import queryString from "query-string";
import Product from "@/components/product/v1";
import SorterShop from "./_sort-product";


const Shop = async ({ searchParams }: { searchParams: ISearchParams }) => {
    const params = `${url}products?${queryString.stringify(searchParams)}`;
    const { data, meta } = await sendRequest<IBackendRes<IProduct[]>>({ url: params });
    return (
        <div className='xs:w-full w-11/12 mx-auto  mt-3 flex justify-between  overflow-hidden gap-4 '>
            <div className='lg:hidden w-3/12 bg-white flex flex-col  rounded-md'>
                <FilterShop />
            </div>
            <div className='lg:w-full w-9/12 bg-white rounded-md flex flex-col'>
                <div className="w-full">
                    <SorterShop />
                </div>
                <div className="flex flex-wrap  gap-y-2 h-fit w-full">
                    {data?.map(item => {
                        return <div className="xs:w-2/4 lg:w-1/3 w-1/4  max-h-[350px] flex justify-center items-center gap-y-4" key={item.id}><Product item={item} /></div>
                    })}
                </div>
                <div className="w-full flex justify-center my-5">
                    <PaginationCustom total={meta?.total} />
                </div>

            </div>
        </div>
    )
}

export default Shop