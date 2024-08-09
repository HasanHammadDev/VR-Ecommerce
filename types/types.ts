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
    email: string,
    username: string,
    password: string,
    created_at: Date
}

export interface ProductInformation {
    product_id: number;
    quantity: number;
}