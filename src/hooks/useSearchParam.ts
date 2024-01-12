
import { useSearchParams } from 'next/navigation';
import omitBy from 'lodash/omitBy';
import isUndefined from 'lodash/isUndefined';




export default function useQueryConfig(): ISearchParams {
    const searchParams = useSearchParams();
    const queryParams = Object.fromEntries(searchParams);
    const queryConfig = omitBy(
        {
            _page: parseInt(queryParams._page) || 1,
            _limit: parseInt(queryParams._limit) || 12,
            _sort: queryParams._sort,
            _order: queryParams._order,
            search: queryParams.search,
            _price: queryParams._price,
            _category: queryParams._category,
            _rating: queryParams._rating,
        },
        (value) => isUndefined(value) || value === ''
    ) as unknown as ISearchParams
    return queryConfig
}
