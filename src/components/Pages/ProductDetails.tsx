import { useEffect, useState, ChangeEvent } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../Header/Header";
import { useCart } from "../context/CartContext";
import { getProducts, getProductDetails, addToCart, getUserCart } from "../../Utility/api";
import ProductComponent from "../Products/Product/Product";
import { Product, ProductInformation } from "../../../types/types";
import { ClipLoader } from "react-spinners";
import renderStars from "../UI/ReviewsStars";

const ProductDetails: React.FC = () => {
    const { incrementItem } = useCart();
    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState<Product | null>(null);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [productInformation, setProductInformation] = useState<ProductInformation>({
        product_id: Number(productId),
        quantity: quantity
    });

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await getProductDetails(Number(productId));
                setProductDetails(response);
            } catch (error) {
                console.error("Error fetching product details", error);
            } finally {
                setLoading(false)
            }
        };

        const fetchSimilarProducts = async () => {
            const randomizedProducts = (response: Product[]) => {
                const filteredResponse = response.filter(product => product.id !== productDetails?.id);
                // Pick 4 random items from the filtered array
                const randomItems = filteredResponse
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4);

                setSimilarProducts(randomItems);
            };
            try {
                const response: Product[] = await getProducts();
                randomizedProducts(response);
            } catch (error) {
                console.error("Error fetching similar products", error);
            }
        };

        fetchSimilarProducts();
        fetchProductDetails();
    }, [productId]);

    useEffect(() => {
        setProductInformation(prevState => ({
            ...prevState, // keep the existing product_id
            quantity: quantity
        }));
    }, [quantity]);

    const addProductToCart = async (productInformation: ProductInformation) => {
        try {
            const currentCart = await getUserCart();
            
            // Check if the product is already in the cart
            const productExistsInCart = currentCart.order_items.some(item => item.products_information.product_id === productInformation.product_id);
    
            // Add the product to the cart
            const response = await addToCart(productInformation);
    
            if (response.success) {
                // Only increment if the product is not already in the cart
                if (!productExistsInCart) {
                    incrementItem();
                }
            } else {
                console.error("Failed to add product to cart:", response.message);
            }
        } catch (error) {
            console.error("There was an error adding the product to cart", error);
        }
    };
    
    if (loading) {
        return (
          <div className='h-96 flex justify-center items-center'>
            <ClipLoader color="#000" loading={loading} size={50} />
          </div>
        );
      }

    const QuantitySelector: React.FC = () => {
        const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
            setQuantity(parseInt(event.target.value, 10));
        };

        return (
            <select
                id="quantity"
                className="border ml-1 rounded-xl p-1"
                value={quantity}
                onChange={handleChange}
                aria-label="Select quantity"
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        );
    };


    return (
        <>
            <Header />
            <div className="flex justify-center items-center border">
                <div className="w-full max-w-2xl mt-10 mx-5">
                    <h1 className="text-gray-800 text-5xl font-bold">{productDetails?.name}</h1>
                    <img className="border my-5 max-h-full w-full max-w-2xl object-cover" src={productDetails?.imageUrl} alt="Product" />
                </div>

                <div className="mt-24 mx-10 max-w-2xl">
                    <h1 className="text-3xl font-semibold">Description</h1>
                    <p className="my-3">{productDetails?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nihil cum nobis, voluptatibus velit fugiat aspernatur soluta eligendi eveniet sed quibusdam nesciunt tenetur molestiae et hic maxime incidunt libero aliquid!</p>

                    <Link
                        to={`/reviews/${productDetails?.id}`}
                        className="flex flex-col items-center text-blue-500 hover:bg-blue-100 hover:text-blue-700 my-2 rounded-lg transition-all duration-300 max-w-28"
                    >
                        <span className="text-blue-500 cursor-pointer px-5">Reviews</span>
                        {/* Star Rating */}
                        {productDetails?.rating != null && renderStars(productDetails.rating)}
                    </Link>

                    <div className="flex items-center">
                        {productDetails?.salePrice ? (
                            <>
                                <p className="text-gray-500 text-3xl line-through mr-2">${productDetails?.price}</p>
                                <p className="text-3xl font-bold text-orange-600">${productDetails?.salePrice}</p>
                            </>
                        ) : (
                            <p className="text-3xl font-bold text-orange-600">${productDetails?.price}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="quantity" className="mr-2">Quantity:</label>
                        <QuantitySelector />
                    </div>

                    <button
                        onClick={() => addProductToCart(productInformation)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-5 mr-5"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center w-full my-2">
                <h1 className="text-2xl font-semibold mt-5">More Like This!</h1>
                <div>
                    <ProductComponent products={similarProducts} />
                </div>
            </div>
        </>
    );
};

export default ProductDetails;