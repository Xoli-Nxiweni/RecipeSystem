const API_URL = 'http://localhost:3004/recipes';

// Handle fetch errors and return data
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Error: ${response.status} - ${errorText}`);
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Default headers for JSON requests
const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Fetch all recipes
export const fetchRecipes = async () => {
  try {
    const response = await fetch(API_URL);
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    return [];
  }
};

// Add a new recipe
export const addRecipe = async (recipe) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(recipe),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to add recipe:', error);
    return null;
  }
};

// Update an existing recipe
export const updateRecipe = async (id, updatedRecipe) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: defaultHeaders,
      body: JSON.stringify(updatedRecipe),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to update recipe:', error);
    return null;
  }
};

// Delete a recipe by ID
export const deleteRecipe = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    await handleResponse(response);
  } catch (error) {
    console.error('Failed to delete recipe:', error);
  }
};
