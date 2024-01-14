import { Col, Grid, Row, Skeleton } from 'antd'
import React from 'react';
const SkeletonImgCustom = ({ }) => {


    return (
        <div className='flex justify-between gap-2 overflow-hidden w-full p-3'>
            <div className='flex-1'>
                <Skeleton.Image
                    active
                    className='skeleton-img-slide-product'
                />
            </div>
            <div className='flex-1'>
                <Skeleton.Image
                    active
                    className='skeleton-img-slide-product'
                />
            </div>
            <div className='flex-1'>
                <Skeleton.Image
                    active
                    className='skeleton-img-slide-product'
                />
            </div>
            <div className='flex-1'>
                <Skeleton.Image
                    active
                    className='skeleton-img-slide-product'
                />
            </div>
        </div>
    )
}

export default SkeletonImgCustom