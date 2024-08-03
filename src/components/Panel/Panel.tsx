import { useState, useEffect } from 'react';
import { SlideshowPanelProps } from '../../../types/types';


const Panel: React.FC<SlideshowPanelProps> = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const nextSlide = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [images.length, currentImageIndex]);

    return (
        <div className="flex items-center justify-center bg-white border shadow-2xl shadow-black-900 rounded-md relative mx-60 mt-5 h-96">
            <button
                className="fixed left-56 bg-slate-500 text-white px-3 py-1 rounded-3xl font-semibold"
                onClick={prevSlide}
            >
                &lt;
            </button>
            <button
                className="fixed right-56 bg-slate-500 text-white px-3 py-1 rounded-3xl font-semibold"
                onClick={nextSlide}
            >
                &gt;
            </button>
            <img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`Slideshow Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover rounded-md transition-opacity duration-500"
                style={{ opacity: 1 }}
            />
        </div>
    );
};

export default Panel;
