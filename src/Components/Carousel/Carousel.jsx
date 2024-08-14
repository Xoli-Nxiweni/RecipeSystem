import { useState, useEffect, useRef } from 'react';
import './Carousel.css';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const Carousel = () => {
    const recipes = [
        {
            image: 'https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/06/THUMB-LINK-2020-2.jpg',
            name: 'Spaghetti Carbonara',
            description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.'
        },
        {
            image: 'https://www.onceuponachef.com/images/2023/08/Beef-Tacos.jpg',
            name: 'Tacos',
            description: 'Soft or crispy tortillas filled with a variety of meats, beans, and toppings.'
        },
        {
            image: 'https://itsavegworldafterall.com/wp-content/uploads/2023/04/Avocado-Caesar-Salad-FI-500x375.jpg',
            name: 'Caesar Salad',
            description: 'A crisp salad with romaine lettuce, Parmesan cheese, croutons, and Caesar dressing.'
        },
        {
            image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1043451_11-4713959.jpg',
            name: 'Chocolate Cake',
            description: 'Rich and moist chocolate cake with a creamy chocolate frosting.'
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);

    useEffect(() => {
        const autoPlay = setInterval(() => {
            handleNextClick();
        }, 3000); 

        return () => clearInterval(autoPlay);
    }, [currentIndex]);

    const handlePrevClick = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? recipes.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex(prevIndex => (prevIndex === recipes.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
            carouselRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }, [currentIndex]);

    return (
        <div className='Carousel'>
            <div className="carouselWrapper">
                <div className="container" ref={carouselRef}>
                    {recipes.map((recipe, index) => (
                        <div key={index} className="carouselContent">
                            <img src={recipe.image} alt={recipe.name} />
                            <div className="texts">
                                <h1>{recipe.name}</h1>
                                <p>{recipe.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={handlePrevClick} className='carouselLeft'>
                <ArrowLeftIcon />
            </button>
            <button onClick={handleNextClick} className='carouselRight'>
                <ArrowRightIcon />
            </button>
        </div>
    );
};
