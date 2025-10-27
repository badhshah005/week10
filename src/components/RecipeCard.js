import Link from 'next/link';
import React from 'react';

async function RecipeCard() {
  let recipes = [];
  try {
    const response = await fetch('https://dummyjson.com/recipes');
    const data = await response.json();
    recipes = data.recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }

  if (!recipes.length) {
    return <p className="text-center text-gray-500">No recipes found.</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-6 p-4">
      {recipes.map((recipe) => (
        <Link
          key={recipe.id}
          href={`/recipes/${recipe.id}`}
          className="flex flex-col items-center rounded-lg border border-gray-200"
        >
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-48 h-48 rounded-full mt-4"
          />
          <div className="p-4">
            <h3 className="text-lg text-center font-semibold">{recipe.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RecipeCard;