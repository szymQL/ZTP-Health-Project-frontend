import {NgModule} from '@angular/core';
import {RouterModule, Routes, CanActivate} from '@angular/router';
import {HomepageComponent} from "./navigation/homepage/homepage.component";
import {LoginComponent} from "./navigation/login/login.component";
import {RegisterComponent} from "./navigation/register/register.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {WallComponent} from "./dashboard/wall/wall.component";
import {ExercisesComponent} from "./dashboard/exercises/exercises.component";
import {RecipesComponent} from "./dashboard/recipes/recipes.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {ExercisesAdminComponent} from "./admin-dashboard/exercises-admin/exercises-admin.component";
import {RecipesAdminComponent} from "./admin-dashboard/recipes-admin/recipes-admin.component";
import {UsersAdminComponent} from "./admin-dashboard/users-admin/users-admin.component";
import {AuthGuardService} from "./commons/guards/auth-guard.service";
import {SupplementsComponent} from "./dashboard/supplements/supplements.component";
import {NotificationsComponent} from "./dashboard/notifications/notifications.component";
import {SupplementsAdminComponent} from "./admin-dashboard/supplements-admin/supplements-admin.component";
import {NotificationsAdminComponent} from "./admin-dashboard/notifications-admin/notifications-admin.component";

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: HomepageComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'wall'},
      {path: 'wall', component: WallComponent},
      {path: 'exercises', component: ExercisesComponent},
      {path: 'recipes', component: RecipesComponent},
      {path: 'supplements', component: SupplementsComponent},
      {path: 'notifications', component: NotificationsComponent}

    ],
    canActivate: [AuthGuardService],
    data: {
      expectedRole: 'USER'
    }
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      {path: 'users', component: UsersAdminComponent},
      {path: 'exercises', component: ExercisesAdminComponent},
      {path: 'recipes', component: RecipesAdminComponent},
      {path: 'supplements', component: SupplementsAdminComponent},
      {path: 'notifications', component: NotificationsAdminComponent}
    ],
    canActivate: [AuthGuardService],
    data: {
      expectedRole: 'ADMIN'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
