
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next";
import { sendRequest } from "@/hooks/sendRequest";
import { url } from "@/utils/const";
import dynamic from "next/dynamic";

const SlideProduct = dynamic(() => import('@/components/slide_product/v1'));
const Banner = dynamic(() => import('@/components/banner'));
const Home = async () => {

    const { data: topData } = await sendRequest<IBackendRes<IProduct[]>>({ url: url + 'products?_sort=sold&_limit=10' })
    const { data: topView } = await sendRequest<IBackendRes<IProduct[]>>({ url: url + 'products?_sort=view&_limit=10' })

    return (
        <div className=' xs:w-full lg:w-11/12 w-10/12 mx-auto  mt-3'>
            <Banner />
            <div className='rounded-lg overflow-hidden mt-2'>
                <h2 className='bg-[#fce9df]   p-4 flex justify-start items-center gap-3'>
                    <img className="w-12 rounded-lg" src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_XuHuong_Thuong_120x120.png" />
                    Sản phẩm bán chạy
                </h2>
                <SlideProduct data={topData || []} />
            </div>
            <div className='rounded-lg overflow-hidden mt-2'>
                <h2 className='bg-[#fce9df]   p-4 flex justify-start items-center gap-3'>
                    <img className="w-12 rounded-lg" src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_XuHuong_Thuong_120x120.png" />
                    Sản phẩm nhiều lượt xem
                </h2>
                <SlideProduct data={topView || []} />
            </div>
        </div>

    )
}

export default Home