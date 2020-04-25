import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.page.html',
  styleUrls: ['./grupo.page.scss'],
})
export class GrupoPage implements OnInit {

  constructor( private mensajesService: MensajesService, private router:Router) { }

  ngOnInit() {
  }

  seleccionGrupo( grupoSelected : string ){

    if( grupoSelected === 'PPS-4A' ){
      this.mensajesService.setearGrupo('PPS-4A');
    }else{
      this.mensajesService.setearGrupo('PPS-4B');
    }
    this.router.navigate(['home']);
  }

}
