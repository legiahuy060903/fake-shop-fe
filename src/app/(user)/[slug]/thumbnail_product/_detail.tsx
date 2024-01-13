"use client"
import React from 'react'
import { Typography } from 'antd';

const { Title } = Typography;

import withBaseMethod, { WithBaseMethodProps } from "@/hooks/withBaseMethod";


type ProductProps = {
    product: IProduct;
} & WithBaseMethodProps;

const Detail = ({ product }: ProductProps) => {
    return (
        <div className='flex flex-col p-4 w-1/2 lg:w-full'>
            <Title level={4}>{product.name}</Title>
        </div>
    )
}

export default withBaseMethod(Detail)