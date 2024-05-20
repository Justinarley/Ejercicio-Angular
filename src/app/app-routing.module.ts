import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { FormularioComponent } from './formulario/formulario.component';
import { HomeComponent } from './home/home.component';
import { ContacComponent } from './contac/contac.component';
import { ErrorComponent } from './error/error.component';
// import { ProductListComponent } from './product-list/product-list.component';
import { PostsComponent } from './posts/posts.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contacto', component: ContacComponent },
  // { path: 'formulario', component: FormularioComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'about', component: AboutComponent },
  // { path: 'product-list', component:ProductListComponent},
  { path: '**', component: ErrorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
