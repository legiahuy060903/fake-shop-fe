"use client"

import { createContext, useReducer, useState } from 'react';
import { shopReducer } from './cart.reducer';
export const initCart: ICart = { purchase: [], count_buy: 0, total_buy: 0 };
export const getInitialAppContext: () => AppContextInterface = () => ({
    cart: initCart,
    dispatch: () => { },
    category: [],
    setCategory: () => null,
    reset: () => null,
    openDrawFilter: false, setOpenDrawFilter: () => null,
})

const initialAppContext = getInitialAppContext()

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({
    children,
    defaultValue = initialAppContext
}: {
    children: React.ReactNode
    defaultValue?: AppContextInterface
}) => {

    const [openDrawFilter, setOpenDrawFilter] = useState<boolean>(false);
    const [cart, dispatch] = useReducer(shopReducer, defaultValue.cart);
    const [category, setCategory] = useState<ICategory[]>(defaultValue.category);

    const reset = () => {
    }
    return (
        <AppContext.Provider
            value={{
                dispatch, cart, reset, category, setCategory, openDrawFilter, setOpenDrawFilter
            }}
        >
            {children}
        </AppContext.Provider>
    )
}