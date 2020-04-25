import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { CobroService } from 'src/app/services/cobro.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private codigosQR;
  
  public miCredito = 0;
  public escaneo;
  public scannerqr = false;
  public usuario="";
  private saldoCompleto={
    "usuario":'',
    "saldo":0,
    'codigo10':0,
    'codigo50':0,
    'codigo100':0
  }
  constructor( private barcodeScanner: BarcodeScanner,
              private authService:AuthService,
              private toastService: ToastController,
              private cobroService: CobroService ) {

  

  }

  ngOnInit(): void {
    this.usuario = this.authService.getCurrentUserMail();
    this.cobroService.obtenerSaldo( this.authService.getCurrentUserMail() ).subscribe((resp:any)=>{
      console.log(resp);
      if(resp == null){
        this.miCredito=0;
        this.saldoCompleto.usuario = this.usuario;
        console.log(this.saldoCompleto);
      }else{
        this.saldoCompleto = resp;
        this.miCredito=resp.saldo;
      }
      
    });
    this.cobroService.obtenerSaldos().subscribe((datos)=>{
        console.log(datos);
    })
  }



  async eliminarSaldo(){
    if(this.miCredito != 0){
      const toast = await this.toastService.create({
        duration: 2000,
        message: "Se elimino el Crédito",
        color:'danger'
      });
      toast.present();
      this.miCredito = 0;
    }
  }


  scanear(){
    this.barcodeScanner.scan().then( async (data:any) =>{

      const valores = this.cobroService.getValorCodigo( data.text );
      if( valores != -1) {
       
        this.cobroService.devolverCantCodigo(this.cobroService.getnombreCodigo(data.text)).subscribe( async cantidad=>{

          switch(this.cobroService.getnombreCodigo(data.text)){
            case 'codigo100':
                  this.saldoCompleto.codigo100 ++;
              break;
            case 'codigo10':
                this.saldoCompleto.codigo10 ++;
              break;
            case 'codigo50':
              this.saldoCompleto.codigo50 ++;
              break;
          }

          this.carga( cantidad , valores);
          
        });

      }else{
        const toast = await this.toastService.create({
          duration: 2000,
          message: "No se pudo cobrar del codigo leido",
          color:'danger'
        });
        toast.present();
        
        }
      }).catch(async err => {
      

        // const valores = this.cobroService.getValorCodigo( 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172' );
        // if( valores != -1) {
         
        //   this.cobroService.devolverCantCodigo(this.cobroService.getnombreCodigo('ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172')).subscribe( async cantidad=>{
        //     console.log(cantidad);
        //     switch(this.cobroService.getnombreCodigo('ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172')){
        //       case 'codigo100':
        //             this.saldoCompleto.codigo100 ++;
        //         break;
        //       case 'codigo10':
        //           this.saldoCompleto.codigo10 ++;
        //         break;
        //       case 'codigo50':
        //         this.saldoCompleto.codigo50 ++;
        //         break;
        //     }
  
        //     this.carga( cantidad , valores);
            
        //   });
        // }

      










        const toast = await this.toastService.create({
          duration: 2000,
          message: err,
          color:'danger'
        });
        toast.present();

      });
    }


  async carga( cantidad , valores){
    console.log("entro");

    if(this.usuario=="admin@admin.com"){

      if(cantidad<2){
        this.miCredito += valores;
        this.cobroService.nuevoCobro(
          this.usuario,
          this.miCredito,
          this.saldoCompleto.codigo10,
          this.saldoCompleto.codigo50,
          this.saldoCompleto.codigo100
          );
      }else{
        const toast = await this.toastService.create({
          duration: 2000,
          message: "Ya se acredito el saldo de este codigo QR",
          color:'warning'
        });
        toast.present();
        
      }

    }else{

      if(cantidad<1){
        this.miCredito += valores;
        this.cobroService.nuevoCobro(
          this.usuario,
          this.miCredito,
          this.saldoCompleto.codigo10,
          this.saldoCompleto.codigo50,
          this.saldoCompleto.codigo100
          );
      }else{
        const toast = await this.toastService.create({
          duration: 2000,
          message: "Ya se acredito el saldo de este codigo QR",
          color:'warning'
        });
        toast.present();
        
      }

    }
  }

}