import { createContext, useContext, useState } from 'react';
import { ProviderProps, CartContextType } from '../../../types/types';


const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};



export const CartProvider: React.FC<ProviderProps> = ({ children }) => {
    const [itemCount, setItemCount] = useState<number>(0);

    const incrementItem = () => {
        setItemCount(prevCount => prevCount + 1);
    };

    const decrementItem = () => {
        if (itemCount > 0) {
            setItemCount(prevCount => prevCount - 1);
        }
    };

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
