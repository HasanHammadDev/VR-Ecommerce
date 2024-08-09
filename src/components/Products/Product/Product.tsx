import { Link } from "react-router-dom";
import { ProductsArray } from "../../../../types/types";


const Product: React.FC<ProductsArray> = ({ products }) => {
    const productDetailsRoute: string = "/products";

    return (
        <div className="border m-5 rounded-lg p-5 flex flex-wrap justify-center items-center shadow-2xl">
            {products.map((product) => (
                <div key={product.id}>
                    <Link className="m-4 flex flex-col items-center" to={`${productDetailsRoute}/${product.id}`}>
                        <h2 className="font-bold">{product.name}</h2>
                        <img className="rounded" src={product.imageUrl} alt={product.name} />
                        <div className="flex justify-center my-1">
                            <p className="text-xl   font-bold">${product.price}</p>
                        </div>
                    </Link>
                </div>

            ))}
        </div>
    );
};

export default Product;