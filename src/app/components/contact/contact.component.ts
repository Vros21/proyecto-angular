import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public widthSlider: number | undefined;
  public anchuraToSlider: number | undefined;
  public captions: boolean;
  public autor: any; //Creamos esta propiedad para recoger el evento lanzado desde el hijo, para luego pasarsela a contact.html
  @ViewChild('textos') textos: any;

  constructor() { 
    this.captions = true;
  }

  ngOnInit(): void {
    console.log(this.textos);
  }

  cargarSlider() {
    this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider() {
    this.anchuraToSlider = 0;
  }
  
  getAutor(event:any) {
    console.log(event);
    this.autor = event; //Hacemos que la propiedad autor, que la hemos creado aqui coja la inforamción que le viene por el event y así la mostrarmos luego en la vista de contact.html
  }
}
