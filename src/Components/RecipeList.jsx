import { useEffect, useState } from 'react';
import { fetchRecipes, deleteRecipe } from './API';

// eslint-disable-next-line react/prop-types
const RecipeList = ({ searchTerm = '', setEditingRecipe, isSignedIn }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (err) {
        setError('Failed to fetch recipes.');
      }
    };
    getRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (!isSignedIn) return; // Prevent delete if not signed in
    try {
      await deleteRecipe(id);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (err) {
      setError('Failed to delete recipe.');
    }
  };

  const handleEdit = (recipe) => {
    if (!isSignedIn) return; // Prevent edit if not signed in
    setEditingRecipe(recipe);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="recipe-list">
      {error && <p className="error-message">{error}</p>}
      {filteredRecipes.map(recipe => (
        <div key={recipe.id} className="recipe-item">
          <h2>{recipe.name}</h2>
          <p>{recipe.category}</p>
          {isSignedIn && (
            <>
              <button onClick={() => handleEdit(recipe)}>Edit</button>
              <button onClick={() => handleDelete(recipe.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
