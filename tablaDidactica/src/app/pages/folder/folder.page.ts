import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  providers:[NativeAudio]
})
export class FolderPage implements OnInit {
  
  idioma: string;
  tipo: string;

  constructor(private nativeAudio: NativeAudio) { }

  ngOnInit() {
    this.seleccionaIdioma('E');
    this.seleccionaTipo('animales');
    this.instanciaSonidos();
  }

  reproduceSonido( tipo: string){

    const id=this.idioma + '_' + tipo;
    this.nativeAudio.play(id).then(onSuccess=>{
      console.log( 'reproduciendo: ' + id );
    }, onError=>{
      console.log('Fallo al reproducir id: ' + id + 'error: ' + onError);
    });
  }

  seleccionaIdioma( idioma: string ){
    console.log('idioma: ' + idioma );
    this.idioma = idioma;
  }

  seleccionaTipo( tipo: string){
    console.log('Tipo: ' + tipo );
    this.tipo = tipo;
  }

  precargaSonido( id: string , path: string ){
    this.nativeAudio.preloadSimple( id, path ).then(onSuccess=>{
      console.log(onSuccess);
    }, onError => {
      console.log(onError);
    });
  }

  instanciaSonidos(){
    //sonidos español
    this.precargaSonido('E_uno','assets/sonidos/español/uno.mp3');
    this.precargaSonido('E_dos','assets/sonidos/español/dos.mp3');
    this.precargaSonido('E_tres','assets/sonidos/español/tres.mp3');
    this.precargaSonido('E_cuatro','assets/sonidos/español/cuatro.mp3');
    this.precargaSonido('E_cinco','assets/sonidos/español/cinco.mp3');

    this.precargaSonido('E_perro','assets/sonidos/español/perro.mp3');
    this.precargaSonido('E_gato','assets/sonidos/español/gato.mp3');
    this.precargaSonido('E_oveja','assets/sonidos/español/oveja.mp3');
    this.precargaSonido('E_burro','assets/sonidos/español/burro.mp3');
    this.precargaSonido('E_conejo','assets/sonidos/español/conejo.mp3');

    this.precargaSonido('E_amarillo','assets/sonidos/español/amarillo.mp3');
    this.precargaSonido('E_azul','assets/sonidos/español/azul.mp3');
    this.precargaSonido('E_rojo','assets/sonidos/español/rojo.mp3');
    this.precargaSonido('E_violeta','assets/sonidos/español/violeta.mp3');
    this.precargaSonido('E_verde','assets/sonidos/español/verde.mp3');

    //sonidos ingles
    this.precargaSonido('I_uno','assets/sonidos/ingles/uno.mp3');
    this.precargaSonido('I_dos','assets/sonidos/ingles/dos.mp3');
    this.precargaSonido('I_tres','assets/sonidos/ingles/tres.mp3');
    this.precargaSonido('I_cuatro','assets/sonidos/ingles/cuatro.mp3');
    this.precargaSonido('I_cinco','assets/sonidos/ingles/cinco.mp3');
						 
    this.precargaSonido('I_perro','assets/sonidos/ingles/perro.mp3');
    this.precargaSonido('I_gato','assets/sonidos/ingles/gato.mp3');
    this.precargaSonido('I_oveja','assets/sonidos/ingles/oveja.mp3');
    this.precargaSonido('I_burro','assets/sonidos/ingles/burro.mp3');
    this.precargaSonido('I_conejo','assets/sonidos/ingles/conejo.mp3');
         
    this.precargaSonido('I_amarillo','assets/sonidos/ingles/amarillo.mp3');
    this.precargaSonido('I_azul','assets/sonidos/ingles/azul.mp3');
    this.precargaSonido('I_rojo','assets/sonidos/ingles/rojo.mp3');
    this.precargaSonido('I_violeta','assets/sonidos/ingles/violeta.mp3');
    this.precargaSonido('I_verde','assets/sonidos/ingles/verde.mp3');

    //sonidos portugues

    this.precargaSonido('P_uno','assets/sonidos/portugues/uno.mp3');
    this.precargaSonido('P_dos','assets/sonidos/portugues/dos.mp3');
    this.precargaSonido('P_tres','assets/sonidos/portugues/tres.mp3');
    this.precargaSonido('P_cuatro','assets/sonidos/portugues/cuatro.mp3');
    this.precargaSonido('P_cinco','assets/sonidos/portugues/cinco.mp3');
						 
    this.precargaSonido('P_perro','assets/sonidos/portugues/perro.mp3');
    this.precargaSonido('P_gato','assets/sonidos/portugues/gato.mp3');
    this.precargaSonido('P_oveja','assets/sonidos/portugues/oveja.mp3');
    this.precargaSonido('P_burro','assets/sonidos/portugues/burro.mp3');
    this.precargaSonido('P_conejo','assets/sonidos/portugues/conejo.mp3');
						 
    this.precargaSonido('P_amarillo','assets/sonidos/portugues/amarillo.mp3');
    this.precargaSonido('P_azul','assets/sonidos/portugues/azul.mp3');
    this.precargaSonido('P_rojo','assets/sonidos/portugues/rojo.mp3');
    this.precargaSonido('P_violeta','assets/sonidos/portugues/violeta.mp3');
    this.precargaSonido('P_verde','assets/sonidos/portugues/verde.mp3');
  }

}
