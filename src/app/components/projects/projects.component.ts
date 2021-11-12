import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects: Project[] = [];
  public url: string;

  constructor(
    private _projectService: ProjectService
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProjects(); //IMPORTANTE LLAMARLO EN EL ONINIT PARA EJECUTARLO, PORQUE SINO NO SE INICIALIZA EL METODO GETPROJECTS
  }

  getProjects(){
    this._projectService.getProjects().subscribe( //Con el subscribe nos suscribimos al metodo al observable y recoger la respuesta del api
      response => {
        if(response.projects) {
          this.projects = response.projects;
        } //Si en el observable del project.service hay algo
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
