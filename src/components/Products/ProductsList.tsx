import { useEffect, useState } from "react";
import ProductComponent from "./Product/Product";
import { getProducts } from "../../Utility/api";
import { Product } from "../../../types/types.ts"
import { ClipLoader } from "react-spinners";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const products = await getProducts();
          setProducts(products);
        } catch (error) {
          console.error('Error', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []);

    if (loading) {
      return (
        <div className='h-96 flex justify-center items-center'>
          <ClipLoader color="#000" loading={loading} size={50} />
        </div>
      );
    }


    return (
        <>
            <h1 className="font-semibold m-5 text-4xl text-center">All Products</h1>
            <ProductComponent products={products} />
        </>
    );
}

export default ProductList;