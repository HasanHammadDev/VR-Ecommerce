import axios from "axios";

let endpoint = "http://localhost:5000"


interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
    imageUrl: string;
    createdAt: Date;
  }
  
  const GetProducts = async (): Promise<Product[]> => {
    try {
      const response = await axios.get<Product[]>(`${endpoint}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products', error);
      throw error;
    }
  };

  export default GetProducts;