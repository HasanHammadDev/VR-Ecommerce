import { Link } from "react-router-dom";
import { ProductsArray } from "../../../../types/types";
import renderStars from "../../UI/ReviewsStars.tsx";

const Product: React.FC<ProductsArray> = ({ products }) => {
    const productDetailsRoute: string = "/products";

    return (
        <div className="border m-5 rounded-lg p-6 flex flex-wrap justify-center items-start shadow-2xl bg-white">
            {products.map((product) => (
                <Link
                    key={product.id}
                    className="flex flex-col items-center bg-gray-100 rounded-lg overflow-hidden shadow-md m-4 p-4 max-w-[300px] hover:shadow-2xl transition-all"
                    to={`${productDetailsRoute}/${product.id}`}
                >
                    <div className="flex flex-col items-center w-full">
                        <h2 className="font-bold text-lg mb-2 text-gray-800">{product.name}</h2>
                        <img
                            className="rounded-lg h-60 w-60 max-w-[300px] max-h-[300px] object-cover mb-2"
                            src={product.imageUrl}
                            alt={product.name}
                        />

                        {product?.rating != null && renderStars(product.rating)}

                        <div className="flex justify-center w-full">
                            {product.isOnSale ? (
                                <div className="flex">
                                    <p className="text-gray-500 line-through mr-2 text-xl">${product.price}</p>
                                    <p className="text-xl font-bold text-orange-600">${product.salePrice}</p>
                                </div>
                            ) : (
                                <p className="text-xl font-bold text-orange-600">${product.price}</p>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Product;