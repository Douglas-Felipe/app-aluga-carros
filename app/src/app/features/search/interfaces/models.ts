export interface Car {
  name: string;
  year: number;
  type: string;
  engine: string;
  size: number;
  imageUrl: string;
}

export interface FilterCriteria {
  types: string[];
  engines: string[];
  size: number[];
}