
interface ProductProps {
    products: {
        name: string;
        price: number;
        image: string;
    }[];
}

const Product: React.FC<ProductProps> = ({ products }) => {
    return (
        <div className="border m-5 rounded-lg p-5 flex justify-start items-center">
            {products.map((product, index) => (
                <div className="m-2 flex flex-col items-cemter" key={index}>
                    <h2 className="font-bold">{product.name}</h2>
                    <img className="rounded" src={product.image} alt={product.name} />
                    <div className="flex justify-center my-1">
                        <p className="mr-9 font-bold">${product.price}</p>
                        <label>Quantity:</label>
                        <select className="border ml-1 rounded-xl">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </select>
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl">
                        Add To Cart
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Product;