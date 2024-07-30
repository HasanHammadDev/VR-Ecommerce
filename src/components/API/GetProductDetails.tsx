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

let endpoint = "http://localhost:5000"


const GetProductDetails = async (id: number): Promise<Product> => {
    try {
        const response = await axios.get<Product>(`${endpoint}/products/${id}`)
        return response.data;
    } catch (error) {
        console.error("Error", error)
        throw error
    }
}

export default GetProductDetails;