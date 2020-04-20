import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';



import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  activo: boolean;
  private usuarioActual: string;
  private subscription;
  audioIzq = new Audio();
  audioDer = new Audio();
  audioVer = new Audio();
  audioAcostado = new Audio();
  public accX;
  public accY;
  public accZ;


  constructor(public alertController: AlertController,
              private authservices: AuthService,
              private deviceMotion: DeviceMotion,
              private flashlight: Flashlight,
              private androidPermissions: AndroidPermissions,
              private vibration: Vibration) {
    this.activo = false;
    this.usuarioActual = this.authservices.getCurrentUserMail();
  }

  ngOnInit(): void {
     this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => { console.log('Has permission?', result.hasPermission );
                  if ( !result.hasPermission ) {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA);
      }
    },
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
     this.audioIzq.src = '../../../assets/sonidos/buscar.mp3';
     this.audioDer.src = '../../../assets/sonidos/larga1.mp3';
     this.audioAcostado.src = '../../../assets/sonidos/auto.mp3';
     this.audioVer.src = '../../../assets/sonidos/sonaraaa.mp3';
     
  }

  cambioEstado() {

    if ( this.activo ) {
      this.Accelerometer();
    } else {
      this.presentAlertPrompt();
    }
  }


  Accelerometer() {
    let flag = true;
    let flagAcostado = false;
    let flagIzq =  true;
    let flagDer = true;

      // Watch device acceleration
    this.subscription = this.deviceMotion.watchAcceleration({frequency: 200}).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.accX = acceleration.x;
      this.accY = acceleration.y;
      this.accZ = acceleration.z;

    if ( this.accY < 1 && this.accX < 1 && this.accX > -1 &&  flagAcostado === true) {
      flagAcostado = false;
      timer(500).subscribe(() => {
        if (this.accX < 3) {
          this.audioAcostado.load();
          this.audioAcostado.play();
          flagAcostado = false;
          this.vibration.vibrate(5000);
        }
      });
    } else if ( this.accY > 5 || this.accX > 5 || this.accX < -5  && flagAcostado === false ) {
      flagAcostado = true;
    }
      // vertical y linterna
      if(this.accY > 3 && flag == true){
        flag = false;
        this.flashlight.switchOn();
        this.audioVer.play();
        timer(5000).subscribe(() => {
          if ( this.accY > 3) {
            flag = false;
            this.flashlight.switchOff();
          }
        });
        } else if ( this.accY < 3  && flag === false ) {
          this.flashlight.switchOff();
          flag = true;
        }

      // izquierda
      if ( this.accX > 3 && flagIzq === true) {
          flagIzq = false;
          timer(500).subscribe(() => {
            if (this.accX > 3) {
              flagIzq = false;
              this.audioIzq.load();

              this.audioIzq.play();
            }
          });
      } else if ( this.accX < 3  && flagIzq === false ) {
        flagIzq = true;
      }

      // derecha
      if ( this.accX < -3 && flagDer === true) {
        flagDer = false;
        timer(500).subscribe(() => {
          if ( this.accX < -3 ) {
            flagDer = false;
            this.audioDer.load();

            this.audioDer.play();
          }

        });
      } else if ( this.accX > -3  && flagDer === false) {
        flagDer = true;
      }
    });

  }


  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Usuario',
      message: this.usuarioActual,
      inputs: [
        {
          name: 'clave',
          type: 'number',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.activo = true;
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.authservices.verificaUsuario(this.usuarioActual, data.clave).then( resp => {
              if ( resp ) {
                this.subscription.unsubscribe();
                this.activo = false;
              } else {
                this.activo = true;
              }
            }, error => {
                console.log(error);
            });
          }
        }
      ]
    });
    await alert.present();
  }

}
