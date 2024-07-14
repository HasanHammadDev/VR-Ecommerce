import Header from "../Header/Header";


const Cart: React.FC = () => {
    return (
        <>
            <Header />
            <h2 className="m-3 text-xl">Your Cart:</h2>
            <div className="cart-items border-b border-orange-700 max-w-3xl ml-2 justify-between flex">
                <p className="font-bold text-gray-500">Item</p>
                <p className="font-bold mr-4 text-gray-500">Price</p>
            </div>
            <div className="cart-items border-b border-orange-700 max-w-3xl m-2 p-2 justify-start flex">
                <img className="w-56 h-44" src="https://d1b5h9psu9yexj.cloudfront.net/58136/Meta-Quest-3_20231006-162546_full.jpeg"></img>
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="font-bold text-orange-400 text-3xl max-w-fit whitespace-nowrap">VR HEADSET</h1>
                        <p>Quantity: 1</p>
                    </div>
                    <div className="flex justify-start w-80">
                        <button className=" text-orange-700 underline mx-2 font-bold">Buy Now</button>
                        <button className=" text-orange-700 underline  mx-2 font-bold">Remove Item</button>
                    </div>

                </div>
                <div className="w-full flex justify-end text-black-700">
                    <p>$299.99</p>
                </div>
            </div>
        </>
    );
};

export default Cart;