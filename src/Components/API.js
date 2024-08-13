const API_URL = 'http://localhost:3004';

// Handle fetch errors and return data
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }
  return response.json();
};

export const fetchRecipes = async () => {
  try {
    const response = await fetch(API_URL);
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    // Optionally, handle the error as needed (e.g., show a notification to the user)
    return [];
  }
};

export const addRecipe = async (recipe) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to add recipe:', error);
    // Optionally, handle the error as needed (e.g., show a notification to the user)
    return null;
  }
};

export const updateRecipe = async (id, updatedRecipe) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRecipe),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Failed to update recipe:', error);
    // Optionally, handle the error as needed (e.g., show a notification to the user)
    return null;
  }
};

export const deleteRecipe = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error('Failed to delete recipe:', error);
    // Optionally, handle the error as needed (e.g., show a notification to the user)
  }
};
