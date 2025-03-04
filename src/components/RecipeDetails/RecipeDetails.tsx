import React, { useState, useEffect } from "react";

import {
  CompleteRecipeState,
  IngredientState,
  InstructionsState,
} from "../../types";
import { Rating, Loading } from "../index";
import { useAppDispatch } from "../../hooks";
import { getAllTips } from "../../store/tips/thunks";
import * as loadingNoodles from "../Loading/39520-japanese-noodles.json";

import "./RecipeDetails.css";

interface Props {
  recipe: CompleteRecipeState;
}

const RecipeDetails: React.FC<Props> = ({ recipe }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllTips());
  }, [dispatch]);

  const [style, setStyle] = useState(false);
  const {
    name,
    description,
    image,
    rating,
    difficulty,
    ingredients,
    instructions,
    portions,
    time,
  } = recipe;

  //toggle styles between complete and incomplete steps
  const toggleCompletedStatus = (id: number) => {
    setStyle((prevState) => ({
      //@ts-ignore
      ...style,
      //@ts-ignore
      [id]: !prevState[id],
    }));
  };

  return (
    <div>
      {!recipe ? (
        <Loading animationData={loadingNoodles} />
      ) : (
        <div className="recipeDetailsContainer">
          <div className="recipeDetailsLeftContainer">
            <img className="recipeDetailsImage" src={image} alt={name} />

            <div className="recipeDetailsInfoContainer">
              <p className="recipeDetailsInfo">difficulty: {difficulty}</p>

              <Rating rating={rating} />
              <p className="recipeDetailsInfo">{time}</p>
              <p className="recipeDetailsInfo">portions: {portions}</p>
            </div>

            {!ingredients ? (
              <Loading animationData={loadingNoodles} />
            ) : (
              <div className="recipeDetailsIngredientsContainer">
                <h4>Ingredients</h4>
                {ingredients.map((ingredient: IngredientState) => {
                  return (
                    <div
                      className="recipeDetailsIngredientsList"
                      key={ingredient.id}
                    >
                      <p>
                        <strong>{ingredient.name}:</strong>{" "}
                        {ingredient.quantity} {ingredient.measurement}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {!instructions ? (
            <Loading animationData={loadingNoodles} />
          ) : (
            <div className="recipeDetailsRightContainer">
              <h1 className="recipeDetailsTitle">{name}</h1>
              <p className="recipeDetailsDescription">{description}</p>
              <h4>Instructions</h4>
              {instructions.map((instruction: InstructionsState) => {
                return (
                  <div
                    className="instructionDetails"
                    key={instruction.id}
                    style={{
                      //@ts-ignore
                      color: style[`${instruction.id}`] ? "grey" : "initial",
                      //@ts-ignore
                      border: style[`${instruction.id}`]
                        ? "4px solid grey"
                        : "4px solid black",
                    }}
                    onClick={() => toggleCompletedStatus(instruction.id)}
                  >
                    {`${instruction.step}. ${instruction.description}`}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="checkIcon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
