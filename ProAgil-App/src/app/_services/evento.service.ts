import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evento } from '../_models/Evento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseURL = "http://localhost:5000/api/evento";
  tokenHeader :HttpHeaders;
  
  constructor( private Http : HttpClient ){ 
    
  }

  getAllEventos(): Observable<Evento[]>{
    

    return this.Http.get<Evento[]>(this.baseURL );
  }

  getEventosByTema( Tema :string): Observable<Evento[]>{
    return this.Http.get<Evento[]>('${this.baseURL}/getByTema/$[Tema}' );
  }

  getEventosById(Id:number): Observable<Evento>{
    return this.Http.get<Evento>('${this.baseURL}/getById/$[Id}');
  }

  postEvento(evento:Evento){
    return this.Http.post( this.baseURL, evento);
  }  

  putEvento(evento:Evento){
    return this.Http.put( this.baseURL+'/'+evento.id, evento );
  }  

  deleteEvento(id:Number){
    return this.Http.delete( this.baseURL+'/'+id );
  }  


}


