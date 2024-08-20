import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { getProductReviews, postProductReview } from "../../Utility/api";
import { useAuth } from "../context/AuthContext";
import { Review, ReviewInput } from "../../../types/types";


const Reviews: React.FC = () => {
    const { productId } = useParams();
    const { isLoggedIn } = useAuth();
    const [review, setReview] = useState<ReviewInput>({
        comment: '',
        rating: 0,
        productId: Number(productId)
    })
    const [hover, setHover] = useState<number>(0);
    const [productReviews, setProductReviews] = useState<Review[] | null>(null)
    const [reviewPosted, setReviewPosted] = useState<boolean>(false);
    const [serverResponse, setServerResponse] = useState<string | null>(null);

    useEffect(() => {
        const getReviews = async () => {
            try {
                const resposne = await getProductReviews(Number(productId))
                if (resposne.reviews.length > 0) {
                    setProductReviews(resposne.reviews)
                }
            } catch (error) {
                console.error('There was an error fetching reviews', error)
            }
        }

        if (isLoggedIn) {
            getReviews();
        }
    }, [isLoggedIn, reviewPosted, productId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await postProductReview(review);
            setServerResponse(response.message);
            setReview({
                comment: '',
                rating: 0,
                productId: Number(productId)
            });
            setReviewPosted(prev => !prev);

            setTimeout(() => {
                setServerResponse(null)
            }, 3000);
        } catch (error) {
            console.error('There was an error posting the review', error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, property: keyof ReviewInput) => {
        setReview(prevReview => ({
            ...prevReview,
            [property]: e.target.value,
        }));
    };

    return (
        <>
            <Header />
            <div className="flex justify-center p-6 bg-gray-100">
                <form className="flex flex-col w-full max-w-md bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-semibold mb-4 text-gray-800">Leave a Review!</h1>

                    {/* Star Rating System */}
                    <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, index) => {
                            const starIndex = index + 1;
                            return (
                                <button
                                    type="button"
                                    key={starIndex}
                                    className={`text-2xl ${starIndex <= (hover || review.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                                    onClick={() => setReview(prevReview => ({...prevReview,
                                        rating: starIndex}))}
                                    onMouseEnter={() => setHover(starIndex)}
                                    onMouseLeave={() => setHover(review.rating)}
                                >
                                    <span>&#9733;</span>
                                </button>
                            );
                        })}
                    </div>

                    <textarea
                        value={review.comment}
                        className="border border-gray-300 rounded-lg p-3 mb-4 resize-none h-24"
                        onChange={(e) => {handleChange(e, 'comment')}}
                        placeholder="Write your review here..."
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                        type="submit"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
            
            <div className="flex justify-center p-6 bg-gray-50">
                {serverResponse && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                        {serverResponse}
                    </div>
                )}
            </div>

            <div className="flex justify-center p-6 bg-gray-50">
                <div className="w-full max-w-3xl">
                    {productReviews ? (
                        productReviews.map((review) => (
                            <div className="m-5 p-6 border border-gray-200 rounded-lg shadow-md bg-white" key={review.id}>
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{review.username}</h2>
                                <div className="flex items-center mb-2">
                                    {[...Array(5)].map((_, index) => {
                                        const starIndex = index + 1;
                                        return (
                                            <span
                                                key={starIndex}
                                                className={`text-2xl ${starIndex <= review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                            >
                                                &#9733;
                                            </span>
                                        );
                                    })}
                                </div>
                                <p className="text-gray-700 mb-2">{review.comment}</p>
                                <p className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <h1 className="text-center text-lg text-gray-600 mt-10 font-medium bg-gray-100 p-6 border border-gray-300 rounded-lg shadow-md">
                            No reviews yet for this product. Be the first to share your thoughts!
                        </h1>
                    )}
                </div>
            </div>
        </>
    );
}

export default Reviews;