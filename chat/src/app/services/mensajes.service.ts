import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mensaje } from '../models/mensaje';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private host='https://login-742f5.firebaseio.com/';

  constructor( private httpClient: HttpClient ) {

  }

  public nuevoMensaje( mensaje: Mensaje){
    return this.httpClient.post(`${this.host}/mensajes.json`,mensaje).toPromise();
  }

  public getMensajes(){
    return this.httpClient.get(`${this.host}/mensajes.json`).pipe(map( datos=>this.objecToArray(datos) ));
  }

  private objecToArray( datos: Object ){
    const mensajes : Mensaje[] = [];
    if(datos == null) return [];

    Object.keys( datos ).forEach( key =>{
        let mensaje: Mensaje = datos[key];
        mensaje.id = key ;
        mensajes.push(mensaje);
    })
    return mensajes;
  }


}
