import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CobroService {

  private host = 'https://login-742f5.firebaseio.com/';
  private codigosQR= [
    { "codigo": "8c95def646b6127282ed50454b73240300dccabc", "valor": 10},
    { "codigo": "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172", "valor": 50},
    { "codigo": "2786f4877b9091dcad7f35751bfcf5d5ea712b2f", "valor": 100}
  ] 
  private saldos;
  private usuarioActual="nn";

  constructor( private httpClient: HttpClient ) {
    
  }

  devolverCantCodigo( codigo:string ){
    console.log(codigo);
    return this.httpClient.get(`${this.host}saldos/${this.usuarioActual}/${codigo}.json`)
  }

  eliminarSaldo(){
    return this.httpClient.delete(`${this.host}saldos/${this.usuarioActual}.json`);
  }


  obtenerSaldo( usuario:string ){
    this.usuarioActual="nn";
    return this.obtenerSaldos().pipe(map( (filtro:any) =>{
      let saldo;
      filtro.forEach(element => {
        if( element.usuario === usuario ){
 
          this.usuarioActual = element.id;
          saldo=element;
        }
      
      });
      return saldo;
    }));
  }



  obtenerSaldos(){
    return this.httpClient.get(this.host + 'saldos.json').pipe(map(saldos=>{
      this.saldos=this.objecToArray(saldos);
      return this.objecToArray(saldos)
    }));
  }

  nuevoCobro( usuario:string, saldo:number , cantidad10:number,cantidad50:number, cantidad100:number ){

        
    if( this.usuarioActual!= "nn"){
      console.log("entro a patch");
      this.httpClient.patch(`${this.host}saldos/${this.usuarioActual}.json`,{
        "usuario":usuario,
        "saldo":saldo,
        'codigo10':cantidad10,
        'codigo50':cantidad50,
        'codigo100':cantidad100
      }).subscribe(()=>{
      });
    }else{
      this.httpClient.post(this.host + 'saldos.json',{
        "usuario":usuario,
        "saldo":saldo, 
        'codigo10':cantidad10,
        'codigo50':cantidad50,
        'codigo100':cantidad100
      }).subscribe(()=>{
      });
    }

  }

  getnombreCodigo( codigo: string ){
    let valor="";
    this.codigosQR.forEach( codigos =>{
      if(codigo === '2786f4877b9091dcad7f35751bfcf5d5ea712b2f'){
        valor="codigo100";
      }else if(codigo === 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172'){
        valor="codigo50";
      }else{
        valor="codigo10";
      }
    })
    console.log(valor);
    return valor;
  }

  getValorCodigo( codigo: string ){
    let valor=-1;
    this.codigosQR.forEach( codigos =>{
      if(codigos.codigo === codigo){
        valor=codigos.valor;
      }
    })
    return valor;
  }

  private objecToArray( datos: any ){
    const mensajes : any[] = [];
    if(datos == null) return [];

    Object.keys( datos ).forEach( key =>{
        let mensaje: any = datos[key];
        mensaje.id = key ;
        mensajes.push(mensaje);
    })
    return mensajes;
  }

}
