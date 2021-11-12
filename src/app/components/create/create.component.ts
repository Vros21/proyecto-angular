import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project'; //CARGAMOS EL MODELO DEL PROYECTO PARA CREAR UN PROYECTO
import { ProjectService } from '../../services/project.service'; //CARGAMOS LOS SERVICIOS DE NUESTRA APLICACION
import { Uploadservice } from '../../services/upload.service';
import { Router, ActivatedRoute, Params} from '@angular/router'; //Lo necesitamos para coseguir la id que viene del backend
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, Uploadservice] //CARGAMOS LOS SERVICIOS COMO PROVIDERS
})
export class CreateComponent implements OnInit {

  public title: String;
  public project: Project;
  public save_project: any;
  public status: String | undefined;
  public filesToUpload: Array<File> = [];
  public url: String;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: Uploadservice,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.title = "Crear Proyecto",
    this.project = new Project('','','','',2021,'','');
    
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;

      this.getProject(id);
    })
  }

  getProject(id: any){
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit(form: any) { //CUANDO SE HAGA SUBMIT EN EL BOTON DEL FORMULARIO
    this._projectService.saveProject(this.project).subscribe( //HARA UN METODO DE PROJECTSERVICE, EN ESTE CASO EL SAVEPROJECT QUE HEMOS CREADO ANTES
      //EL MÉTODO SUBSCRIBE HARÁ DOS COSAS, O DARNOS UNA RESPUESTA O DARNOS UN ERROR.
      //AMBAS COSAS SON DE TIPO CALLBACK
      response => {
        if(response.project) {          

        //SUBIR LA IMAGEN
        this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image').then((result:any) => {
          //makefilesrequest es el metodo que te permite hacer peticiones ajax ubicado en "upload.service.ts"
          //Contiene 4 parametros, la url con la peticion post de upload-image de nuestro backend, ubicado en la carpeta backend, junto al parametro obligatorio de la ID (response.project.id)
          //El segundo parametro es un array vacio de los parametros, el tercero es el archivo a subir y el cuarto la imagen.
          //Como es una promesa se le añade el metodo then, que hace que con cualquier resultado haga un success o un failed  
        this.save_project = result.project;
        this.status = 'success';
        form.reset();
        });
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error)
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files; 
    //El valor de filestoupload sera el el target del archivo del archivo del input
  }

}
