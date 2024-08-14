export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
    imageUrl: string;
    createdAt: Date;
}

export interface ProductsArray {
    products: Product[];
}

export interface SlideshowPanelProps {
    images: string[];
}

export interface Inputs {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface PasswordCriteria {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
}

export interface GeneralServerResponse {
    success: boolean;
    message: string;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
}

export interface CartContextType {
    itemCount: number;
    setItemCount: (count: number) => void;
    incrementItem: () => void;
    decrementItem: () => void;
}

export interface ProviderProps {
    children: React.ReactNode;
}

export interface accountInformation {
    email: string,
    username: string,
    password: string
}

export interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProfileResponse {
    email: string;
    username: string;
    created_at: string;
    item_count: number;
}

export interface ProductInformation {
    product_id: number;
    quantity: number;
}

export interface CartProduct {
    product_name: string;
    description: string;
    price: number;
    image_url: string;
  }
  
  export interface CartOrderItem {
    order_id: number;
    quantity: number;
    price: number;
    created_at: string;
    products_information: CartProduct;
  }
  
  export interface CartResponse {
    success: boolean;
    order_items: CartOrderItem[];
  }