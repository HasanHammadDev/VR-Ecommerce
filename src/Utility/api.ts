import axios from "axios";
import { Product, accountInformation, GeneralServerResponse, Credentials, LoginResponse, ProfileResponse, ProductInformation, CartResponse } from "../../types/types";

let endpoint = "http://localhost:5000"


export const getProductDetails = async (id: number): Promise<Product> => {
    try {
        const response = await axios.get<Product>(`${endpoint}/products/${id}`)
        return response.data;
    } catch (error) {
        console.error("Error", error)
        throw error
    }
}

export const getProducts = async (): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(`${endpoint}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products', error);
      throw error;
    }
  }

  export const registerAccount = async (accountInformation: accountInformation): Promise<GeneralServerResponse> => {
    try {
        const response = await axios.post(`${endpoint}/register`, accountInformation, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data as GeneralServerResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('There was an error with the request:', error.response);
            return error.response?.data as GeneralServerResponse;
        } else {
            console.error('An unexpected error occurred:', error);
            throw error;
        }
    }
}

export const loginAccount = async (loginInformation: Credentials): Promise<LoginResponse> => {
    try {
        const response = await axios.post(`${endpoint}/login`, loginInformation, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          });
        return response.data as LoginResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            console.error('Error logging in:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}

export const logoutAccount = async (): Promise<GeneralServerResponse> => {
    try {
        const response = await axios.post(`${endpoint}/logout`, null, {
            withCredentials: true
          });
        return response.data as GeneralServerResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            console.error('Error logging in:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}

export const getProfile = async (): Promise<ProfileResponse> => {
    try {
        const response = await axios.get(`${endpoint}/profile`, {
            withCredentials: true
        });
        return response.data as ProfileResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            console.error('Error fetching profile:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}

export const checkTokenValidity = async (): Promise<boolean> => {
    try {
        const response = await axios.get(`${endpoint}/validate-token`, { withCredentials: true });
        console.log(response.data)
        return response.data.success;
    } catch (error) {
        console.error('An error occured', error);
        return false;
    }
};

export const addToCart = async (productInformation: ProductInformation): Promise<GeneralServerResponse> => {
    try {
        const response = await axios.post(`${endpoint}/add-to-cart`, productInformation, {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            console.error('Error fetching profile:', error.response?.data || error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}

export const getUserCart = async (): Promise<CartResponse> => {
    try {
        const response = await axios.get(`${endpoint}/cart`, {
            withCredentials: true
        })
        console.log(response.data)
        return response.data as CartResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            console.error('Error fetching profile:', error.response?.data || error.message);
        } else {
        console.error(`There was an error fetching user's cart`, error);
        }
        throw error;
    }
}