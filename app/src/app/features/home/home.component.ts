import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Car } from '../search/interfaces/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userName = 'Marcos Silva';
  userPhotoUrl = 'assets/user-profile.png';

  latestReservations: Car[] = [
    {
      name: 'Mini Cooper',
      year: 2021,
      type: 'Hatch compacto',
      engine: 'Motor 1.8',
      size: 5,
      imageUrl: 'assets/cars/0.png' 
    },
    {
      name: 'Jeep Compass',
      year: 2022,
      type: 'SUV Médio',
      engine: 'Motor 1.3 T270',
      size: 7,
      imageUrl: 'assets/cars/1.png'
    },
    {
      name: 'Fiat Toro',
      year: 2023,
      type: 'Picape',
      engine: 'Motor 2.0 Diesel',
      size: 5,
      imageUrl: 'assets/cars/2.png'
    }
  ];
}
