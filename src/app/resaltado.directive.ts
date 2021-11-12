import { Directive, ElementRef } from '@angular/core';
//ElementRef se utiliza para seleccionar la propiedad nativeElement de los atributos de los objetos HTML

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor(el: ElementRef) { 
    console.log(el.nativeElement) ;
    //Esto nos cogera el nativeElement (propiedad de HTML) del elemento donde insertamos la directiva.
    //En este caso vamos a insertar la directiva en el parrafo de contact.html
  }
  
}
