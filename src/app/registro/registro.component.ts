import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',    
  standalone: true,           // Nombre del componente (debe coincidir con lo que usarás en HTML)
  templateUrl: './registro.component.html', 
  imports: [CommonModule, RouterModule, FormsModule],// Ruta del archivo HTML
  styleUrls: ['./registro.component.css']   // Ruta del archivo CSS
})


// Aquí irá la lógica del formulario o funciones del componente
export class RegistroComponent {

  nombre: string= "";
  email: string= "";
  tel:  string= "";
  password: string= "";
  confirmacionC: string="";
  mensajeError: string="";

  mensajeNombre: string="";
  mensajeCorreo: string="";
  mensajeTel: string="";
  mensajePassword: string="";
  mensajeConfirmacion: string="";
  
  guardarRegistro(){
    //limpiamos mensjaes:
    this.mensajeError="";
    this.mensajeNombre="";
    this.mensajeCorreo="";
    this.mensajeTel= "";
    this.mensajePassword="";
    this.mensajeConfirmacion="";

    //validacion de campos
    if(!this.nombre.trim() && !this.email.trim() && !this.tel.trim() && !this.password.trim() && !this.confirmacionC.trim()){
      this.mensajeError='Por favor completar todos los campos';
    }else if(!this.nombre.trim()){
      this.mensajeNombre=' Por favor ingresar el nombre';
    }else if(!this.email.trim()){
      this.mensajeCorreo='por favor ingresar el correo';
    }else if(!this.tel.trim()){
      this.mensajeTel='por favor ingresar el telefono'
    }else if(!this.password.trim()){
      this.mensajePassword='por favor ingresar la contraseña'
    }else if(!this.confirmacionC.trim()){
      this.mensajeConfirmacion='por favor ingresar la contraseña'
    }else if (this.password !== this.confirmacionC) {
      this.mensajeConfirmacion = 'Las contraseñas no coinciden';
    }else{
      alert('registro exitoso(sin conexion a la base de datos')
    }
  
  }

  //solo escribir numeros en campo tel
  soloNumeros(event: any) {
    const valor = event.target.value;
    // solo deja pasar números
    event.target.value = valor.replace(/[^0-9]/g, '');
    this.tel = event.target.value;
  }
}

  
