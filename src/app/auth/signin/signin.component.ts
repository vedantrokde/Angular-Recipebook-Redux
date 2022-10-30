import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { TrySignin } from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(private store: Store<AppState>) {}

  onSignin(form: NgForm) {
    this.store.dispatch(
      new TrySignin({
        username: form.value.email,
        password: form.value.password,
      })
    );
  }
}
