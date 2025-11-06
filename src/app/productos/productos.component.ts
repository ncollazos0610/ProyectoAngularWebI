import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.component.html',
  imports: [CommonModule, RouterModule, FormsModule],
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [];
  textoBusqueda: string = '';
  categoriaSeleccionada: string = 'Todas las categorías';

  ngOnInit() {
    // Cargar el JSON desde la carpeta public/
    fetch('./productos.json')
      .then(res => res.json())
      .then(data => {
        this.productos = data;
        this.productosFiltrados = data;
      })
      .catch(err => console.error('Error al cargar productos:', err));
  }

  // Método para filtrar productos según el texto y la categoría
  filtrarProductos() {
    const texto = this.textoBusqueda.toLowerCase();
    const categoria = this.categoriaSeleccionada;

    this.productosFiltrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(texto) &&
      (categoria === 'Todas las categorías' || p.categoria === categoria)
    );
  }
}
