import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Mensaje } from 'src/app/models/mensaje';
import { AuthService } from 'src/app/services/auth.service';
import { IonList, IonContent } from '@ionic/angular';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  @ViewChild( IonList, { read: ElementRef, static:false}) list: ElementRef;
  @ViewChild( IonContent, { read: IonContent, static:false}) content: IonContent;


  usuarioActual = "nn";
  grupoActual= "PPS-4A" ;
  user= "US";
  mensajeNuevo:string;
  mensajes:any[];
  showSpinner=true;

  constructor( private mensajeServices: MensajesService, private authServices: AuthService) {
    this.usuarioActual = this.authServices.getCurrentUserMail();
    this.grupoActual = this.mensajeServices.getGrupo();
  }
  ngOnInit(){
    

    this.mensajeServices.getMensajes().pipe(map( (dato:any) =>{
      let datosFiltrados=[]
      dato.forEach(element => {
        if( element.grupo === this.grupoActual ){
          datosFiltrados.push(element);
        }
      });
      return datosFiltrados;
    } )).subscribe( (resp:any)=>{
      this.mensajes = resp;
      this.showSpinner=false;
      setTimeout(()=>{
        this.scrollDown();
      },500);
    });
  }

  enviar(){
    
    this.mensajeServices.nuevoMensaje(
      new Mensaje(this.mensajeNuevo,this.usuarioActual,new Date().toLocaleString(),new Date().getTime(),this.grupoActual)
      ).then(()=>{
      this.mensajeNuevo = null;
    }).catch(error=>{
      console.error(error);
    })
  }

  scrollDown(){
    this.content.scrollToBottom();
  }

  filtraGrupo(  ){

  }

}
