export { }
declare global {

    interface ISearchParams {
        _page: number;
        _limit: number;
        _sort?: string;
        _order?: string;
        search?: string;
        _price?: string;
        _category?: string;
        _rating?: number;
        _publish_date?: string;
    }


    interface ICart {
        count_buy: number,
        price_buy: number,
        product: IProduct
    }



}