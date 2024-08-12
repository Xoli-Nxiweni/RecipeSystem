import React, { useState } from 'react';
import './Menu.css';

const initialRecipes = [
  { id: 1, title: 'Spaghetti Carbonara', imgSrc: 'https://images.unsplash.com/photo-1546180997-c7d83f620c5b' },
  { id: 2, title: 'Chicken Alfredo', imgSrc: 'https://images.unsplash.com/photo-1614697696705-2c6d79a679c5' },
  { id: 3, title: 'Beef Stroganoff', imgSrc: 'https://images.unsplash.com/photo-1582431948562-6f6ec2d0d32b' },
];

export const Menu = () => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [isAdding, setIsAdding] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ title: '', imgSrc: '' });

  const handleEdit = (id) => {
    const updatedTitle = prompt('Enter new title:');
    if (updatedTitle) {
      setRecipes(recipes.map(recipe =>
        recipe.id === id ? { ...recipe, title: updatedTitle } : recipe
      ));
    }
  };

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to remove this recipe?')) {
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    }
  };

  const handleView = (id) => {
    const recipe = recipes.find(recipe => recipe.id === id);
    if (recipe) {
      alert(`Viewing recipe: ${recipe.title}`);
      // Implement view logic (e.g., open a modal or redirect)
    }
  };

  const handleAddRecipe = () => {
    setIsAdding(true);
  };

  const handleSaveRecipe = () => {
    if (newRecipe.title && newRecipe.imgSrc) {
      setRecipes([...recipes, {
        id: recipes.length + 1,
        title: newRecipe.title,
        imgSrc: newRecipe.imgSrc
      }]);
      setNewRecipe({ title: '', imgSrc: '' });
      setIsAdding(false);
    } else {
      alert('Please provide both title and image URL.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prevRecipe => ({ ...prevRecipe, [name]: value }));
  };

  return (
    <div className="menu">
      <h3>Super Delicious</h3>
      <div className="cardsContainer">
        {recipes.map(recipe => (
          <div key={recipe.id} className="card">
            <img src={recipe.imgSrc} alt={recipe.title} />
            <h5>{recipe.title}</h5>
            <button onClick={() => handleEdit(recipe.id)}>Edit</button>
            <button onClick={() => handleRemove(recipe.id)}>Remove</button>
            <button onClick={() => handleView(recipe.id)}>View</button>
          </div>
        ))}
      </div>
      {isAdding ? (
        <div className="add-recipe-form">
          <h4>Add New Recipe</h4>
          <input
            type="text"
            name="title"
            placeholder="Recipe Title"
            value={newRecipe.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="imgSrc"
            placeholder="Image URL"
            value={newRecipe.imgSrc}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveRecipe}>Save Recipe</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      ) : (
        <button className="add-recipe" onClick={handleAddRecipe}>Add Recipe</button>
      )}
    </div>
  );
};