import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ContacComponent } from './contac/contac.component';
import { FormularioModule } from "./formulario/formulario.module";
import { ErrorComponent } from './error/error.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavComponent,
        ContacComponent,
        ErrorComponent,
        ProductListComponent,
        AboutComponent,
        PostsComponent
    ],
    providers: [
        provideClientHydration()
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        InputTextModule,
        CalendarModule,
        InputMaskModule,
        ButtonModule,
        MessageModule,
        MessagesModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormularioModule,
        HttpClientModule 
    ]
})
export class AppModule { }
