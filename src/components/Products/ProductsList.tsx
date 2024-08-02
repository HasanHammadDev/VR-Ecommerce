import { useEffect, useState } from "react";
import Product from "./Product/Product";
import { GetProducts } from "../../Utility/api";

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
    imageUrl: string;
    createdAt: Date;
  }


const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const products = await GetProducts();
          setProducts(products);
        } catch (error) {
          console.error('Error', error);
        }
      };
  
      fetchProducts();
    }, []);


    return (
        <>
            <h1 className="font-semibold m-5 text-3xl">Featured</h1>
            <Product products={products} />
        </>
    );
}

export default ProductList;