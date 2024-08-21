import { useState, useEffect, useCallback } from 'react';
import { SlideshowPanelProps } from '../../../types/types';

const Panel: React.FC<SlideshowPanelProps> = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    const nextSlide = useCallback(() => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) =>
                    (prevIndex + 1) % images.length
                );
                setIsTransitioning(false);
            }, 600);
        }
    }, [images.length, isTransitioning]);

    const prevSlide = useCallback(() => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) =>
                    (prevIndex - 1 + images.length) % images.length
                );
                setIsTransitioning(false);
            }, 500);
        }
    }, [images.length, isTransitioning]);

    useEffect(() => {
        const interval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <div
            className="relative w-full max-w-3xl mx-auto h-80 overflow-hidden my-10 border rounded-md"
            aria-live="polite"
        >
            <img
                className={`w-full h-full object-cover rounded-md transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                src={images[currentImageIndex]}
                alt={`Slideshow Image ${currentImageIndex + 1}`}
            />
            <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-500 text-white px-3 py-1 rounded-2xl font-semibold z-10 hover:bg-slate-700"
                onClick={prevSlide}
                aria-label="Previous slide"
            >
                &lt;
            </button>
            <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-500 text-white px-3 py-1 rounded-2xl font-semibold z-10 hover:bg-slate-700"
                onClick={nextSlide}
                aria-label="Next slide"
            >
                &gt;
            </button>
        </div>
    );
};

export default Panel;