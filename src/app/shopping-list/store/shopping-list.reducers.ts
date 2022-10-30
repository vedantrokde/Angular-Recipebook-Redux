import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../model/ingredient';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Bananas', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state = initState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
      break;

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
      break;

    case ShoppingListActions.UPDATE_INGREDIENT:
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = {
        ...state.ingredients[state.editedIngredientIndex],
        ...action.payload,
      };

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
      break;

    case ShoppingListActions.DELETE_INGREDIENT:
      const splicedIngredients = [...state.ingredients];
      splicedIngredients.splice(state.editedIngredientIndex, 1);

      return {
        ...state,
        ingredients: splicedIngredients,
        editedIngredientIndex: -1,
      };
      break;

    case ShoppingListActions.START_EDIT:
      const editedIngredient = state.ingredients[action.payload];
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload,
      };
      break;

    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
      break;

    default:
      return state;
  }
}
