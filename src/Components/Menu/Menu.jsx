import { useState, useEffect } from 'react';
import { fetchRecipes, deleteRecipe } from './../API';
import RecipeForm from '../RecipeForm';
import './Menu.css';

export const Menu = () => {
  const [recipes, setRecipes] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipes();
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    loadRecipes();
  }, []);

  const handleEdit = (recipe) => {
    setRecipeToEdit(recipe);
    setIsAdding(true);
  };

  const handleRemove = async (id) => {
    if (window.confirm('Are you sure you want to remove this recipe?')) {
      try {
        await deleteRecipe(id);
        setRecipes(recipes.filter(recipe => recipe.id !== id));
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  const handleView = (recipe) => {
    alert(`Viewing recipe: ${recipe.title}`);
    // Implement view logic (e.g., open a modal or redirect)
  };

  const handleSave = async () => {
    try {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
    setIsAdding(false);
    setRecipeToEdit(null);
  };

  return (
    <div className="menu">
      <h3>Super Delicious</h3>
      <div className="cardsContainer">
        {recipes.map(recipe => (
          <div key={recipe.id} className="card">
            <img src={recipe.imgSrc} alt={recipe.title} />
            <h5>{recipe.title}</h5>
            <button onClick={() => handleEdit(recipe)}>Edit</button>
            <button onClick={() => handleRemove(recipe.id)}>Remove</button>
            <button onClick={() => handleView(recipe)}>View</button>
          </div>
        ))}
      </div>
      {isAdding ? (
        <div className="add-recipe-form">
          <RecipeForm recipeToEdit={recipeToEdit} onSave={handleSave} />
          <button onClick={() => { setIsAdding(false); setRecipeToEdit(null); }}>Cancel</button>
        </div>
      ) : (
        <button className="add-recipe" onClick={() => setIsAdding(true)}>Add Recipe</button>
      )}
    </div>
  );
};
