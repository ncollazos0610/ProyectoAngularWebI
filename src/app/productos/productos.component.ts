import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

interface Producto {
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
  descuento: number;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.component.html',
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [];
  textoBusqueda: string = '';
  categoriaSeleccionada: string = 'Todas las categorías';

  // 🛒 CARRITO
  carrito: any[] = [];
  mostrarCarrito: boolean = false;

  // ✅ Inyectamos HttpClient en el constructor
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // ✅ Evitar error en SSR: solo ejecuta si está en el navegador
    if (typeof window !== 'undefined') {
      this.cargarProductos();
      // 🛒 Cargar carrito desde localStorage
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        this.carrito = JSON.parse(carritoGuardado);
      }
    }
  }

  cargarProductos() {
    this.http.get<Producto[]>('/productos.json').subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
        this.productosFiltrados = data;
      },
      error: (err: any) => {
        console.error('Error al cargar productos:', err);
      },
    });
  }

  // ✅ Método para filtrar productos según texto y categoría
  filtrarProductos() {
    const texto = this.textoBusqueda.toLowerCase();
    const categoria = this.categoriaSeleccionada;

    this.productosFiltrados = this.productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(texto) &&
        (categoria === 'Todas las categorías' || p.categoria === categoria)
    );
  }
   // 🛒 ABRIR / CERRAR CARRITO
  toggleCarrito() {
    this.mostrarCarrito = !this.mostrarCarrito;
  }
  // 🛒 AÑADIR AL CARRITO
  agregarAlCarrito(producto: Producto) {
    const existe = this.carrito.find((item) => item.nombre === producto.nombre);

    if (existe) {
      existe.cantidad++;
    } else {
      this.carrito.push({
        ...producto,
        cantidad: 1
      });
    }

    this.guardarCarrito();
  }
    // 💾 Guardar en localStorage
  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  // 💰 Calcular total
  getTotal() {
    return this.carrito.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    )
  };

}
