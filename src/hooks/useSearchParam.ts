

'use client'

import { useSearchParams } from 'next/navigation'
import omitBy from 'lodash/omitBy';
import isUndefined from 'lodash/isUndefined';

const useQuery = () => {
    const searchParams = useSearchParams();
    return Object.fromEntries(searchParams)
}
export default function useQueryConfig() {
    const queryParams = useQuery()
    const queryConfig = omitBy(
        {
            page: queryParams.page || 1,
            limit: queryParams.limit || 10,
            sort: queryParams.sort,
            search: queryParams.search,
            filterMaxPrice: queryParams.filterMaxPrice,
            filterMinPrice: queryParams.filterMinPrice,
            category: queryParams.category
        },
        isUndefined
    )
    return queryConfig
}