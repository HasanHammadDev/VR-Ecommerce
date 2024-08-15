import { useEffect, useState } from "react";
import ProductComponent from "./Product/Product";
import { getProducts } from "../../Utility/api";
import { Product } from "../../../types/types.ts"

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const products = await getProducts();
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
            <ProductComponent products={products} />
        </>
    );
}

export default ProductList;