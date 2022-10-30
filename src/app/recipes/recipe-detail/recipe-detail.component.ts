import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { AddIngredients } from '../../shopping-list/store/shopping-list.actions';
import { DeleteRecipe } from '../store/recipes.actions';
import { FeatureState, State } from '../store/recipes.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  id!: number;
  recipeState: Observable<State>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<FeatureState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeState = this.store.select('recipes');
    });
  }

  onAddToShoppingList() {
    this.store
      .select('recipes')
      .pipe(take(1))
      .subscribe((recipeState: State) => {
        this.store.dispatch(
          new AddIngredients(recipeState.recipes[this.id].ingredients)
        );
      });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
