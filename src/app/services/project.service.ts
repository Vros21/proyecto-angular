import { Injectable } from '@angular/core'; // IMPORTAMOS EL INYECTABLE, QUE ES TODO LO QUE NECESITAMOS PARA HACER PETICIONES E INTERCAMBIOS CON SERVICIOS
import {HttpClient, HttpHeaders} from '@angular/common/http'; //ESTA LIBRERIA NOS PERMITE HACER TODAS LAS CONEXIONES AJAX.
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
    export class ProjectService {
        public url: String; //GUARDAMOS LA URL DE LA API

        constructor(
            private _http: HttpClient
        ) {
            this.url = Global.url; //GUARDAMOS LA URL DE LA API
        }

        testService(){
            return "Probando el servicio API.";
        }

        saveProject(project: Project): Observable<any>{ //Le vamos a pasar por parametro el "proyecto", de tipo proyecto como el modelo
            let params = JSON.stringify(project); //Recogerá unos parámetros del "proyecto" que habrá que pasarlo a JSON para poder incluirlos en la BBDD
            let headers = new HttpHeaders().set('Content-Type', 'application/json');
            //ESTABLECEMOS COMO SE VA A MANDAR LA INFORMACIÓN CON LOS HEADERS.

            return this._http.post(this.url+'save-project', params, {headers: headers});
            //HACE EL POST, YA QUE ES LA UNICA MANERA DE INYECTAR DATOS EN LA BBDD, DE LA URL DEL SERVIDOR.
            //JUNTO AL LOCALHOST SUMAMOS EL METODO POST 'SAVE-PROJECT' QUE YA HABIAMOS CREADO ANTES EN NUESTRO API EN LA CARPETA DE BACKEND.
            //JUNTO A LOS PARAMETROS Y LOS HEADERS.
        }

        getProjects(): Observable<any> {
            let headers = new HttpHeaders().set('Content-Type', 'application/json');
            //variable headers con las cabeceras, es decir, la especifiación de como tiene que ser la transmisión de datos.
            return this._http.get(this.url+'projects', {headers:headers});
            //Coge del cliente dos parametros, el priemro la url junto a 'projects', que es la ruta donde coge los projects. El segundo parametro son los headers, que le hemos indicado antes con la variable headers como tiene que ser, tipo content y json
        }

        getProject(id: any): Observable<any> {
            let headers = new HttpHeaders().set('Content-Type', 'application/json');
            return this._http.get(this.url+'project/'+id, {headers:headers});
        }

        deleteProject(id: any): Observable<any> {
            let headers = new HttpHeaders().set('Content-Type', 'application/json');
            return this._http.delete(this.url+'project/'+id, {headers:headers});
        }

        updateProject(project: any): Observable<any> {
            let params = JSON.stringify(project);
            let headers = new HttpHeaders().set('Content-Type', 'application/json');
            return this._http.put(this.url+'project/'+project._id, params, {headers:headers});
        }
    }