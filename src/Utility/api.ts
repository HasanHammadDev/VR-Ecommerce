import axios from "axios";

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
    imageUrl: string;
    createdAt: Date;
  }

  interface accountInformation {
    email: string,
    username: string,
    password: string
}

interface RegisterResponse {
    success: boolean;
    message: string;
}

let endpoint = "http://localhost:5000"


export const GetProductDetails = async (id: number): Promise<Product> => {
    try {
        const response = await axios.get<Product>(`${endpoint}/products/${id}`)
        return response.data;
    } catch (error) {
        console.error("Error", error)
        throw error
    }
}

export const GetProducts = async (): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(`${endpoint}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products', error);
      throw error;
    }
  }

  export const RegisterAccount = async (accountInformation: accountInformation): Promise<RegisterResponse> => {
    try {
        const response = await axios.post(`${endpoint}/register`, accountInformation, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data as RegisterResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('There was an error with the request:', error.response);
            return error.response?.data as RegisterResponse;
        } else {
            console.error('An unexpected error occurred:', error);
            throw error;
        }
    }
}