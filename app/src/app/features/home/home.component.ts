import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
userName = 'Marcos Silva';
  userPhotoUrl = 'assets/user-profile.jpg'; // Substitua pelo caminho real

  // Dados mockados para o carrossel
  latestReservations = [
    {
      name: 'Mini Cooper',
      year: 2021,
      category: 'Hatch compacto',
      engine: 'Motor 1.8',
      seats: 5,
      // Substitua por imagens reais na sua pasta assets
      imageUrl: 'assets/cars/mini-cooper.png' 
    },
    {
      name: 'Jeep Compass',
      year: 2022,
      category: 'SUV Médio',
      engine: 'Motor 1.3 T270',
      seats: 7,
      imageUrl: 'assets/cars/jeep-compass.png'
    },
    // Adicionei mais um para testar a rolagem
    {
      name: 'Fiat Toro',
      year: 2023,
      category: 'Picape',
      engine: 'Motor 2.0 Diesel',
      seats: 5,
      imageUrl: 'assets/cars/fiat-toro.png'
    }
  ];
}
