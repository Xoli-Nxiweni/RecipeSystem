import React, { useState } from 'react';
import './Category.css';

const categories = [
  { name: 'Technology', imgSrc: 'tech.jpg' },
  { name: 'Health', imgSrc: 'health.jpg' },
  { name: 'Science', imgSrc: 'science.jpg' },
  { name: 'Business', imgSrc: 'business.jpg' },
  { name: 'Sports', imgSrc: 'sports.jpg' }
];

export const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
    // You can perform other actions here, like fetching related data or navigating to a different page
    console.log('Selected Category:', category);
  };

  return (
    <div className='categories'>
        <h3>Popular Categories</h3>
        <div className="formatCategs">
            {categories.map((category, index) => (
                <div 
                  key={index} 
                  className="categs" 
                  onClick={() => handleChangeCategory(category.name)}
                >
                    <img src={category.imgSrc} alt={category.name} />
                    <h6>{category.name}</h6>
                </div>
            ))}
        </div>
    </div>
  );
};
