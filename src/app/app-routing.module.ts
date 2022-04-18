import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
const routes: Routes = [
  { path: '',   redirectTo: 'list', pathMatch: 'full' },
  {path:'list', component:ContactListComponent,},
  {path:'add', component:ContactFormComponent ,},
  {path:'edit/:id', component:ContactFormComponent ,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
