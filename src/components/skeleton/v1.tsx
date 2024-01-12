import { Col, Grid, Row, Skeleton } from 'antd'
import React from 'react';
const SkeletonCustom = () => {
    return (
        <div className='flex justify-start w-full p-3'>
            <Skeleton
                className='mt-4'
                active
                title={{ width: "100%" }}
                paragraph={{
                    rows: 5,
                    width: ['100%']
                }}
            />
        </div>
    )
}

export default SkeletonCustom