import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { TrySignup } from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent{
  constructor(private store: Store<AppState>) {}

  onSignup(form: NgForm) {
    this.store.dispatch(
      new TrySignup({
        username: form.value.email,
        password: form.value.password,
      })
    );
  }
}
