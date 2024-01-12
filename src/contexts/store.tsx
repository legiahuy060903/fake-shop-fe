"use client"

import { createContext, useState } from 'react';
export const getInitialAppContext: () => AppContextInterface = () => ({
    cart: [],
    setCart: () => null,
    category: [],
    setCategory: () => null,
    reset: () => null,
    getTotal: () => 0,
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
    const [cart, setCart] = useState<ICart[]>(defaultValue.cart);
    const [category, setCategory] = useState<ICategory[]>(defaultValue.category)
    const getTotal = () => cart.reduce((con, item) => (con + item.price_buy * item.price_buy), 0);

    const reset = () => {
        setCart([])
        setCategory([])
    }
    return (
        <AppContext.Provider
            value={{
                cart, setCart, reset, getTotal, category, setCategory, openDrawFilter, setOpenDrawFilter
            }}
        >
            {children}
        </AppContext.Provider>
    )
}