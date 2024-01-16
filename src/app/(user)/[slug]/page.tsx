import { sendRequest } from '@/hooks/sendRequest'
import { formatGia, url } from '@/utils/const'

import "@/styles/detail.css"
import dynamic from 'next/dynamic';
import { AiOutlinePlus } from 'react-icons/ai';
const SlideProduct = dynamic(() => import('@/components/slide_product/v1'));
const ThumbsSwiper = dynamic(() => import('./info_product/_thumb'));
const Detail = dynamic(() => import('./info_product/_detail'));
const DescriptionProduct = dynamic(() => import('./info_product/_desciption'));
const Comment = dynamic(() => import('./comment'));
import LoadingSnip from '@/components/loading/v1';
import { notFound } from 'next/navigation';


const Page = async ({ params }: { params: { slug: string } }) => {
    const { data: product } = await sendRequest<IBackendRes<IProduct>>({ url: url + "products/detail/" + params.slug, nextOption: { cache: 'no-store' } });
    const { data: products } = await sendRequest<IBackendRes<IProduct[]>>({ url: url + `products?_category=in_${product?.category?.id}&_id=not_${product?.id}` });

    if (!product) notFound()
    return (
        <>
            {
                product ?
                    (<div className='md:w-full w-11/12 mx-auto  rounded-md' >

                        <div className="flex flex-wrap mt-4 bg-white">
                            <div className=' lg:w-full w-1/2 flex justify-center items-center '>
                                <ThumbsSwiper images={product?.slides} />
                            </div>
                            <Detail product={product} />
                        </div>
                        <div className='rounded-lg overflow-hidden mt-2'>
                            <h2 className='bg-[#fce9df]   p-4 flex justify-start items-center gap-3'>
                                <img className="w-12 rounded-lg" src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_XuHuong_Thuong_120x120.png" />
                                Sản phẩm nhiều lượt xem
                            </h2>
                            <SlideProduct data={products} />
                        </div>
                        <DescriptionProduct product={product} />
                        <Comment product={product} />
                    </div >)
                    : <LoadingSnip />}
        </>
    )
}

export default Page