import { useState, useEffect } from 'react';
import { fetchRecipes, deleteRecipe } from './../API';
import RecipeForm from '../RecipeForm';
import SearchIcon from '@mui/icons-material/Search';
import { Modal, Box, Typography, Button } from '@mui/material';
import './Menu.css';

export const Menu = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [viewingRecipe, setViewingRecipe] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipes();
        setRecipes(fetchedRecipes);
        setFilteredRecipes(fetchedRecipes); // Initialize filtered recipes
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    loadRecipes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredRecipes(
        recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchTerm, recipes]);

  const handleEdit = (recipe) => {
    setRecipeToEdit(recipe);
    setIsAdding(true);
    setOpenEditModal(true);
  };

  const handleRemove = async (id) => {
    if (window.confirm('Are you sure you want to remove this recipe?')) {
      try {
        await deleteRecipe(id);
        setRecipes(recipes.filter(recipe => recipe.id !== id));
        setFilteredRecipes(filteredRecipes.filter(recipe => recipe.id !== id));
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  const handleView = (recipe) => {
    setViewingRecipe(recipe);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setViewingRecipe(null);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setRecipeToEdit(null);
    setIsAdding(false);
  };

  const handleSave = async () => {
    try {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
      setFilteredRecipes(fetchedRecipes);
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
    handleCloseEditModal();
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      setSearchTerm('');
    }
  };

  return (
    <div className="menu">
      <h3>Super Delicious</h3>
      <div className="searchContainer">
        {isSearching && (
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchTerm}
            aria-label="Search Recipes"
          />
        )}
        <button onClick={toggleSearch} aria-label="Toggle Search">
          <SearchIcon />
        </button>
      </div>
      <div className="cardsContainer">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="card">
            <img src={recipe.imgSrc} alt={recipe.title} />
            <h5>{recipe.title}</h5>
            <p>{recipe.description}</p>
            <p>{recipe.ingredients}</p>
            <div className="cardsBtn">
              <button onClick={() => handleEdit(recipe)}>Edit</button>
              <button onClick={() => handleRemove(recipe.id)}>Remove</button>
              <button onClick={() => handleView(recipe)}>View</button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-recipe" onClick={() => setIsAdding(true)}>Add Recipe</button>

      {/* Modal for Viewing Recipe */}
      <Modal
        sx={{ backdropFilter: 'blur(10px)' }}
        open={openViewModal}
        onClose={handleCloseViewModal}
        aria-labelledby="view-recipe-title"
        aria-describedby="view-recipe-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#fff',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
          }}
        >
          {viewingRecipe && (
            <>
              <Typography id="view-recipe-title" variant="h6" component="h2">
                {viewingRecipe.title}
              </Typography>
              <Typography id="view-recipe-description" sx={{ mt: 2 }}>
                {viewingRecipe.description}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Ingredients:</strong> {viewingRecipe.ingredients}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Instructions:</strong> {viewingRecipe.instructions}
              </Typography>
              <Button onClick={handleCloseViewModal} sx={{ mt: 2 }}>
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Modal for Editing Recipe */}
      <Modal
        sx={{ backdropFilter: 'blur(10px)' }}
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="edit-recipe-title"
        aria-describedby="edit-recipe-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#fff',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
          }}
        >
          {recipeToEdit && (
            <>
              <Typography id="edit-recipe-title" variant="h6" component="h2">
                Edit Recipe
              </Typography>
              <RecipeForm recipeToEdit={recipeToEdit} onSave={handleSave} />
              <Button onClick={handleCloseEditModal} sx={{ mt: 2 }}>
                Cancel
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};
