import { useState, useEffect } from 'react';
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

    useEffect(() => {
        const autoPlay = setInterval(() => {
            handleNextClick();
        }, 3000); // Change slide every 5 seconds

        return () => clearInterval(autoPlay); // Cleanup interval on component unmount
    }, [currentIndex]);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? recipes.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === recipes.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className='Carousel'>
            <div className="container">
                <button onClick={handlePrevClick} className='carouselLeft'>
                    <ArrowLeftIcon />
                </button>
                <div className="carouselContent">
                    <img src={recipes[currentIndex].image} alt={recipes[currentIndex].name} />
                    <div className="texts">
                        <h1>{recipes[currentIndex].name}</h1>
                        <p>{recipes[currentIndex].description}</p>
                    </div>
                </div>
                <button onClick={handleNextClick} className='carouselRight'>
                    <ArrowRightIcon />
                </button>
            </div>
        </div>
    );
};
