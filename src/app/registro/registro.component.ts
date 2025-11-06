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


// la logica del formulario o funciones del componente
export class RegistroComponent {
  nombre = "";
  email = "";
  tel = "";
  password = "";
  confirmacionC = "";

  mensajeError = "";
  mensajeNombre = "";
  mensajeCorreo = "";
  mensajeTel = "";
  mensajePassword = "";
  mensajeConfirmacion = "";

  guardarRegistro(): void {
    // Limpiar mensajes
    this.mensajeError = this.mensajeNombre = this.mensajeCorreo =
    this.mensajeTel = this.mensajePassword = this.mensajeConfirmacion = "";

    let camposVacios = 0;

    // Validaciones individuales
    if (!this.nombre.trim()) {
      this.mensajeNombre = "Por favor ingresar el nombre";
      camposVacios++;
    }

    if (!this.email.trim()) {
      this.mensajeCorreo = "Por favor ingresar el correo";
      camposVacios++;
    } else if (!/^\S+@.*$/.test(this.email)) {
      this.mensajeCorreo = "El correo debe tener una palabra seguida de @ (ejemplo: juan@)";
    }

    if (!this.tel.trim()) {
      this.mensajeTel = "Por favor ingresar el telefono";
      camposVacios++;
    }

    if (!this.password.trim()) {
      this.mensajePassword = "Por favor ingresar la contraseña";
      camposVacios++;
    }

    if (!this.confirmacionC.trim()) {
      this.mensajeConfirmacion = "Por favor confirmar la contraseña";
      camposVacios++;
    } else if (this.password !== this.confirmacionC) {
      this.mensajeConfirmacion = "Las contraseñas no coinciden";
    }

    // Si hay mas de un campo vacio, mostrar mensaje general
    if (camposVacios > 1) {
      this.mensajeError = "Por favor completar todos los campos";
      return;
    }

    // Si no hay errores, mensaje de bien
    if (
      !this.mensajeNombre &&
      !this.mensajeCorreo &&
      !this.mensajeTel &&
      !this.mensajePassword &&
      !this.mensajeConfirmacion
    ) {
      alert("Registro exitoso (sin conexión a la base de datos)");
    }
  }

  soloNumeros(event: any): void {
    const valor = event.target.value.replace(/[^0-9]/g, "");
    event.target.value = valor;
    this.tel = valor;
  }
}



  
