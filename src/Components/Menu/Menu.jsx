import { useState, useEffect } from 'react';
import { fetchRecipes, deleteRecipe, addRecipe, updateRecipe } from './../API'; 
import RecipeForm from '../RecipeForm';
import SearchIcon from '@mui/icons-material/Search';
import { Modal, Box, Typography, Button } from '@mui/material';
import './Menu.css';

// eslint-disable-next-line react/prop-types
export const Menu = ({ isSignedIn, selectedCategory }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [viewingRecipe, setViewingRecipe] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipes();
        // Ensure there are no duplicate IDs
        const uniqueRecipes = Array.from(new Set(fetchedRecipes.map(recipe => recipe.id)))
          .map(id => fetchedRecipes.find(recipe => recipe.id === id));
        setRecipes(uniqueRecipes);
        setFilteredRecipes(uniqueRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    loadRecipes();
  }, []);

  useEffect(() => {
    let filtered = recipes;

    if (selectedCategory && selectedCategory !== 'everything') {
      filtered = filtered.filter(recipe =>
        // eslint-disable-next-line react/prop-types
        recipe.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRecipes(filtered);
  }, [selectedCategory, searchTerm, recipes]);

  const handleEdit = (recipe) => {
    setOpenEditModal(true);
    setRecipeToEdit(recipe);
  };

  const handleRemove = async (id) => {
    try {
      await deleteRecipe(id);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
      setFilteredRecipes(filteredRecipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
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
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleSave = async (updatedRecipe) => {
    try {
      await updateRecipe(recipeToEdit.id, updatedRecipe);
      const fetchedRecipes = await fetchRecipes();
      // Ensure there are no duplicate IDs
      const uniqueRecipes = Array.from(new Set(fetchedRecipes.map(recipe => recipe.id)))
        .map(id => fetchedRecipes.find(recipe => recipe.id === id));
      setRecipes(uniqueRecipes);
      setFilteredRecipes(uniqueRecipes);
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
    handleCloseEditModal();
  };

  const handleAdd = async (newRecipe) => {
    try {
      await addRecipe(newRecipe);
      const fetchedRecipes = await fetchRecipes();
      // Ensure there are no duplicate IDs
      const uniqueRecipes = Array.from(new Set(fetchedRecipes.map(recipe => recipe.id)))
        .map(id => fetchedRecipes.find(recipe => recipe.id === id));
      setRecipes(uniqueRecipes);
      setFilteredRecipes(uniqueRecipes);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
    handleCloseAddModal();
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
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <div key={recipe.id} className="card">
              <img src={recipe.imgSrc} alt={recipe.title} />
              <h5>{recipe.title}</h5>
              <p>{recipe.description}</p>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Category:</strong> {recipe.category}</p>
              <div className="cardsBtn">
                {isSignedIn && (
                  <>
                    <button onClick={() => handleEdit(recipe)}>Edit</button>
                    <button onClick={() => handleRemove(recipe.id)}>Remove</button>
                  </>
                )}
                <button onClick={() => handleView(recipe)}>Recipe</button>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>

      {isSignedIn && (
        <button className="add-recipe" onClick={() => setOpenAddModal(true)}>
          Add Recipe
        </button>
      )}

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
              <Typography id="view-recipe-title" variant="image" component="div">
                <img 
                  src={viewingRecipe.imgSrc} 
                  style={{
                    width: '170px', 
                    margin: '0 auto',
                    height: '120px',
                    objectFit: 'cover'
                  }} 
                  alt={viewingRecipe.title}
                />
              </Typography>
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
              <Typography sx={{ mt: 2 }}>
                <strong>Category:</strong> {viewingRecipe.category}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Prep Time:</strong> {viewingRecipe.preparationTime} mins
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Cook Time:</strong> {viewingRecipe.cookingTime} mins
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Servings:</strong> {viewingRecipe.servings}
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
        sx={{ backdropFilter: 'blur(10px)', height: '100vh' }}
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
            textAlign: 'left',
            transform: 'translate(-50%, -50%)',
            width: 450,
            height: 'auto',
            bgcolor: '#fff',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
          }}
        >
          <RecipeForm
            recipeToEdit={recipeToEdit}
            onAdd={handleAdd}
            onSave={handleSave}
            isAdding={false} // Indicates editing mode
          />
        </Box>
      </Modal>

      {/* Modal for Adding Recipe */}
      <Modal
        sx={{ backdropFilter: 'blur(10px)', height: '100vh' }}
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="add-recipe-title"
        aria-describedby="add-recipe-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            textAlign: 'left',
            transform: 'translate(-50%, -50%)',
            width: 450,
            height: 'auto',
            bgcolor: '#fff',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
          }}
        >
          <RecipeForm
            onSave={handleAdd}
            isAdding={true} // Indicates adding mode
          />
        </Box>
      </Modal>
    </div>
  );
};
