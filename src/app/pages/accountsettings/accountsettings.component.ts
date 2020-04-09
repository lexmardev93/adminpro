import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-accountsettings',
  templateUrl: './accountsettings.component.html',
  styles: []
})
export class AccountsettingsComponent implements OnInit {

  // Importamos el servicio
  constructor(private ajustesService: SettingsService) { }

  ngOnInit(): void {
    this.cargarCheck();
  }

  cambiarColor(refHtml: HTMLElement) {
    const tema: string = refHtml.getAttribute('data-theme');
    this.aplicarCheck(refHtml);
    this.ajustesService.ajustes.tema = tema;
    this.ajustesService.aplicarAjustes();
  }

  aplicarCheck(refHtml: HTMLElement) {
    const selectors: any = document.getElementsByClassName('selector');
    for (const ref of selectors) {
      ref.classList.remove('working');
    }

    refHtml.classList.add('working');
  }

  cargarCheck() {
    const selectors: any = document.getElementsByClassName('selector');
    for (const ref of selectors) {
      if (this.ajustesService.ajustes.tema === ref.getAttribute('data-theme')) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
