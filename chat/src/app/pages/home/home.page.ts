import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Mensaje } from 'src/app/models/mensaje';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  usuarioActual = "Anonimo";
  user= "US";
  mensaje:string;
  mensajes:any[];

  constructor( private mensajeServices: MensajesService) {
    
  }
  ngOnInit(){
    this.mensajeServices.getMensajes().subscribe( (resp:any)=>{
      this.mensajes = resp;
    });
  }

  enviar(){
    this.mensajeServices.nuevoMensaje(new Mensaje(this.mensaje,this.usuarioActual,new Date().toLocaleString())).then(()=>{
      console.log("envio");
    }).catch(error=>{
      console.log("algo salio mal");
      console.error(error);
    })
  }


}
