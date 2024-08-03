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

export interface RegisterResponse {
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
}

export interface CartContextType {
    itemCount: number;
    incrementItem: () => void;
    decrementItem: () => void;
}

export interface CartProviderProps {
    children: React.ReactNode;
}

export interface accountInformation {
    email: string,
    username: string,
    password: string
}
