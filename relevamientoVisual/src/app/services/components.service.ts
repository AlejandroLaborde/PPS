import { Injectable } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor(private vibration: Vibration,
              private nativeAudio: NativeAudio) {
    this.inicialiceSounds();
  }


  vibrar( timer: number){
    this.vibration.vibrate(timer);
  }

  sonidoInicioApp(){

  }

  inicialiceSounds(){
    this.nativeAudio.preloadSimple('inicioApp', 'assets/sonidos/inicio.mp3').then( onSuccess => console.log(onSuccess));
    this.nativeAudio.preloadSimple('transicion', 'assets/sonidos/transicion.mp3').then( onSuccess => console.log(onSuccess));

  }
  

  playSong( id: string ){
    this.nativeAudio.play(id).then(onSuccess=>console.log(onSuccess));
  }
}
