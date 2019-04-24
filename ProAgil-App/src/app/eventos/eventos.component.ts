import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from './../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})

export class EventosComponent implements OnInit {
  eventosFiltrados: Evento[];
  eventos: Evento[];
  imagemLargura = 50;
  imagemMargem = 1;
  mostrarImagem = false;
  modalRef: BsModalRef;

  _filtroLista = '';

  constructor(
      private eventoService: EventoService
    , private modalService: BsModalService
  ) { }

  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this._filtroLista ? this.filtrarEventos(this._filtroLista) : this.eventos;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // executa após os carregamentos
  ngOnInit() {
    this.getEventos();
  }

  // função para filtrar os eventos na lista
  filtrarEventos(filtraPor: string): Evento[] {
    filtraPor = filtraPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtraPor) !== -1
    );
  }

  // alterara se exibe ou não a imagem
  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  // carrega os eventos usando o service getEvento
  getEventos() {
    this.eventoService.getAllEvento().subscribe(
      (_eventos: Evento[]) => {
        // carrega o retorno da solicitação
        this.eventos = _eventos;
        // exibir na view
        this.eventosFiltrados = this.eventos;
        console.log(_eventos);
      },
      error => {
        console.error(error);
      }
    );
  }

}
