import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ComponentsService } from './services/components.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent{
  showSplash: Boolean = true;

  loading = true;
  constructor(
    private platform: Platform,
    public splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private componentsService: ComponentsService
  ) {
    this.initializeApp();
  }

  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide(); 
    });
    timer(5000).subscribe( () => {
      this.componentsService.playSong('inicioApp');
      this.showSplash = false;
    });
  }
}
