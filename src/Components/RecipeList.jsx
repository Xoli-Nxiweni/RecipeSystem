import { useEffect, useState } from 'react';
import { fetchRecipes, deleteRecipe } from './API';

// eslint-disable-next-line react/prop-types
const RecipeList = ({ searchTerm, setEditingRecipe }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };
    getRecipes();
  }, []);

  const handleDelete = async (id) => {
    await deleteRecipe(id);
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
  };

  const filteredRecipes = recipes.filter(recipe =>
    // eslint-disable-next-line react/prop-types
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="recipe-list">
      {filteredRecipes.map(recipe => (
        <div key={recipe.id} className="recipe-item">
          <h2>{recipe.name}</h2>
          <p>{recipe.category}</p>
          <button onClick={() => handleEdit(recipe)}>Edit</button>
          <button onClick={() => handleDelete(recipe.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
