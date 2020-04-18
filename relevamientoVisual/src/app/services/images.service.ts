import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { Imagen } from '../models/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA,
    correctOrientation: true
  };

  imagePickerOptions: ImagePickerOptions = {
    quality: 50,
    outputType: 1
  };

  imagesRef: AngularFireList<Imagen>;

  constructor(private camera: Camera, private db: AngularFireDatabase, private imagePicker: ImagePicker
    ) {
    this.imagesRef = db.list('images');
    this.imagesRef.snapshotChanges().subscribe( x => {
    });
  }

  takePhoto() {
    return this.camera.getPicture(this.options)
    .then(res => {
      return res;
    })
    .catch(error => {
      console.error(error);
      return error;
    });
  }

  choosePhoto() {
    return this.imagePicker.getPictures(this.imagePickerOptions)
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(error => {
      console.error(error);
      return error;
    });
  }

  saveImage(image: Imagen) {
    return this.imagesRef.push(image);
  }
  updateItem(key: string, image: Imagen) {
    return this.imagesRef.update(key, image);
  }
  deleteItem(key: string) {
    return this.imagesRef.remove(key);
  }
  deleteEverything() {
    return this.imagesRef.remove();
  }

  GetAllImages() {
    return this.imagesRef.snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    )
    .pipe(
      map(images => {
        return images.sort((a, b) => {
          console.log(a.fecha.substr(0,19).trim());
          console.log(new Date(b.fecha.substr(0,19).trim()).getTime() - new Date(a.fecha.substr(0,19).trim()).getTime());
          return new Date(b.fecha.substr(0,19).trim()).getTime() - new Date(a.fecha.substr(0,19).trim()).getTime();
        });
      })
    );
  }

  GetAllImagesByType(tipo: string) {
    return this.GetAllImages().pipe(
      map(images => {
        return images.filter((image: Imagen) => {
          switch (tipo) {
            case 'lindas':
              return image.esLinda;
            case 'feas':
              return !image.esLinda;
          }
        });
      })
    );
  }

  GetImagesByUser(uid: String, tipo: string) {
    return this.GetAllImagesByType(tipo).pipe(
      map(images => {
        return images.filter(image => {
          return image.uid === uid;
        });
      })
    );
  }
}
