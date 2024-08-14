import { useEffect, useState } from 'react';
import { fetchRecipes, deleteRecipe } from './API';
// import PropTypes from 'prop-types'; // Uncomment if you want to use PropTypes

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
        setError('Failed to fetch recipes.', err);
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
      setError('Failed to delete recipe.', err);
    }
  };

  const handleEdit = (recipe) => {
    if (!isSignedIn) return; // Prevent edit if not signed in
    setEditingRecipe(recipe);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // if (filteredRecipes.length === 0) {
  //   return <p>No recipes found.</p>;
  // }

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

// Uncomment if you want to enforce prop types
// RecipeList.propTypes = {
//   searchTerm: PropTypes.string,
//   setEditingRecipe: PropTypes.func.isRequired,
//   isSignedIn: PropTypes.bool.isRequired,
// };

export default RecipeList;
