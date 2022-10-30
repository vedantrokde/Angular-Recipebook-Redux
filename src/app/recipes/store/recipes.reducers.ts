import { Ingredient } from "src/app/model/ingredient";
import { Recipe } from "src/app/model/recipe";
import { AppState } from "src/app/store/app.reducers";
import * as RecipeActions from "./recipes.actions";

export interface FeatureState extends AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[],
}

const initState: State = {
recipes: [
    new Recipe(
      'A Test Recipe',
      'This is a simple test recipe.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSkn06xHEPZo3L-0CUCw1Rsmi560Dg73Swg&usqp=CAU',
      [
        new Ingredient('Meat', 2),
        new Ingredient('French Fries', 30),
        new Ingredient('Buns', 2),
      ]
    ),
    new Recipe(
      'A Dummy Recipe',
      'This is a dummy test recipe.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXuJojVxFMGgitqOS_64kZDu7RHXpaeFurVA&usqp=CAU',
      [new Ingredient('Meat', 2), new Ingredient('Bread', 10)]
    ),
  ]
}

export function recipeReducer(state = initState, action:RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
            break;
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
            break;
        case RecipeActions.UPDATE_RECIPE:
            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = {
                ...state.recipes[action.payload.index],
                ...action.payload.recipe
            };
            return {
                ...state,
                recipes: updatedRecipes
            };
            break;
        case RecipeActions.DELETE_RECIPE:
            const splicedRecipes = [...state.recipes];
            splicedRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: splicedRecipes
            };
            break;
    
        default:
            return state;
    }
}