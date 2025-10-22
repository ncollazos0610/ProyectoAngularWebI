import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',    
  standalone: true,           // Nombre del componente (debe coincidir con lo que usarás en HTML)
  templateUrl: './registro.component.html', 
  imports: [CommonModule, RouterModule],// Ruta del archivo HTML
  styleUrls: ['./registro.component.css']   // Ruta del archivo CSS
})
export class RegistroComponent {
  // Aquí irá la lógica del formulario o funciones del componente
}
