import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.component.html',
  imports: [CommonModule, RouterModule],
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

}

