import { useEffect, useState } from "react";
import { Product } from "../../../types/types";
import { getProducts } from "../../Utility/api";
import Header from "../Header/Header";
import Panel from "../Panel/Panel";
import ProductComponent from "../Products/Product/Product";

const Home: React.FC = () => {
  const images = [
    'https://www.vive.com/media/filer_public/fed-assets/hubble/images/vive-flow-meta.png',
    'https://vr-expert.com/wp-content/uploads/2021/12/arpara_headset_image1-1024x574-1.jpg',
    'https://image.cnbcfm.com/api/v1/image/106705004-1600267127335-oculus-quest-2-1.png?v=1600267139&w=1920&h=1080',
  ];

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        const productsOnSale = products.filter(product => product.isOnSale)
        setProducts(productsOnSale);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

return (
    <>
        <Header />
        <Panel images={images} />
        <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-2xl font-semibold mt-5">On Sale!!</h1>
        <ProductComponent products={products} />
        </div>
    </>
);
}

export default Home;