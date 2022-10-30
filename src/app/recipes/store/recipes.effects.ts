import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Recipe } from 'src/app/model/recipe';
import * as RecipeActions from './recipes.actions';
import { FeatureState } from './recipes.reducers';

@Injectable()
export class RecipeEffects {
  baseUrl =
    'https://ng-recipe-book-32960-default-rtdb.asia-southeast1.firebasedatabase.app/recipe.json';

  fetch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipeActions.FETCH_RECIPE),
      switchMap(() => {
        return this.httpClient.get<Recipe[]>(this.baseUrl);
      }),
      map((recipes) => {
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes,
        };
      })
    );
  });

  store$ = createEffect(() => {
    return this.actions$.pipe(
			ofType(RecipeActions.STORE_RECIPE),
			withLatestFrom(this.store.select('recipes')),
			switchMap(([action, state]) => {
				return this.httpClient.put(this.baseUrl, state.recipes, { reportProgress: true });
			})
		);
  }, { dispatch: false });

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<FeatureState>) {}
}
