"use client"
import { Rate } from 'antd'
import React from 'react'
import { formatGia } from '@/utils/const';
import { BsCartPlus } from 'react-icons/bs';
import Link from 'next/link';
import "@/styles/slide.css";
import withBaseMethod, { WithBaseMethodProps } from "@/hooks/withBaseMethod";

type ProductProps = {
    item: IProduct;
} & WithBaseMethodProps;
const Product = ({ item }: ProductProps) => {


    const handAddToCart = () => {
        // dispatch(addToCart({ qty: 1, detail: item }));
    }
    return (
        <>
            <div className='bg-slate-50 my-2 w-[90%] relative product-item  transition-all border-solid border-2 border-slate-100 rounded-md '>
                <Link className='text-none h-[200px] flex justify-center items-center flex-col overflow-hidden mt-4 ' href={`/${item.slug}`}>
                    <img src={item.thumbnail} className=' h-full ' />
                </Link>
                <div className='text-red-600 text-lg font-medium text-center mt-4' >{formatGia(item.price)}</div>
                <Link href={`/${item.slug}`} className="text-name-product mt-4">{item.name}</Link>
                <div className='flex justify-center my-2' ><Rate defaultValue={item.rating} /></div>
                <div className='product-show absolute top-0 w-full h-[220px] z-20 flex justify-center items-center flex-col gap-4 transition'>
                    <div className='w-28 h-10 flex justify-center items-center bg-main rounded-md text-base text-white shadow-lg ' >Yêu thích</div>
                    <div className='w-28 h-10 flex justify-center items-center bg-main rounded-md text-base text-white shadow-lg ' onClick={handAddToCart}> <BsCartPlus /></div>
                </div>
            </div >
        </>
    )
}

export default withBaseMethod(Product)