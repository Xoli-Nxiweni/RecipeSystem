// const API_URL = 'http://localhost:3004/recipes';

// // Handle fetch errors and return data
// const handleResponse = async (response) => {
//   if (!response.ok) {
//     const errorText = await response.text();
//     console.error(`Error: ${response.status} - ${errorText}`);
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return response.json();
// };

// // Default headers for JSON requests
// const defaultHeaders = {
//   'Content-Type': 'application/json',
// };

// // Fetch all recipes
// export const fetchRecipes = async () => {
//   try {
//     const response = await fetch(API_URL);
//     return await handleResponse(response);
//   } catch (error) {
//     console.error('Failed to fetch recipes:', error);
//     return [];
//   }
// };

// // Add a new recipe
// export const addRecipe = async (recipe) => {
//   try {
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       headers: defaultHeaders,
//       body: JSON.stringify(recipe),
//     });
//     return await handleResponse(response);
//   } catch (error) {
//     console.error('Failed to add recipe:', error);
//     return null;
//   }
// };

// // Update an existing recipe
// export const updateRecipe = async (id, updatedRecipe) => {
//   try {
//     const response = await fetch(`${API_URL}/${id}`, {
//       method: 'PATCH',
//       headers: defaultHeaders,
//       body: JSON.stringify(updatedRecipe),
//     });
//     return await handleResponse(response);
//   } catch (error) {
//     console.error('Failed to update recipe:', error);
//     return null;
//   }
// };

// // Delete a recipe by ID
// export const deleteRecipe = async (id) => {
//   try {
//     const response = await fetch(`${API_URL}/${id}`, {
//       method: 'DELETE',
//     });
//     await handleResponse(response);
//   } catch (error) {
//     console.error('Failed to delete recipe:', error);
//   }
// };

// const API_URL = 'http://localhost:3004/recipes';

// export const fetchRecipes = async () => {
//   try {
//     const response = await fetch(API_URL);
//     if (!response.ok) {
//       throw new Error('Failed to fetch recipes');
//     }
//     return response.json();
//   } catch (error) {
//     console.error('Error fetching recipes:', error);
//     throw error;
//   }
// };

// export const addRecipe = async (recipe) => {
//   try {
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(recipe),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to add recipe');
//     }
//     return response.json();
//   } catch (error) {
//     console.error('Error adding recipe:', error);
//     throw error;
//   }
// };

// export const updateRecipe = async (id, updatedRecipe) => {
//   try {
//     const response = await fetch(`${API_URL}/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedRecipe),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to update recipe');
//     }
//     return response.json();
//   } catch (error) {
//     console.error('Error updating recipe:', error);
//     throw error;
//   }
// };

// export const deleteRecipe = async (id) => {
//   try {
//     const response = await fetch(`${API_URL}/${id}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) {
//       throw new Error('Failed to delete recipe');
//     }
//   } catch (error) {
//     console.error('Error deleting recipe:', error);
//     throw error;
//   }
// };

// const API_URL = 'http://localhost:3004/recipes';

// // Fetch all recipes
// export const fetchRecipes = async () => {
//   try {
//     const response = await fetch(API_URL);
//     if (!response.ok) {
//       throw new Error('Failed to fetch recipes');
//     }
//     return response.json();
//   } catch (error) {
//     console.error('Error fetching recipes:', error);
//     throw error;
//   }
// };

// // Add a new recipe
// export const addRecipe = async (recipe) => {
//   try {
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(recipe),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to add recipe');
//     }
//     return response.json();
//   } catch (error) {
//     console.error('Error adding recipe:', error);
//     throw error;
//   }
// };

// // Update an existing recipe
// export const updateRecipe = async (id, updatedRecipe) => {
//   try {
//     const response = await fetch(`${API_URL}/${id}`, {
//       method: 'PUT', // Ensure this matches your backend implementation
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedRecipe),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to update recipe');
//     }
//     return response.json();
//   } catch (error) {
//     console.error('Error updating recipe:', error);
//     throw error;
//   }
// };

// // Delete a recipe by ID
// export const deleteRecipe = async (id) => {
//   try {
//     const response = await fetch(`${API_URL}/${id}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) {
//       throw new Error('Failed to delete recipe');
//     }
//   } catch (error) {
//     console.error('Error deleting recipe:', error);
//     throw error;
//   }
// };

const API_URL = 'http://localhost:3004/recipes';

// Fetch all recipes
export const fetchRecipes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

// Add a new recipe
export const addRecipe = async (recipe) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error('Failed to add recipe');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
};

// Update an existing recipe
export const updateRecipe = async (id, updatedRecipe) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH', // Or 'PUT', based on your backend implementation
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRecipe),
    });
    if (!response.ok) {
      throw new Error('Failed to update recipe');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};

// Delete a recipe by ID
export const deleteRecipe = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete recipe');
    }
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};
