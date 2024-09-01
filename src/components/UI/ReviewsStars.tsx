const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, index) => (
                <span key={`full-${index}`} className="text-2xl text-yellow-500">&#9733;</span>
            ))}
            {hasHalfStar && (
                <span className="text-2xl relative">
                    <span className="absolute top-0 left-0 text-yellow-500" style={{ width: '50%', overflow: 'hidden' }}>&#9733;</span>
                    <span className="text-2xl text-gray-300">&#9733;</span>
                </span>
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <span key={`empty-${index}`} className="text-2xl text-gray-300">&#9733;</span>
            ))}
        </div>
    );
};

export default renderStars;