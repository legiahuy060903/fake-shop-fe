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

    interface AppContextInterface {
        cart: ICart
        // setCart: React.Dispatch<React.SetStateAction<ICart[]>>
        category: ICategory[]
        setCategory: React.Dispatch<React.SetStateAction<ICategory[]>>
        reset: () => void
        dispatch: React.Dispatch<IAction>,
        // getTotal: () => number
        openDrawFilter: boolean
        setOpenDrawFilter: React.Dispatch<React.SetStateAction<boolean>>
    }
    interface IProductPurchase {
        id: number;
        name: string;
        price: number;
        thumbnail: string;
        per_discount?: string | null;
        qty_buy: number;
        price_buy: number;
    }
    interface ICart {
        total_buy: number;
        count_buy: number;
        purchase: IProductPurchase[]
    }



}