import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  modalRef : BsModalRef;
  registerForm: FormGroup;

  _filtroLista: string;
  
  constructor( 
    private eventoService: EventoService
    , private modalService: BsModalService
    , private fb: FormBuilder
    ) { }

  public get filtroLista() : string {
    return this._filtroLista;
  }

  
  public set filtroLista(value : string) {
    this._filtroLista = value;
    this.eventosFiltrados= this._filtroLista ? this.filtrarEventos(this._filtroLista ) : this.eventos; 
  }
  
  
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);

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
