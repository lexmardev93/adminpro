import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings/settings.service';

declare function initPlugins(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  // Al declarar el servicio en automatico dispara el constructor del servicio
  constructor(private ajustesService: SettingsService) { }

  ngOnInit(): void {
    initPlugins();
  }
}
