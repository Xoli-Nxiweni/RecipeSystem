import { useState, useEffect } from 'react';
import './RecipeForm.css';

// eslint-disable-next-line react/prop-types
const RecipeForm = ({ onSave, isAdding, recipeToEdit }) => {
  // eslint-disable-next-line react/prop-types
  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : '');
  // eslint-disable-next-line react/prop-types
  const [description, setDescription] = useState(recipeToEdit ? recipeToEdit.description : '');
  // eslint-disable-next-line react/prop-types
  const [ingredients, setIngredients] = useState(recipeToEdit ? recipeToEdit.ingredients : '');
  // eslint-disable-next-line react/prop-types
  const [instructions, setInstructions] = useState(recipeToEdit ? recipeToEdit.instructions : '');
  // eslint-disable-next-line react/prop-types
  const [category, setCategory] = useState(recipeToEdit ? recipeToEdit.category : '');
  // eslint-disable-next-line react/prop-types
  const [preparationTime, setPreparationTime] = useState(recipeToEdit ? recipeToEdit.preparationTime : '');
  // eslint-disable-next-line react/prop-types
  const [cookingTime, setCookingTime] = useState(recipeToEdit ? recipeToEdit.cookingTime : '');
  // eslint-disable-next-line react/prop-types
  const [servings, setServings] = useState(recipeToEdit ? recipeToEdit.servings : '');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (recipeToEdit) {
      // eslint-disable-next-line react/prop-types
      setTitle(recipeToEdit.title);
      // eslint-disable-next-line react/prop-types
      setDescription(recipeToEdit.description);
      // eslint-disable-next-line react/prop-types
      setIngredients(recipeToEdit.ingredients);
      // eslint-disable-next-line react/prop-types
      setInstructions(recipeToEdit.instructions);
      // eslint-disable-next-line react/prop-types
      setCategory(recipeToEdit.category);
      // eslint-disable-next-line react/prop-types
      setPreparationTime(recipeToEdit.preparationTime);
      // eslint-disable-next-line react/prop-types
      setCookingTime(recipeToEdit.cookingTime);
      // eslint-disable-next-line react/prop-types
      setServings(recipeToEdit.servings);
      // eslint-disable-next-line react/prop-types
      setImage(recipeToEdit.imgSrc);
    }
  }, [recipeToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !ingredients || !instructions || !category) {
      alert('Please fill in all required fields.');
      return;
    }

    const newRecipe = {
      title,
      description,
      ingredients,
      instructions,
      category,
      preparationTime,
      cookingTime,
      servings,
      imgSrc: image,
    };

    onSave(newRecipe);
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients"
      />
      <textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <input
        type="number"
        value={preparationTime}
        onChange={(e) => setPreparationTime(e.target.value)}
        placeholder="Preparation Time (mins)"
      />
      <input
        type="number"
        value={cookingTime}
        onChange={(e) => setCookingTime(e.target.value)}
        placeholder="Cooking Time (mins)"
      />
      <input
        type="number"
        value={servings}
        onChange={(e) => setServings(e.target.value)}
        placeholder="Servings"
      />
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      {image && <img src={image} alt="Recipe" style={{ width: '100px', height: '100px' }} />}
      <button type="submit">
        {isAdding ? 'Add Recipe' : 'Save Changes'}
      </button>
    </form>
  );
};

export default RecipeForm;
