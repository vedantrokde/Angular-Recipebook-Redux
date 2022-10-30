import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { AuthInterceptor } from '../services/auth.interceptor';
import { SharedModule } from '../services/shared.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [SharedModule, AppRoutingModule],
  exports: [AppRoutingModule, HeaderComponent],
  declarations: [HeaderComponent, HomeComponent, PageNotFoundComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
})
export class CoreModule {}
