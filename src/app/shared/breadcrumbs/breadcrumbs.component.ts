import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string = 'Home';

  constructor(private router: Router, private title: Title, private meta: Meta) {
    this.getDataRouter().subscribe((data) => {
      this.titulo = data.titulo;
      this.title.setTitle(data.titulo);

      // Declara la constante del metatag
      const metaTag: MetaDefinition = {
        name: 'desccription',
        content: data.titulo
      };

      // Agrega el metatag
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit(): void {
  }

  getDataRouter() {
    return this.router.events.pipe(
      filter((evento) => evento instanceof ActivationEnd), // Condicion que solo devuelve los eventos de tipo ActivationEnd
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null), // Devuelve solo las ActivationEnd con firstChild null
      map((evento: ActivationEnd) => evento.snapshot.data) // Devuelve los datos al suscriptor
    );
  }
}
