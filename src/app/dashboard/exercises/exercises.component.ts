import {Component, OnInit, ViewChild} from '@angular/core';
import {map} from 'rxjs/operators';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
import {ExercisesService} from "../../commons/services/exercises.service";
import {Exercise} from "../../commons/utils/exercise";
import {combineLatest, Observable} from 'rxjs';
import {Recipe} from "../../commons/utils/recipe";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, Validators} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ExercisesComponent implements OnInit {

  displayedColumns: { def: string, name: string }[] = [{def: 'name', name: 'Nazwa'}, {def: 'exerciseType', name: 'Typ'}];
  data: Exercise[] = [];
  dataSource = new MatTableDataSource([]);
  expandedElement: Exercise | null;

  constructor(private service: ExercisesService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.service.findAllExercises().subscribe(
      source => {
        this.data = source;
        this.dataSource = new MatTableDataSource<Exercise>(source);
        this.paginator._intl.itemsPerPageLabel = 'Ćwiczeń na stronę: ';
        this.dataSource.paginator = this.paginator;
      },
      err => alert(err.message)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getHeaderDef() {
    return this.displayedColumns.map(column => {
      return column.def
    })
  }

}
