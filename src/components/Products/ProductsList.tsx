import { useState } from "react";
import Product from "./Product/Product";

interface ProductType {
    name: string;
    price: number;
    image: string;
}


const ProductList: React.FC = () => {
    const [products] = useState<ProductType[]>([
        {
            name: 'Oculus Rift S',
            price: 399.99,
            image: 'https://fakeimg.pl/200x200/'
        },
        {
            name: 'HTC Vive Pro',
            price: 799.99,
            image: 'https://fakeimg.pl/200x200/'
        },
        {
            name: 'PlayStation VR',
            price: 299.99,
            image: 'https://fakeimg.pl/200x200/'
        }
    ]);


    return (
        <>
            <Product products={products} />
        </>
    );
}

export default ProductList;