import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewtaskComponent} from './task/viewtask/viewtask.component';
import {AddtaskComponent} from './task/addtask/addtask.component';
import {UserComponent} from './user/user.component';
import {ProjectComponent} from './project/project.component';

const routes: Routes = [
  {path: 'viewtask', component: ViewtaskComponent},
  {path: 'addtask', component: AddtaskComponent},
  {path: 'user', component: UserComponent},
  {path: 'project', component: ProjectComponent},
  {path: 'updatetask/:id', component: AddtaskComponent},
  {path: '', redirectTo: 'viewtask', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
