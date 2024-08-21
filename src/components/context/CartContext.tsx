import React, { createContext, useState, useEffect } from 'react';
import { ProviderProps, CartContextType } from '../../../types/types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = React.useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<ProviderProps> = ({ children }) => {
    const [itemCount, setItemCount] = useState<number>(() => {
        const storedItemCount = localStorage.getItem('itemCount');
        return storedItemCount ? parseInt(storedItemCount, 10) : 0;
    });

    const incrementItem = () => {
        setItemCount(prevCount => prevCount + 1);
    };

    const decrementItem = () => {
        setItemCount(prevCount => Math.max(prevCount - 1, 0)); // Ensure itemCount does not go below 0
    };

    useEffect(() => {
        localStorage.setItem('itemCount', itemCount.toString());
    }, [itemCount]);

    const contextValue: CartContextType = {
        itemCount,
        setItemCount,
        incrementItem,
        decrementItem,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};