import { Routes } from '@angular/router';
//Dashboar components
// { **
import { DashboardComponent } from './dashboard/dashboard.component';

//client components
import { ClientComponent } from './dashboard/client/client.component';
import { AjoutComponent } from './dashboard/client/ajout/ajout.component';
import { UpdateComponent } from './dashboard/client/update/update.component';
import { ListComponent } from './dashboard/client/list/list.component';

//employee components
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { AjoutemployeeComponent } from './dashboard/employee/ajoutemployee/ajoutemployee.component';
import { UpdateemployeeComponent } from './dashboard/employee/updateemployee/updateemployee.component';
import { ListemployeeComponent } from './dashboard/employee/listemployee/listemployee.component';

//project components
import { ProjectComponent } from './dashboard/project/project.component';
import { AjoutprojectComponent } from './dashboard/project/ajoutproject/ajoutproject.component';
import { UpdateprojectComponent } from './dashboard/project/updateproject/updateproject.component';
import { PreviewprojectComponent } from './dashboard/project/previewproject/previewproject.component';
import { ListprojectComponent } from './dashboard/project/listproject/listproject.component';

//statistics component
import { StatisticsComponent } from './dashboard/statistics/statistics.component';

// ** }
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';

import { authguardGuard } from './core/guard/authguard.guard';
import { loginGuard } from './core/guard/login.guard';
export const routes: Routes = [
  {
    path: 'home',canActivate:[authguardGuard] ,
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'statistics', pathMatch: 'full' },
      { path: 'statistics',component: StatisticsComponent },

      {
        path: 'client',canActivate: [ authguardGuard ] ,
        component: ClientComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'ajout', component: AjoutComponent },
          { path: 'update/:id', component: UpdateComponent },
          { path: 'list', component: ListComponent },
        ],
      },
      {
        path: 'employee',canActivate: [ authguardGuard ] ,
        component: EmployeeComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'ajout', component: AjoutemployeeComponent },
          { path: 'update/:id', component: UpdateemployeeComponent },
          { path: 'list', component: ListemployeeComponent },
        ],
      },
      {
        path: 'project',canActivate: [ authguardGuard ] ,
        component: ProjectComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'ajout', component: AjoutprojectComponent },
          { path: 'update/:id', component: UpdateprojectComponent },
          { path: 'list', component: ListprojectComponent },
          { path: 'preview/:id', component: PreviewprojectComponent },
        ],
      },
    ],
  },
  { path: 'login', canActivate:[loginGuard], component: LoginComponent },
  { path: 'notfound', component: NotfoundComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/notfound' },
];
