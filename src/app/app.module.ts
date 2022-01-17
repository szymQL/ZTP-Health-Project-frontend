import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {HomepageComponent} from './navigation/homepage/homepage.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {LoginComponent} from './navigation/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './navigation/register/register.component';
import {HttpClientModule} from "@angular/common/http";
import {RegistrationService} from "./navigation/services/registration.service";
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginService} from "./navigation/services/login.service";
import {WallComponent} from './dashboard/wall/wall.component';
import {ExercisesComponent} from './dashboard/exercises/exercises.component';
import {TestComponent} from './test/test.component';
import {ExercisesService} from "./dashboard/services/exercises.service";
import {RecipesComponent} from './dashboard/recipes/recipes.component';
import {RecipesService} from "./dashboard/services/recipes.service";
import {MatTableModule} from "@angular/material/table";
import {LocalStorageService} from "./navigation/services/local-storage.service";
import { LogoutComponent } from './dashboard/logout/logout.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    WallComponent,
    ExercisesComponent,
    TestComponent,
    RecipesComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatDatepickerModule,
    MatPaginatorModule
  ],
  providers: [RegistrationService, LoginService, ExercisesService, RecipesService, LocalStorageService, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
