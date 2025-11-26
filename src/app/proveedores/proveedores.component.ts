import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  products: string[];
  lastOrder: string;
  status: 'Activo' | 'Pendiente';
  rating: number;
}

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})

export class ProveedoresComponent implements OnInit {
  suppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];
  searchTerm: string = '';

  // Modal
  isModalOpen: boolean = false;

  //variables para nuevoModalPedidos
  selectedSupplier: Supplier | null = null;
  orderData: any = {};
  isOrderModalOpen: boolean = false;


  // Nuevo proveedor temporal
  newSupplier: any = {
    name: '',
    email: '',
    phone: '',
    address: '',
    productsText: '',
  };

  ngOnInit(): void {
    // Datos iniciales simulados
    this.suppliers = [
      {
        id: 1,
        name: 'Herbal Life Colombia',
        email: 'contacto@herbalcol.com',
        phone: '+57 3124567890',
        address: 'Calle 12 #45-23, Bogotá',
        products: ['Suplementos', 'Proteínas', 'Té verde'],
        lastOrder: '2025-10-12',
        status: 'Activo',
        rating: 4.5
      },
      {
        id: 2,
        name: 'Distribuciones Naturales S.A.',
        email: 'ventas@disnat.com',
        phone: '+57 3109876543',
        address: 'Carrera 7 #22-10, Cali',
        products: ['Aceites esenciales', 'Vitaminas'],
        lastOrder: '2025-09-05',
        status: 'Pendiente',
        rating: 3.8
      },
      {
        id: 3,
        name: 'Verde Salud',
        email: 'info@verdesalud.com',
        phone: '+57 3014561234',
        address: 'Av. Panamericana #10-50, Popayán',
        products: ['Jarabes naturales', 'Cápsulas vegetales'],
        lastOrder: '2025-11-02',
        status: 'Activo',
        rating: 4.9
      }
    ];

    this.filteredSuppliers = [...this.suppliers];
  }

  filterSuppliers(): void {
    const term = this.searchTerm.toLowerCase();

    if(term ===''){
      this.filteredSuppliers =[...this.suppliers];
      return;
    }

    this.filteredSuppliers = this.suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(term) ||
      supplier.products.some(p => p.toLowerCase().includes(term))
    );
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetForm();
  }

  closeModalOnOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal')) {
      this.closeModal();
    }
  }

  addSupplier(): void {
    if (!this.newSupplier.name || !this.newSupplier.email || !this.newSupplier.phone) {
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    const newId = this.suppliers.length > 0 ? Math.max(...this.suppliers.map(s => s.id)) + 1 : 1;

    const supplier: Supplier = {
      id: newId,
      name: this.newSupplier.name.trim(),
      email: this.newSupplier.email.trim(),
      phone: this.newSupplier.phone.trim(),
      address: this.newSupplier.address?.trim() || '',
      products: this.newSupplier.productsText
        ? this.newSupplier.productsText.split(',').map((p: string) => p.trim()).filter((p: string) => p)
        : [],
      lastOrder: '—',
      status: 'Pendiente',
      rating: 0
    };

    this.suppliers.push(supplier);
    this.filterSuppliers();
    this.closeModal();
  }

  deleteSupplier(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este proveedor?')) {
      this.suppliers = this.suppliers.filter(s => s.id !== id);
      this.filterSuppliers();
    }
  }

  contactSupplier(email: string): void {
    window.location.href = `mailto:${email}`;
  }

  newOrder(id: number): void {
    const supplier = this.suppliers.find(s => s.id === id);
    if (!supplier) return;
    
      this.selectedSupplier = supplier;

  this.orderData = {
    date: new Date().toISOString().substring(0, 10),
    quantities: supplier.products.reduce((acc, p) => {
      acc[p] = 0;
      return acc;
    }, {} as any)
  };

  this.isOrderModalOpen = true;

  }

  getActiveCount(): number {
    return this.suppliers.filter(s => s.status === 'Activo').length;
  }

  getPendingCount(): number {
    return this.suppliers.filter(s => s.status === 'Pendiente').length;
  }

  getAverageRating(): string {
    if (this.suppliers.length === 0) return '0';
    const total = this.suppliers.reduce((sum, s) => sum + s.rating, 0);
    return (total / this.suppliers.length).toFixed(1);
  }

  getRatingStars(rating: number): string {
    const filled = '★'.repeat(Math.round(rating));
    const empty = '☆'.repeat(5 - Math.round(rating));
    return filled + empty;
  }

  confirmOrder(): void {
  if (!this.selectedSupplier) return;

  this.selectedSupplier.lastOrder = this.orderData.date;

  alert("Pedido registrado con éxito.");

  this.isOrderModalOpen = false;
  }

  closeOrderModal(event: MouseEvent): void {
  if ((event.target as HTMLElement).classList.contains('modal')) {
    this.isOrderModalOpen = false;
    }
  }

  private resetForm(): void {
    this.newSupplier = {
      name: '',
      email: '',
      phone: '',
      address: '',
      productsText: ''
    };
  }
}