import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import GetProductDetails from "../API/GetProductDetails";
import Header from "../Header/Header";
import { useCart } from "./../context/context";

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
    imageUrl: string;
    createdAt: Date;
}

const ProductDetails: React.FC = () => {
    const { incrementItem } = useCart();
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState<Product | null>(null)

    useEffect(() => {
        const fetchProductDetails = async () => {
            const response = await GetProductDetails(Number(id));
            setProductDetails(response);
            console.log(response)
        }
        fetchProductDetails()
    }, [id])

    const QuantitySelector: React.FC = () => {
        const [quantity, setQuantity] = useState<number>(1);

        const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
            setQuantity(parseInt(event.target.value, 10));
        };

        return (
            <select
                id="quantity"
                className="border ml-1 rounded-xl"
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
            <div className="flex justify-center items-center">
                <div className="w-full max-w-2xl mt-10 mx-5">
                    <h1 className="text-orange-700 text-5xl font-bold">{productDetails?.name}</h1>
                    <img className="border my-5 h-96 w-full max-w-2xl object-cover" src={productDetails?.imageUrl} alt="vr headset" />
                </div>

                <div className="mt-24 mx-10 max-w-2xl">
                    <h1 className="text-3xl font-semibold">Description</h1>
                    <p className="my-3" >{productDetails?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis omnis ipsum, perferendis, quas nam laboriosam id accusantium maxime temporibus incidunt similique consequatur ratione. Quidem magni aliquid alias pariatur ad ipsum eligendi vitae, laudantium aperiam facilis aliquam error temporibus repellendus ipsam cumque? Aliquid ipsam quos placeat. Saepe corporis at quisquam vitae.</p>
                    <p className="text-3xl mt-5 font-bold">${productDetails?.price}</p>
                    <div>
                    <label htmlFor={`quantity`} className="mr-2">Quantity:</label>
                    <QuantitySelector />
                    </div>

                    <button
                        onClick={incrementItem}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-5 mr-5"
                    >
                        Add To Cart
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-5"
                    >
                        Buy Now
                    </button>
                </div>

            </div>
        </>

    );
}

export default ProductDetails;