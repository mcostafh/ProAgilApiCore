import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento } from '../_models/Evento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseURL = "http://localhost:5000/api/evento";
  constructor( private Http : HttpClient ){ }

  getAllEventos(): Observable<Evento[]>{
    return this.Http.get<Evento[]>(this.baseURL);
  }

  getEventosByTema( Tema :string): Observable<Evento[]>{
    return this.Http.get<Evento[]>('${this.baseURL}/getByTema/$[Tema}');
  }

  getEventosById(Id:number): Observable<Evento>{
    return this.Http.get<Evento>('${this.baseURL}/getById/$[Id}');
  }

}


