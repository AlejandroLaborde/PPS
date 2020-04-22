import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagesService } from 'src/app/services/images.service';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsService } from 'src/app/services/components.service';
import { AlertController } from '@ionic/angular';
import { Imagen } from 'src/app/models/imagen';
import { NavParams, ModalController } from '@ionic/angular';
import { ImageComponent } from 'src/app/components/image/image.component';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss']

})
export class ListaPage implements OnInit { 
 
  tipoLista;
  title;
  galleryType;
  allPhotos: Imagen[];
  myPhotos: Imagen[];
  currentUserId: string;

  constructor(
    private router: Router,
    private imagesService: ImagesService,
    private authService: AuthService,
    private componentsServices: ComponentsService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {
    this.componentsServices.playSong('transicion');

    console.log(this.router.url);
    this.galleryType = 'AllPhotos';
    if (this.router.url === '/lista/cosasLindas') {
      this.tipoLista = 'lindas';
      this.title = 'Cosas Lindas';
    } else {
      this.tipoLista = 'feas';
      this.title = 'Cosas Feas';
    }
    console.log(this.tipoLista);
    this.imagesService.GetAllImages().subscribe( images=>{
      console.log('imagenes all');
      console.log(images);
    })
    this.imagesService.GetAllImagesByType(this.tipoLista).subscribe(images => {
      this.allPhotos = images;
      console.log(this.allPhotos);
    });
    this.currentUserId = this.authService.getCurrentUserId();
    console.log(this.currentUserId);

    this.imagesService.GetImagesByUser(this.currentUserId, this.tipoLista).subscribe(images => {
      this.myPhotos = images;
      console.log(this.myPhotos);
    });
  }

  ngOnInit() { }

  elegirFoto() {
    this.imagesService.choosePhoto()
      .then(imageData => {
        if (imageData !== '' || imageData !== 'OK') {
          for (let i = 0; i < imageData.length; i++) {
            this.subirFoto(imageData[i]);
          }
        } else {
          // this.toastService.errorToast(
          //   'No eligió una foto.'
          // );
        }
      })
      .catch(error => {
        // this.toastService.errorToast('Error: No se han podido cargar las fotos. ' + error.message);
      });
  }

  tomarFoto() {
    this.imagesService
      .takePhoto()
      .then(async imageData => {
        // tslint:disable-next-line: triple-equals
        if (imageData !== 'No Image Selected') {
          this.subirFoto(imageData);
        } else {
          const alert = await this.alertController.create({
            message: 'no se subio la imagen',
            buttons: ['OK']
          });
          await alert.present();
        }
      })
      .catch(async error => {
        const alert = await this.alertController.create({
          message: error,
          buttons: ['OK']
        });
        await alert.present();      
      });
  }

  private subirFoto(imageData) {
    let image = new Imagen();
    // tslint:disable-next-line: triple-equals
    console.log('?');
    image.esLinda = this.tipoLista == 'lindas';
    image.uid = this.authService.getCurrentUserId();
    image.umail = this.authService.getCurrentUserMail();
    image.image = 'data:image/jpg;base64,' + imageData;
    image.votos = new Array();
    image.fecha = new Date().getTime().toString();
    this.imagesService
      .saveImage(image)
      .then(async () => {
        const alert = await this.alertController.create({
          message: 'Se subio la imagen',
          buttons: ['OK']
        });
        await alert.present();
      })
      .catch(async error => {
        const alert = await this.alertController.create({
          header: 'Fallo al subir imagen',
          message: JSON.parse(error),
          buttons: ['OK']
        });
        await alert.present();
      });
  }

  openGallery(index: number, galleryType: string) {
    console.log(index);
    this.modalController.create({
      component: ImageComponent,
      backdropDismiss: true,
      keyboardClose: true,
      showBackdrop: true,
      cssClass: 'my-custom-modal-css',
      // tslint:disable-next-line: max-line-length
      componentProps: { images: galleryType === 'AllPhotos' ? this.allPhotos : this.myPhotos, startIndex: index, uid: this.currentUserId }
    })
    .then(modal => {
      console.log(modal.componentProps);
      modal.present();
    });

  }
}
