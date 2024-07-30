import { Link } from "react-router-dom";

interface ProductProps {
    products: {
        id: number;
        name: string;
        description: string;
        price: string;
        category: string;
        imageUrl: string;
        createdAt: Date;
    }[];
}

const Product: React.FC<ProductProps> = ({ products }) => {
    const productDetailsRoute: string = "/products";



    return (
        <div className="border m-5 rounded-lg p-5 flex flex-wrap justify-center items-center shadow-2xl">
            {products.map((product) => (
                <Link to={`${productDetailsRoute}/${product.id}`}>
                    <div className="m-2 flex flex-col items-center" key={product.id}>
                        <h2 className="font-bold">{product.name}</h2>
                        <img className="rounded" src={product.imageUrl} alt={product.name} />
                        <div className="flex justify-center my-1">
                            <p className="mr-9 font-bold">${product.price}</p>

                        </div>

                    </div>
                </Link>

            ))}
        </div>
    );
};

export default Product;
