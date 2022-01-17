import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';

export interface PeriodicElement {
  weight: number;
  height: number;
  timestamp: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {timestamp: 'data', weight: 1, height: 1.0079},
  {timestamp: 'data', weight: 1, height: 4.0026},
  {timestamp: 'data', weight: 1, height: 6.941},
  {timestamp: 'data', weight: 1, height: 9.0122},
  {timestamp: 'data', weight: 1, height: 10.811},
  {timestamp: 'data', weight: 1, height: 12.0107},
  {timestamp: 'data', weight: 1, height: 14.0067},
  {timestamp: 'data', weight: 1, height: 15.9994},
  {timestamp: 'data', weight: 1, height: 18.9984},
  {timestamp: 'data', weight: 1, height: 20.1797},
];


@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent {
  /** Based on the screen size, switch from standard to one column per row */

  private resultsCardTitle = 'Twoje rezultaty';
  private exerciseName = 'Ćwiczenie na dziś';
  private recipeName = 'Przepis na dziś';

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return [
          {title: this.resultsCardTitle, subtitle: "", cols: 2, rows: 1, content: 'rezultaty'},
          {title: this.exerciseName, subtitle: "nazwa", cols: 2, rows: 1, content: 'opis'},
          {title: this.recipeName, subtitle: "nazwa", cols: 2, rows: 1, content: 'opis'},
        ];
      }

      return [
        {title: this.resultsCardTitle, cols: 1, rows: 2, content: 'rezultaty'},
        {title: this.exerciseName, subtitle: "nazwa", cols: 1, rows: 1, content: 'opis'},
        {title: this.recipeName, subtitle: "nazwa", cols: 1, rows: 1, content: 'opis'},
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  columns = [
    {
      columnDef: 'timestamp',
      header: 'Data',
      cell: (element: PeriodicElement) => `${element.timestamp}`,
    },
    {
      columnDef: 'weight',
      header: 'Waga',
      cell: (element: PeriodicElement) => `${element.weight}`,
    },
    {
      columnDef: 'height',
      header: 'Wzrost',
      cell: (element: PeriodicElement) => `${element.height}`,
    },
    {
      columnDef: 'bmi',
      header: 'BMI',
      cell: (element: PeriodicElement) => `${element.weight * element.height}`,
    },
  ];
  dataSource = ELEMENT_DATA;
  displayedColumns = this.columns.map(c => c.columnDef);

}
