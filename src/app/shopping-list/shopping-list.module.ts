import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [],
    declarations: [ShoppingListComponent, ShoppingEditComponent],
    providers: [],
})
export class ShoppingListModule { }
