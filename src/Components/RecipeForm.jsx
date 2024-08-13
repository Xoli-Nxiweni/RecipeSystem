import { useState, useEffect } from 'react';
import { addRecipe, updateRecipe } from './API';

// eslint-disable-next-line react/prop-types
const RecipeForm = ({ recipeToEdit, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    imgSrc: ''
  });

  useEffect(() => {
    if (recipeToEdit) {
      setFormData(recipeToEdit);
    } else {
      setFormData({
        title: '',
        description: '',
        ingredients: '',
        imgSrc: ''
      });
    }
  }, [recipeToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recipeToEdit) {
      await updateRecipe(recipeToEdit.id, formData);
    } else {
      await addRecipe(formData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredients" required />
      <input name="imgSrc" value={formData.imgSrc} onChange={handleChange} placeholder="Image URL" required />
      <button type="submit">Save Recipe</button>
    </form>
  );
};

export default RecipeForm;
