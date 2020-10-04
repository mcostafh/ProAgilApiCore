import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';

defineLocale('pt-br', ptBrLocale); 


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  titulo='Eventos';

  eventos : Evento[];
  evento : Evento;
  imagemLargura = 50;
  imagemMargem=2;
  mostrarImagem=false;
  eventosFiltrados : Evento[];
  registerForm: FormGroup;
  modoSalvar: any;
  bodyDeletarEvento='';

  _filtroLista: string;
  
  constructor( 
    private eventoService: EventoService
    , private modalService: BsModalService
    , private fb: FormBuilder
    , private LocaleService: BsLocaleService
    , private toastr: ToastrService
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
  
  
  editarEvento(template: any, evento:Evento){
    this.modoSalvar='put';
    this.openModal( template);
    this.evento = evento;
    this.registerForm.patchValue( evento);
  }

  novoEvento(template: any){
    this.modoSalvar='post';
    this.openModal( template);

  }


  openModal(template: any){
    this.registerForm.reset();
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

  salvarAlteracao( template: any){
    if ( this.registerForm.valid){
      if ( this.modoSalvar==='post'){
        this.evento = Object.assign( {}, this.registerForm.value);
        this.eventoService.postEvento( this.evento).subscribe(
          (novoEvento: Evento) => {
            console.log( novoEvento);
            template.hide();
            this.getEventos();
            this.toastr.success('Incluído com sucesso!', 'Evento!');
          }, error =>{
            this.toastr.error('Erro ao tentar insetir: ${error}')
          })
        
      }else{
          this.evento = Object.assign( {id: this.evento.id}, this.registerForm.value);
          this.eventoService.putEvento( this.evento).subscribe(
            () => {
              template.hide();
              this.getEventos();
              this.toastr.success('Gravado com sucesso!', 'Evento!');
            }, error =>{
              this.toastr.error('Erro ao tentar gravar: ${error}')
            })

      }
    }
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
        
        },
          error => {this.toastr.error('Erro ao tentar gravar: ${error}');}
        );
        
  }


  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}?`;
  }

  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
          template.hide();
          this.getEventos();
          this.toastr.info('Deletado!', 'Evento!');

        }, error => {
          this.toastr.error('Erro ao tentar gravar: ${error}');
        }
    );
  }

}
