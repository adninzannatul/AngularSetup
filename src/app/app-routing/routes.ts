import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { dishdetailComponent } from '../Shared/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
{path: 'home', component: HomeComponent},
{path: 'aboutus', component: AboutComponent},
{path: 'menu', component: MenuComponent},
{path: 'dishdetail/:id', component: dishdetailComponent},
{path: 'contactus', component: ContactComponent},
{path: '', redirectTo: '/home', pathMatch: 'full'}
];