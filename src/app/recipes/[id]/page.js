import Link from 'next/link';
import React from 'react';

async function RecipeDetails({ params }) {
  const { id } = await params;

  // Fetch the recipe data
  const fetchRecipe = async () => {
    const response = await fetch(`https://dummyjson.com/recipes/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }
    return response.json();
  };

  let recipe;
  try {
    recipe = await fetchRecipe();
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return <p className="text-center text-red-500">Recipe not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link
        href="/"
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Go Back
      </Link>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>
      <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
      <ul className="list-disc pl-5 mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
      <ul className="list-disc pl-5 mb-4">
        {recipe.instructions.map((instructions, index) => (
          <li key={index}>{instructions}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeDetails;