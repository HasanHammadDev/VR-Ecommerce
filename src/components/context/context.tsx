import { createContext, useContext, useState } from 'react';

interface CartContextType {
    itemCount: number;
    incrementItem: () => void;
    decrementItem: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
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
        incrementItem,
        decrementItem,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};