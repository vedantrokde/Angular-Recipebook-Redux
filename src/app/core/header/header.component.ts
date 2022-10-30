import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from "../../auth/store/auth.reducers";
import { TryLogout } from 'src/app/auth/store/auth.actions';
import { FeatureState } from 'src/app/recipes/store/recipes.reducers';
import { FetchRecipes, StoreRecipes } from 'src/app/recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authState: Observable<State>;
  constructor(
    private store: Store<FeatureState>
  ) {}

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.store.dispatch(new StoreRecipes());
    alert("Data has been saved successfully!");
  }

  onFetchData() {
    this.store.dispatch(new FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new TryLogout());
    alert("You have been logged out successfully!");
  }
}
