import { Component } from '@angular/core';
import { Car, FilterCriteria } from './interfaces/models';
import { FilterModalComponent } from "./components/filter-modal/filter-modal.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FilterModalComponent, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  isFilterVisible = true;

  allCars: Car[] = [
    {
      "name": "Partner",
      "year": 2016,
      "type": "Utilitário",
      "engine": "1.6",
      "size": 2,
      "imageUrl": "assets/cars/0.png"
    },
    {
      "name": "Fiorino",
      "year": 2017,
      "type": "Utilitário leve",
      "engine": "1.6",
      "size": 2,
      "imageUrl": "assets/cars/1.png"
    },
    {
      "name": "Doblo",
      "year": 2018,
      "type": "Minivan",
      "engine": "1.8",
      "size": 7,
      "imageUrl": "assets/cars/2.png"
    },
    {
      "name": "Toro",
      "year": 2016,
      "type": "Picape média",
      "engine": "1.6",
      "size": 5,
      "imageUrl": "assets/cars/3.png"
    },
    {
      "name": "Ford Ká",
      "year": 2019,
      "type": "Sedan Compacto",
      "engine": "1.0",
      "size": 5,
      "imageUrl": "assets/cars/4.png"
    },
    {
      "name": "Versa",
      "year": 2019,
      "type": "Sedan médio",
      "engine": "1.4",
      "size": 5,
      "imageUrl": "assets/cars/5.png"
    },
    {
      "name": "Jetta",
      "year": 2021,
      "type": "Sedan grande",
      "engine": "2.0",
      "size": 5,
      "imageUrl": "assets/cars/6.png"
    },
    {
      "name": "Saveiro",
      "year": 2018,
      "type": "Picape leve-média",
      "engine": "1.6",
      "size": 5,
      "imageUrl": "assets/cars/7.png"
    },
    {
      "name": "Strada",
      "year": 2016,
      "type": "Picape leve",
      "engine": "1.4",
      "size": 2,
      "imageUrl": "assets/cars/8.png"
    },
    {
      "name": "Camaro",
      "year": 2017,
      "type": "Coupé",
      "engine": "2.0",
      "size": 4,
      "imageUrl": "assets/cars/9.png"
    },
    {
      "name": "T-Cross",
      "year": 2020,
      "type": "Crossover",
      "engine": "1.6",
      "size": 5,
      "imageUrl": "assets/cars/10.png"
    },
    {
      "name": "Tiggo 8",
      "year": 2021,
      "type": "SUV Grande",
      "engine": "2.0",
      "size": 7,
      "imageUrl": "assets/cars/11.png"
    }
  ];

  displayedCars: Car[] = [];

  ngOnInit() {
    this.displayedCars = [...this.allCars];
  }

  handleFilterApply(criteria: FilterCriteria) {
    console.log('Filtros aplicados:', criteria);

    this.displayedCars = this.allCars.filter(car => {
      const matchCategory = criteria.types.length === 0 || criteria.types.includes(car.type);
      const matchEngine = criteria.engines.length === 0 || criteria.engines.includes(car.engine);
      const matchSeats = criteria.size.length === 0 || criteria.size.includes(car.size);

      return matchCategory && matchEngine && matchSeats;
    });

    this.isFilterVisible = false;
  }

  handleClose() {
    this.isFilterVisible = false;
  }

  openFilterAgain() {
    this.isFilterVisible = true;
  }
}
