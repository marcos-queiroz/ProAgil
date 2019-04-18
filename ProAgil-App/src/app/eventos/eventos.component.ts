import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  _filtroLista: string;

  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this._filtroLista) : this.eventos;
  }

  eventosFiltrados: any = [];
  eventos: any = [];
  imagemLargura = 50;
  imagemMargem = 1;
  mostrarImagem = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  filtrarEventos(filtraPor: string): any {
    filtraPor = filtraPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtraPor) !== -1
      ||
      evento.local.toLocaleLowerCase().indexOf(filtraPor) !== -1
      ||
      evento.dataEvento.toLocaleLowerCase().indexOf(filtraPor) !== -1
    );
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }


  getEventos() {
    this.http.get('http://localhost:5000/api/values').subscribe(
      response => {
        this.eventos = response;
      },
      error => {
        console.error(error);
      }
    );
  }

}
