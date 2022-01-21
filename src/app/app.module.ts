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
import {ExercisesService} from "./commons/services/exercises.service";
import {RecipesComponent} from './dashboard/recipes/recipes.component';
import {RecipesService} from "./commons/services/recipes.service";
import {MatTableModule} from "@angular/material/table";
import {LocalStorageService} from "./navigation/services/local-storage.service";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UserDetailsService} from "./commons/services/user-details.service";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {UsersAdminComponent} from './admin-dashboard/users-admin/users-admin.component';
import {RecipesAdminComponent} from './admin-dashboard/recipes-admin/recipes-admin.component';
import {ExercisesAdminComponent} from './admin-dashboard/exercises-admin/exercises-admin.component';
import {UsersAdminService} from "./commons/services/users-admin.service";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AuthService} from "./commons/services/auth.service";
import {AuthGuardService} from "./commons/guards/auth-guard.service";
import { SupplementsComponent } from './dashboard/supplements/supplements.component';
import {SupplementsService} from "./commons/services/suplements.service";
import { NotificationsComponent } from './dashboard/notifications/notifications.component';
import {MatBadgeModule} from "@angular/material/badge";
import {NotificationService} from "./commons/services/notification.service";
import {MatSortModule} from "@angular/material/sort";
import { SupplementsAdminComponent } from './admin-dashboard/supplements-admin/supplements-admin.component';
import { NotificationsAdminComponent } from './admin-dashboard/notifications-admin/notifications-admin.component';

// @ts-ignore
// @ts-ignore
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
    AdminDashboardComponent,
    UsersAdminComponent,
    RecipesAdminComponent,
    ExercisesAdminComponent,
    SupplementsComponent,
    NotificationsComponent,
    SupplementsAdminComponent,
    NotificationsAdminComponent
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
    MatPaginatorModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatSortModule
  ],
  providers: [RegistrationService, LoginService, ExercisesService, RecipesService, UserDetailsService, UsersAdminService, SupplementsService, NotificationService, LocalStorageService, AppRoutingModule, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
// @ts-ignore
export class AppModule {}
