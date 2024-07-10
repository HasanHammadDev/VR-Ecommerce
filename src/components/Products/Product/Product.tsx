import { useCart } from "../../context/context";
import { useState, ChangeEvent } from "react";

interface ProductProps {
    products: {
        name: string;
        price: number;
        image: string;
    }[];
}

const Product: React.FC<ProductProps> = ({ products }) => {
    const { incrementItem } = useCart();

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
        <div className="border m-5 rounded-lg p-5 flex justify-start items-center">
            {products.map((product, index) => (
                <div className="m-2 flex flex-col items-center" key={index}>
                    <h2 className="font-bold">{product.name}</h2>
                    <img className="rounded" src={product.image} alt={product.name} />
                    <div className="flex justify-center my-1">
                        <p className="mr-9 font-bold">${product.price}</p>
                        <label htmlFor={`quantity-${index}`} className="mr-2">Quantity:</label>
                        <QuantitySelector />
                    </div>
                    <button
                        onClick={incrementItem}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                    >
                        Add To Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Product;
