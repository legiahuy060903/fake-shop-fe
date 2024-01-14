import { Col, Grid, Row, Skeleton } from 'antd';
import React from 'react';

const SkeletonCustom = () => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
        arr.push(
            <div className={`flex flex-col lg:w-1/4 md:w/1/3 xs:w-full w-1/5 list-product-skeleton-${i}`} key={i}>
                <div className='flex justify-center items-center w-full'>
                    <Skeleton.Image className='skeleton-item-product' active />
                </div>
                <Skeleton
                    className='mt-4'
                    active
                    title={{ width: '80%' }}
                    paragraph={{
                        rows: 4,
                        width: ['100%'],
                    }}
                />
            </div>
        );
    }

    return (
        <div className='w-full flex justify-between items-center overflow-hidden gap-1'>
            {arr}
        </div>
    );
};

export default SkeletonCustom;
