//ESTE INYECTABLE TE PERMITE SUBIR ARCHIVOS AL SERVIDOR

import { Injectable } from "@angular/core";
import { Global } from "./global";

@Injectable()
export class Uploadservice {
    public url: string;

    constructor(){
        this.url = Global.url;
    }

    makeFileRequest(url: string, params: Array<String>, files: Array<File>, name:string){ //TE PERMITE HACER UNA PETICION AJAX PERO CON LA POSIBILIDAD DE SUBIR ARCHIVOS
        return new Promise(function(resolve, reject){ //PROMESA CON FUNCION DE CALLBACK.
            //SI ES RESOLVED ESSTA BIEN, SI ES REJECT ES QUE HA DADO ERROR
            var formData = new FormData(); // SIMULAR UN FORMULARIO CLÁSICO
            var xhr = new XMLHttpRequest(); //OBJETO DE PETICIONES ASINCRONAS DE JAVASCRIPT (AJAX)
          
            for(var i=0; i< files.length; i++) {
                formData.append(name,files[i], files[i].name); //A FORMDATA LE AÑADES LOS ARCHIVOS QUE QUIERES
               //formData.append("test",files[i]);
                //RECORRE LOS ARCHIVOS, LOS ADJUNTA AL FORMULARIO Y LES PONE EL NOMBRE, EL ARCHIVO Y EL NOMBRE DEL ARCHIVO
            }
            //console.log(formData.get("test"));

            xhr.onreadystatechange = function(){ 
                if(xhr.readyState == 4) { //Valores "que funcionan así y ya está"
                    if(xhr.status == 200) { //Estado 200 de la petición --> OK
                        resolve(JSON.parse(xhr.response)); //PARSEAR A JSON EL CUERPO (RESPONSE) DE LA PETICION AJAX XHR
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST', url, true); //HACER LA PETICION AJAX POR EL METODO POST DE LA URL, Y TRUE PARA HACER LA PETICION
            xhr.send(formData); //ENVIAR TODO EL FORMULARIO
        })
    }
}