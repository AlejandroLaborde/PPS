import { Component, OnInit, ViewChild } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Mensaje } from 'src/app/models/mensaje';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  usuarioActual = "nn";
  user= "US";
  mensajeNuevo:string;
  mensajes:any[];

  constructor( private mensajeServices: MensajesService, private authServices: AuthService) {
    this.usuarioActual = this.authServices.getCurrentUserMail();
  }
  ngOnInit(){
    this.mensajeServices.getMensajes().subscribe( (resp:any)=>{
      this.mensajes = resp;
    });
  }

  enviar(){
    this.mensajeServices.nuevoMensaje(new Mensaje(this.mensajeNuevo,this.usuarioActual,new Date().toLocaleString())).then(()=>{
      this.mensajeNuevo="";
    }).catch(error=>{
      console.error(error);
    })
  }


}
