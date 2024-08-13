import { useState } from 'react';
import './Carousel.css';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const Carousel = () => {
    const images = [
        {
            src: 'https://images.unsplash.com/photo-1527766833261-b09c3163a791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzODc1ODh8MHwxfGFsbHwxfHx8fHx8fHwxNjY2MDA0ODQz&ixlib=rb-1.2.1&q=80&w=1080', 
            text: 'Explore the beauty of nature in Image 1.',
            heading: 'Nature Escapes'
        },
        {
            src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzODc1ODh8MHwxfGFsbHwxfHx8fHx8fHwxNjY2MDA2ODUw&ixlib=rb-1.2.1&q=80&w=1080',
            text: 'Discover the architectural wonders in Image 2.',
            heading: 'Architectural Marvels'
        },
        {
            src: 'https://images.unsplash.com/photo-1518628576179-92eac1e86591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzODc1ODh8MHwxfGFsbHwxfHx8fHx8fHwxNjY2MDA3MjU0&ixlib=rb-1.2.1&q=80&w=1080',
            text: 'Delve into the vibrant culture in Image 3.',
            heading: 'Cultural Heritage'
        },
        {
            src: 'https://images.unsplash.com/photo-1504386106331-3e4e71712b38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzODc1ODh8MHwxfGFsbHwxfHx8fHx8fHwxNjY2MDA4MDUz&ixlib=rb-1.2.1&q=80&w=1080',
            text: 'Experience the thrill of adventure in Image 4.',
            heading: 'Adventure Awaits'
        },
        {
            src: 'https://images.unsplash.com/photo-1522050214677-9545c7a9f07b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzODc1ODh8MHwxfGFsbHwxfHx8fHx8fHwxNjY2MDA4MTIz&ixlib=rb-1.2.1&q=80&w=1080',
            text: 'Relax by the serene waters in Image 5.',
            heading: 'Serenity by the Water'
        }
    ];
    
    

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const handleNextClick = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className='Carousel'>
            <div className="container">
                <button onClick={handlePrevClick}><ArrowLeftIcon /></button>
                <div className="carouselContent">
                    <img src={images[currentIndex].src} alt="carousel" />
                    <div className="texts">
                    <p>{images[currentIndex].text}</p>
                    <h1>{images[currentIndex].heading}</h1>
                    </div>
                </div>
                <button onClick={handleNextClick}><ArrowRightIcon /></button>
            </div>
        </div>
    );
}
