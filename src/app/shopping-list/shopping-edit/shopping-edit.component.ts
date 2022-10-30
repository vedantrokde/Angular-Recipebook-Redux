import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/model/ingredient';
import {
  AddIngredient,
  DeleteIngredient,
  UpdateIngredient,
  StopEdit,
} from '../store/shopping-list.actions';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  editMode = false;
  editItemIndex!: number;
  editItem!: Ingredient;
  @ViewChild('f') slForm!: NgForm;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe((data) => {
      if (data.editedIngredientIndex > -1) {
        this.editItem = data.editedIngredient;
        this.editMode = true;
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        });
      } else {
        this.editMode;
      }
    });
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);

    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new AddIngredient(newIngredient));
    }

    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopEdit());
    this.subscription.unsubscribe();
  }
}
