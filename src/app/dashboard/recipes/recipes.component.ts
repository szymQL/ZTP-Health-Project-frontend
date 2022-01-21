import {Component, OnInit, ViewChild} from '@angular/core';
import {combineLatest} from "rxjs";
import {RecipesService} from "../../commons/services/recipes.service";
import {map} from "rxjs/operators";
import {Recipe} from "../../commons/utils/recipe";
import {Exercise} from "../../commons/utils/exercise";
import {MatTableDataSource} from "@angular/material/table";
import {ExercisesService} from "../../commons/services/exercises.service";
import {MatPaginator} from "@angular/material/paginator";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class RecipesComponent implements OnInit {

  displayedColumns: { def: string, name: string }[] = [{def: 'name', name: 'Nazwa'}, {def: 'recipeType', name: 'Typ'}];
  data: Recipe[] = [];
  dataSource = new MatTableDataSource([]);
  expandedElement: Recipe | null;

  constructor(private service: RecipesService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.service.findAllRecipes().subscribe(
      source => {
        this.data = source;
        this.dataSource = new MatTableDataSource<Recipe>(source);
        this.paginator._intl.itemsPerPageLabel = 'Przepisów na stronę: ';
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

  getRecipeDescription(recipe: Recipe) {
    return `Składniki:\n${recipe.ingredients}\nPrzygotowanie:\n${recipe.preparation}\nPorcje: ${recipe.portions}\nMakro (na porcję): ${recipe.nutrients}`
  }

}
