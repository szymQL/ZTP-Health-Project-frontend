import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, Validators} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {RecipesService} from "../../commons/services/recipes.service";
import {Recipe} from "../../commons/utils/recipe";

@Component({
  selector: 'app-recipes-admin',
  templateUrl: './recipes-admin.component.html',
  styleUrls: ['./recipes-admin.component.css']
})
export class RecipesAdminComponent {
  displayedColumns: string[] = ['id', 'name', 'recipeType', 'delete'];
  data: Recipe[] = [];
  dataSource = new MatTableDataSource([])
  measurementForm = this.fb.group({
    name: ['', Validators.required],
    ingredients: ['', Validators.required],
    preparation: ['', Validators.required],
    nutrients: ['', Validators.required],
    portions: ['', Validators.required],
    recipeType: ['', Validators.required],
  })

  constructor(private service: RecipesService, private fb: FormBuilder) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.service.findAllRecipes().subscribe(
      source => {
        this.data = source;
        this.dataSource = new MatTableDataSource<Recipe>(source);
        this.paginator._intl.itemsPerPageLabel = 'Ćwiczeń na stronę: '
        this.dataSource.paginator = this.paginator;
      },
      err => alert(err.message)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteExercise(id: number) {
    this.service.deleteRecipe(id).subscribe(
      success => {
        this.data = this.data.filter(recipe => recipe.id != id);
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        alert(success);
      },
      err => alert(err.message)
    );
  }

  onSubmit() {
    let recipe: Recipe = {
      name: this.measurementForm.controls['name'].value,
      ingredients: this.measurementForm.controls['ingredients'].value,
      preparation: this.measurementForm.controls['preparation'].value,
      nutrients: this.measurementForm.controls['nutrients'].value,
      portions: this.measurementForm.controls['portions'].value,
      recipeType: this.measurementForm.controls['recipeType'].value,
    };
    this.service.addRecipe(recipe).subscribe(
      success => {
        this.data = [recipe, ...this.data]
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.measurementForm.reset();
        alert(success);
      },
      err => alert(err.message)
    )
  }

  isDisabled() {
    return (this.measurementForm.controls['name'].hasError('required')
      || this.measurementForm.controls['ingredients'].hasError('required')
      || this.measurementForm.controls['preparation'].hasError('required')
      || this.measurementForm.controls['nutrients'].hasError('required')
      || this.measurementForm.controls['portions'].hasError('required')
      || this.measurementForm.controls['recipeType'].hasError('required'))
  }
}
