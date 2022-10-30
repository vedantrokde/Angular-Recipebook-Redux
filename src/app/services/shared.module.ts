import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
    imports: [],
    exports: [
        CommonModule,
        DropdownDirective
    ],
    declarations: [
        DropdownDirective
    ],
    providers: [],
})
export class SharedModule { }
