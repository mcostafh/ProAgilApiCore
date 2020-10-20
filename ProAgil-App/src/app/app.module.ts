import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/Http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { EventosComponent } from './eventos/eventos.component';
import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';
import { EventoService } from './_services/evento.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatosComponent } from './contatos/contatos.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { TituloComponent } from './_shared/titulo/titulo.component';
import { UserComponent } from './user/user.component';

import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';


@NgModule({
   declarations: [					
      AppComponent,
      NavComponent,   
      EventosComponent,
      DateTimeFormatPipePipe,
      PalestrantesComponent,
      DashboardComponent,
      ContatosComponent,
      TituloComponent,
      UserComponent,
      LoginComponent,
      RegistrationComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      ToastrModule.forRoot({
         timeOut: 10000,
         positionClass: 'toast-top-right',
         preventDuplicates: true
       }),
      FormsModule, 
      ReactiveFormsModule
   ],
   providers: [
      EventoService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
