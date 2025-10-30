import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, RouterModule, FormsModule], //importamos FormsModule para la conexion entre el html y ts
  styleUrls: ['./login.component.css']
})

//logica del login
export class LoginComponent {
  email: string= "";
  password: string= "";
  mensajeError: string="";

   // nuevos mensajes específicos por campo
  mensajeEmail: string = "";
  mensajePassword: string = "";

  iniciarSesion() {
    //limpiamos mensaje anterior
    this.mensajeError= '';
    this.mensajeEmail = '';
    this.mensajePassword = '';

    //validacion de campos vacios
    if(!this.email.trim() && !this.password.trim()){
      this.mensajeError= 'Por favor, complete todos los campos';
      //this.mensajeEmail = 'Por favor, ingrese su correo electrónico';
      //this.mensajePassword = 'Por favor, ingrese su contraseña';
    } else if(!this.email.trim()){
      //this.mensajeError = 'Por favor, ingrese su correo electrónico';
      this.mensajeEmail = 'Por favor, ingrese su correo electrónico';
    }else if (!/^\S+@.*$/.test(this.email)) {
      this.mensajeEmail = 'El correo debe tener una palabra seguida de @ (ejemplo: juan@)';
    } 
    else if(!this.password.trim()){
      //this.mensajeError='Por favor, ingrese su Contraseña';
      this.mensajePassword = 'Por favor, ingrese su contraseña';
    }else{
      alert('inicio de sesion exitoso(sin conexion a base de datos)')
    }

    
  }


}
