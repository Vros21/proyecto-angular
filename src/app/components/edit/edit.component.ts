import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project'; //CARGAMOS EL MODELO DEL PROYECTO PARA CREAR UN PROYECTO
import { ProjectService } from '../../services/project.service'; //CARGAMOS LOS SERVICIOS DE NUESTRA APLICACION
import { Uploadservice } from '../../services/upload.service';
import { Router, ActivatedRoute, Params} from '@angular/router'; //Lo necesitamos para coseguir la id que viene del backend
import { Global } from '../../services/global';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, Uploadservice] //CARGAMOS LOS SERVICIOS COMO PROVIDERS

})
export class EditComponent implements OnInit {
  public title: String;
  public project!: Project;
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
    this.title = "Editar Proyecto",
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
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if(response.project) {          
          if(this.filesToUpload) {
            //SUBIR LA IMAGEN
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image').then((result:any) => {
              //makefilesrequest es el metodo que te permite hacer peticiones ajax ubicado en "upload.service.ts"
              //Contiene 4 parametros, la url con la peticion post de upload-image de nuestro backend, ubicado en la carpeta backend, junto al parametro obligatorio de la ID (response.project.id)
              //El segundo parametro es un array vacio de los parametros, el tercero es el archivo a subir y el cuarto la imagen.
              //Como es una promesa se le añade el metodo then, que hace que con cualquier resultado haga un success o un failed  
            this.save_project = result.project;
            this.status = 'success';
          });
          } else {
            this.save_project = response.project;
            this.status = 'success';
          }
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
