import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // PARA PODER UTILIZAR LOS SERVICIOS HTTP
import { FormsModule } from '@angular/forms'; //PARA HACER EL TWO WAY DATA BINDING
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing'; //LO IMPORTAMOS, Y EN EL NGMODULE METEMOS EL RUTING EN IMPORTS Y EL APPROUTINGPROVIDERS EN PROVIDERS

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';

import * as $ from 'jquery';
import { SliderComponent } from './components/slider/slider.component';
import { ResaltadoDirective } from './resaltado.directive';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ProjectsComponent,
    CreateComponent,
    ContactComponent,
    ErrorComponent,
    SliderComponent,
    ResaltadoDirective,
    DetailComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing, //ESTO SE CARGA EN IMPORTS PORQUE ES UN MODULO,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    appRoutingProviders //ESTO SE CARGA EN PROVIDERS.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
