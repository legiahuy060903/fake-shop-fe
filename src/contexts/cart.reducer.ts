export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const CLEAR_PRODUCT = "CLEAR_PRODUCT";
import _ from "lodash";
export interface IAction {
    type: typeof ADD_PRODUCT | typeof REMOVE_PRODUCT | typeof CLEAR_PRODUCT;
    payload?: any
}

type add = {
    product: IProductPurchase
}
const addToCart = (state: ICart, { product }: add) => {
    const cart = _.cloneDeep(state);
    const index = cart.purchase.findIndex(item => item.id === product.id);
    if (index > -1) {
        const updatedItem = { ...cart.purchase[index], qty_buy: cart.purchase[index].qty_buy + 1 };
        cart.purchase[index] = updatedItem;
    } else cart.purchase.push(product);
    cart.count_buy += 1;
    cart.total_buy += product.price_buy;
    return cart;
};


const removeProductFromCart = (state: ICart, { product }: add) => {
    const cart = _.cloneDeep(state);
    const index = cart.purchase.findIndex(item => item.id === product.id);
    if (index > -1) {
        const updatedItem = { ...cart.purchase[index], qty_buy: cart.purchase[index].qty_buy - 1 };
        if (updatedItem.qty_buy <= 0) cart.purchase.splice(index, 1)
        else cart.purchase[index] = updatedItem;
        cart.count_buy -= 1;
        cart.total_buy -= product.price_buy;
    }
    return cart;
};


export const shopReducer = (state: ICart, { type, payload }: IAction) => {
    switch (type) {
        case ADD_PRODUCT:
            return addToCart(state, payload);
        case REMOVE_PRODUCT:
            return removeProductFromCart(state, payload);
        default:
            return state;
    }
};