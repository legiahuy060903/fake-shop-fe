"use client"
import React from 'react'
import { Divider, Rate, Typography } from 'antd';
const { Title } = Typography;
import withBaseMethod, { WithBaseMethodProps } from "@/hooks/withBaseMethod";
import { formatGia, perDiscount } from '@/utils/const';
import { AiOutlinePlus } from 'react-icons/ai';
import { ADD_PRODUCT, REMOVE_PRODUCT } from '@/contexts/cart.reducer';


type ProductProps = {
    product: IProduct;
} & WithBaseMethodProps;

const Detail = ({ product, contexts }: ProductProps) => {
    const { dispatch } = contexts;
    const handleCart = (type: string) => {
        const { id, name, price, thumbnail, per_discount } = product;
        const newData: IProductPurchase = {
            id, name, price, thumbnail, per_discount, price_buy: perDiscount(product), qty_buy: 1
        };
        dispatch({ type, payload: { product: newData } })
    }
    console.log(contexts.cart)
    return (
        <>
            <div className='flex flex-col p-4 w-1/2 lg:w-full'>
                <Title level={4}>{product.name}</Title>
                <div className='flex flex-col gap-4 mt-2 '>
                    <div className='text-gray-700 font-normal text-sm'>
                        Nhà cung cấp : <span className='text-black text-base'>Nhà sách HCM</span>
                    </div>
                    <div className='text-gray-700 font-normal text-sm'>
                        Tác giả : <span className='text-black text-base'>Lê Anh Tuấn</span>
                    </div>
                    <div className='text-gray-700 font-normal text-sm'>
                        Nhà xuất bản : <span className='text-black text-base'>Thanh Niên</span>
                    </div>
                    <div className='text-gray-700 font-normal text-sm'>
                        Hình thức bìa : <span className='text-black text-base'> Bìa Mềm</span>
                    </div>
                </div>
                <Divider />
                <div className='w-full '>
                    <Rate value={product.rating} /> <span> ( {product.rating} lượt đánh giá)</span>
                </div>
                <div className='w-full mt-4 flex items-center gap-x-4' >
                    <span className="text-2xl font-medium text-[#C92127]">{formatGia(perDiscount(product))} </span>
                    {product.per_discount && <>
                        <span className='xt'>{formatGia(product.price)}</span>
                        <span className='bg-[#C92127] text-white p-2 rounded-sm font-medium'> {product.per_discount} %</span>
                    </>}
                </div >
                <Divider />
                <div className=' my-4 flex items-center text-base'>
                    Số lượng :
                    {/* <QtyCart qty={qty} setQty={setQty} id={data.id} page={'detail'} /> */}
                </div>
                <div onClick={() => handleCart(REMOVE_PRODUCT)}>tru</div>
                <div className='flex justify-between items-center gap-3 my-4'>
                    <div className='w-1/2 px-4 py-1.5 bg-white  cursor-pointer text-red-600 border-2 border-red-600 border-solid rounded-md text-base font-semibold text-center' onClick={() => handleCart(ADD_PRODUCT)} >Giỏ hàng</div>
                    <div className='w-1/2  px-4 py-1.5 bg-white cursor-pointer text-black  border-2 border-black border-solid  rounded-md flex justify-center items-center gap-3 text-base font-semibold' ><AiOutlinePlus />yêu thích </div>
                </div>
                <div className=' px-4 py-2 text-white bg-red-600 border border-red-600 rounded-md text-lg font-semibold text-center cursor-pointer' >Mua ngay</div>
            </div>
        </>
    )
}

export default withBaseMethod(Detail)