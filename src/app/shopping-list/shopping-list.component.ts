import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../model/ingredient';
import { StartEdit } from './store/shopping-list.actions';
import { AppState } from "../store/app.reducers";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  shoppingListState!: Observable<{ingredients: Ingredient[]}>;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new StartEdit(index));
  }
}
