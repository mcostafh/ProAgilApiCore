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
    this.tokenHeader = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('token')}`});
  }

  getAllEventos(): Observable<Evento[]>{
    

    return this.Http.get<Evento[]>(this.baseURL, {headers: this.tokenHeader});
  }

  getEventosByTema( Tema :string): Observable<Evento[]>{
    return this.Http.get<Evento[]>('${this.baseURL}/getByTema/$[Tema}', {headers: this.tokenHeader});
  }

  getEventosById(Id:number): Observable<Evento>{
    return this.Http.get<Evento>('${this.baseURL}/getById/$[Id}', {headers: this.tokenHeader});
  }

  postEvento(evento:Evento){
    return this.Http.post( this.baseURL, evento,{headers: this.tokenHeader});
  }  

  putEvento(evento:Evento){
    return this.Http.put( this.baseURL+'/'+evento.id, evento, {headers: this.tokenHeader});
  }  

  deleteEvento(id:Number){
    return this.Http.delete( this.baseURL+'/'+id, {headers: this.tokenHeader});
  }  


}


