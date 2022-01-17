import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./navigation/homepage/homepage.component";
import {LoginComponent} from "./navigation/login/login.component";
import {RegisterComponent} from "./navigation/register/register.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {WallComponent} from "./dashboard/wall/wall.component";
import {ExercisesComponent} from "./dashboard/exercises/exercises.component";
import {RecipesComponent} from "./dashboard/recipes/recipes.component";

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {path: 'home', component: HomepageComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path: 'wall', component: WallComponent},
      {path: 'exercises', component: ExercisesComponent},
      {path: 'recipes', component: RecipesComponent},
      {path: 'logout', component: LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
