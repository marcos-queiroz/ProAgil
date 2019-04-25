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
  evento: Evento;
  imagemLargura = 50;
  imagemMargem = 1;
  mostrarImagem = false;
  registerForm: FormGroup;
  modoSalvar = 'post';
  bodyDeletarEvento = '';

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
    // reseta o modal
    this.registerForm.reset();
    // abre o modal
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

  // função para carregar os dados de um evento
  editarEvento(evento: Evento, template: any) {
    // variavel de controle
    this.modoSalvar = 'put';
    // abrir o modal
    this.openModal(template);
    // carrega o evento
    this.evento = evento;
    // carrega o form com os dados do evento
    this.registerForm.patchValue(evento);
  }

  novoEvento(template: any) {
    // variavel de controle
    this.modoSalvar = 'post';
    
    // abrir o modal
    this.openModal(template);
  }

  // função para salvar/editar um evento
  salvarAlteracao(template: any) {
    // checa se os campos foram validados
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.evento = Object.assign({}, this.registerForm.value);
        this.eventoService.postEvento(this.evento).subscribe(
          (novoEvento: Evento) => {
            // fechar o modal
            template.hide();
            // atualizar a tabela (grid)
            this.getEventos();
          }, error => {
            console.error(error);
          }
        );
      } else {
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
        this.eventoService.putEvento(this.evento).subscribe(
          () => {
            // fechar o modal
            template.hide();
            // atualizar a tabela (grid)
            this.getEventos();
          }, error => {
            console.error(error);
          }
        );
      }
    }
  }

  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }
  
  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
          template.hide();
          this.getEventos();
        }, error => {
          console.error(error);
        }
    );
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
