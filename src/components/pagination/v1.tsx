"use client"
import { Pagination } from 'antd';
import withBaseMethod, { WithBaseMethodProps } from '@/hooks/withBaseMethod';
const PaginationCustom = withBaseMethod(({ queryConfig, pathname, router, queryString, total, setMeta, pageSize, _page }: WithBaseMethodProps) => {
    const onChange = (page: number, pageSize: number) => {
        if (pathname.startsWith("/shop")) router.push('shop?' + queryString.stringify({ ...queryConfig, _page: page, _limit: pageSize }))
        else setMeta((prev: any) => ({ ...prev, _page: page }));
    };
    return <Pagination current={_page || queryConfig._page} onChange={onChange} total={total} pageSize={pageSize || queryConfig._limit} />;
})

export default PaginationCustom;