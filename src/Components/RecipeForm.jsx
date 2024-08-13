import { useState, useEffect } from 'react';
import { addRecipe, updateRecipe } from './API'

// eslint-disable-next-line react/prop-types
const RecipeForm = ({ recipeToEdit, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    category: '',
    prepTime: '',
    cookTime: '',
    servings: ''
  });

  useEffect(() => {
    if (recipeToEdit) {
      setFormData(recipeToEdit);
    }
  }, [recipeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recipeToEdit) {
      // eslint-disable-next-line react/prop-types
      await updateRecipe(recipeToEdit.id, formData);
    } else {
      await addRecipe(formData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Recipe Name" required />
      <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredients" required />
      <textarea name="instructions" value={formData.instructions} onChange={handleChange} placeholder="Instructions" required />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      <input name="prepTime" value={formData.prepTime} onChange={handleChange} placeholder="Preparation Time" required />
      <input name="cookTime" value={formData.cookTime} onChange={handleChange} placeholder="Cooking Time" required />
      <input name="servings" value={formData.servings} onChange={handleChange} placeholder="Servings" required />
      <button type="submit">Save Recipe</button>
    </form>
  );
};

export default RecipeForm;
