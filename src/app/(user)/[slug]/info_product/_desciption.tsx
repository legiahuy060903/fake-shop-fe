"use client"
import React, { memo, useState } from 'react'


const DescriptionProduct = ({ product: { description, name } }: { product: IProduct }) => {
    const [showFullDescription, setFullDescription] = useState<boolean>(false);
    const showFullDescriptionHandler = () => {
        setFullDescription(!showFullDescription);
    };
    return (
        <div className='bg-white p-10 h-auto mt-2'>
            <h4 className="text-2xl text-center mb-2">{name}</h4>
            <p className={`${!showFullDescription && "text-description-product"} mt-4 text-gray-600 leading-6 `}>{description}</p>
            <div className={`mt-4 mx-auto cursor-pointer rounded w-[150px] h-10 flex justify-center items-center bg-white text-[#C92127] border-[#C92127] border-2 border-solid`} onClick={showFullDescriptionHandler}>
                {showFullDescription ? "Thu gọn" : "Xem thêm"}
            </div>
        </div>
    )
}

export default memo(DescriptionProduct)