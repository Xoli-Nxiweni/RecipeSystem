import { useState } from 'react';
import './Category.css';

const categories = [
  // { "name": "All", "imgSrc": "" },
    { "name": "Main Course", "imgSrc": "https://media.istockphoto.com/id/1403973419/photo/table-top-of-food-spread-on-table.jpg?s=612x612&w=0&k=20&c=2cROUMurZUtuvqF-bp8lViZ0wDXBNkZBcIjQj2QQlec=" },
    { "name": "Dessert", "imgSrc": "https://sweetsavoryandsteph.com/wp-content/uploads/2020/09/IMG_2664-scaled.jpg" },
    { "name": "Salad", "imgSrc": "https://assets-jpcust.jwpsrv.com/thumbnails/qSXwlEH3-720.jpg" },
    { "name": "Pasta", "imgSrc": "https://assets.epicurious.com/photos/5988e3458e3ab375fe3c0caf/1:1/w_3607,h_3607,c_limit/How-to-Make-Chicken-Alfredo-Pasta-hero-02082017.jpg" },
    { "name": "Vegetarian", "imgSrc": "https://www.bda.uk.com/static/5c06fd9c-d289-4d55-b05c42727050b344/724x482_highestperformance__4a7c7e45a350/bowlofsalad.jpg" },
    { "name": "Soup", "imgSrc": "https://www.yummytummyaarthi.com/wp-content/uploads/2022/07/chicken-clear-soup-1.jpg" },
    { "name": "Brunch", "imgSrc": "https://www.halfbakedharvest.com/wp-content/uploads/2019/04/Ultimate-Spring-Brunch-Board-1.jpg" },
    { "name": "Appetizer", "imgSrc": "https://www.cookincanuck.com/wp-content/uploads/2022/12/Cucumber-Shrimp-Appetizers-Square-1200-1.jpg" },
    { "name": "Breakfast", "imgSrc": "https://simply-delicious-food.com/wp-content/uploads/2022/09/Breakfast-board28.jpg" }

];

// eslint-disable-next-line react/prop-types
export const Category = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all'); // Default to 'all'

  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category); // Notify the parent component
    }
  };

  return (
    <div className='categories'>
      <h3>Popular Categories</h3>
      <div className="formatCategs">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className={`categs ${selectedCategory === category.name ? 'active' : ''}`}
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
