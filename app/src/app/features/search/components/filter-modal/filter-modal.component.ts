import { Component, output } from '@angular/core';
import { FilterCriteria } from '../../interfaces/models';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.scss'
})
export class FilterModalComponent {
  close = output<void>();
  apply = output<FilterCriteria>();

  types = [
    'Hatch compacto', 'Hatch médio', 'SUV compacto', 'SUV médio', 
    'SUV grande', 'Crossover', 'Coupé', 'Picape leve', 
    'Picape leve-média', 'Picape média', 'Sedan Compacto', 'Minivan'
  ];
  
  engines = ['Motor 1.0', 'Motor 1.4', 'Motor 1.6', 'Motor 1.8', 'Motor 2.0'];
  sizesOptions = [2, 3, 4, 5, 6, 7];

  selectedTypes: string[] = ['Hatch médio']; 
  selectedEngines: string[] = ['Motor 1.0', 'Motor 1.6'];
  selectedSizes: number[] = [5, 7];

  toggleCategory(cat: string) {
    if (this.selectedTypes.includes(cat)) {
      this.selectedTypes = this.selectedTypes.filter(c => c !== cat);
    } else {
      this.selectedTypes.push(cat);
    }
  }

  toggleEngine(eng: string) {
    if (this.selectedEngines.includes(eng)) {
      this.selectedEngines = this.selectedEngines.filter(e => e !== eng);
    } else {
      this.selectedEngines.push(eng);
    }
  }

  toggleSeat(num: number) {
    if (this.selectedSizes.includes(num)) {
      this.selectedSizes = this.selectedSizes.filter(s => s !== num);
    } else {
      this.selectedSizes.push(num);
    }
  }

  onApply() {
    this.apply.emit({
      types: this.selectedTypes,
      engines: this.selectedEngines,
      size: this.selectedSizes
    });
  }

  onCancel() {
    this.close.emit();
  }
  
  onClear() {
    this.selectedTypes = [];
    this.selectedEngines = [];
    this.selectedSizes = [];
  }
}
