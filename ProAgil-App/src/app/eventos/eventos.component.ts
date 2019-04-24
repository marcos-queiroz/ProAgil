import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from './../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';

defineLocale('pt-br', ptBrLocale);

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
  registerForm: FormGroup;

  _filtroLista = '';

  // construtor
  constructor(
      private eventoService: EventoService
    , private modalService: BsModalService
    , private fb: FormBuilder
    , private localeService: BsLocaleService
  ) { 
    this.localeService.use('pt-br');
  }

  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this._filtroLista ? this.filtrarEventos(this._filtroLista) : this.eventos;
  }

  openModal(template: any) {
    template.show();
  }

  // executa após os carregamentos
  ngOnInit() {
    this.validation();
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

  //
  salvarAlteracao() {

  }

  // validação do formulario 
  validation() {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      imagemURL: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
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
