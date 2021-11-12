import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; //Tenemos que importar Input para recoger el atributo del padre, que es contact
declare var $:any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() anchura: number | undefined; //Con input recogemos la propiedad anchura que nos viene de contact.html
  @Input() captions: boolean | undefined; 
  //LA PROPIEDAD INPUT VA DE PADRES A HIJOS
  //En slider.ts este input se llama captions, pero cuando le pasas el parametro a contact.html se lo pasas como etiquetas, es una manera de cambiar los nombres

  @Output() conseguirAutor = new EventEmitter();
  //LA PROPIEDAD OUTPUT VA DE HIJOS A PADRES
  //EventEmitter te permite crear eventos


  public autor: any;

  constructor() { 
    this.autor = { //Usamos este objeto para pasarselo al otro componente, el padre en este caso (contacto)
      nombre: "Jose María Vilarós Capella",
      web: "jmvicap.com",
      youtube: "Jose María Vilarós Capella"
    }
  }

  ngOnInit(): void {
    $("#logo").click(function(e:any){
      e.preventDefault();
      $("header").css("background", "green")
                  .css("height", "50px");
    });


   $(document).ready(() =>{
     $('.galeria').bxSlider({
       mode: 'fade',
       captions: true,
       slideWidth: this.anchura 
       //Una vez tenemos arriba el input de anchura le decimos que nuestro bxslider tenga la anchura de la propiedad que nos han pasado, que a su vez esta modificada por two way data binding.
     }
     );
   });
  }

  lanzar(event:any) { //Este método lanza este evento
    console.log(event);
    this.conseguirAutor.emit(this.autor); //Lanzar evento con emit
  }
}
