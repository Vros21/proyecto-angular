import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule} from '@angular/router';


import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from "./components/detail/detail.component";
import { EditComponent } from "./components/edit/edit.component";

const appRoutes : Routes = [
    {path: '', component: AboutComponent},
    {path: 'sobre-mi', component: AboutComponent},
    {path: 'proyectos', component: ProjectsComponent},
    {path: 'crear-proyecto', component: CreateComponent},
    {path: 'contacto', component: ContactComponent},
    {path: 'proyecto/:id', component: DetailComponent},
    {path: 'editar-proyecto/:id', component: EditComponent},
    {path: '**', component: ErrorComponent},
];

export const appRoutingProviders: any[] = []; //Exportamos el servicio de rutas
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes); //Carga nuestra configuración de rutas otro componente de angular.
//Se llama routing, es de tipo ModuleWithProviders y para ello usa el modulo RouterModule, con el metodo forRoot para linkear appRoutes, de manera que todos tienen acceso a estas rutas.