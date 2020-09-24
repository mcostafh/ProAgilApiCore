import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale); 


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos : Evento[];
  imagemLargura = 50;
  imagemMargem=2;
  mostrarImagem=false;
  eventosFiltrados : Evento[];
  registerForm: FormGroup;

  _filtroLista: string;
  
  constructor( 
    private eventoService: EventoService
    , private modalService: BsModalService
    , private fb: FormBuilder
    , private LocaleService: BsLocaleService
    ) { 
      this.LocaleService.use('pt-br');
    }

  public get filtroLista() : string {
    return this._filtroLista;
  }

  
  public set filtroLista(value : string) {
    this._filtroLista = value;
    this.eventosFiltrados= this._filtroLista ? this.filtrarEventos(this._filtroLista ) : this.eventos; 
  }
  
  
  openModal(template: any){
    template.show();

  }

  ngOnInit() {
    this.validation()
    this.getEventos();
  }

  filtrarEventos(filtrarPor : string): Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf( filtrarPor) !== -1

    );
  }

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem; 
  }

  salvarAlteracao(){

  }

  validation(){
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required , Validators.minLength(4), Validators.maxLength(50)]],
      local: ['',Validators.required],
      imagemURL: ['',Validators.required],
      dataEvento: ['',Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000) ]],
      telefone: ['',Validators.required],
      email: ['', [  Validators.required, Validators.email]]
    })


  }

  getEventos(){
    this.eventoService.getAllEventos().subscribe(
        ( _Eventos : Evento[] )=> {
          this.eventos = _Eventos;
          this.eventosFiltrados = this.eventos;
          console.log(_Eventos);
        
        },
        error => {console.log(error);}
        );
        
  }

}
