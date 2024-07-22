import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./register/register.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./header/header.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { EditComponent } from "./edit/edit.component";
import { HomeComponent } from "./home/home.component";
import { NgToastComponent, NgToastModule } from "ng-angular-popup";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    AddProductComponent,
    EditComponent,
    HomeComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [provideRouter(routes)],

bootstrap: [AppComponent]
})
export class AppModule {
}

