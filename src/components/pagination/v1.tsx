"use client"


import { Pagination } from 'antd';
import withBaseMethod, { WithBaseMethodProps } from '@/hooks/withBaseMethod';

const PaginationCustom = ({ queryConfig, router, queryString, total }: WithBaseMethodProps) => {
    const onChange = (page: number, pageSize: number) => {
        router.push('shop?' + queryString.stringify({ ...queryConfig, _page: page, _limit: pageSize }));
    };
    return <Pagination current={queryConfig._page} onChange={onChange} total={total} pageSize={queryConfig._limit} />;
};

export default withBaseMethod(PaginationCustom);