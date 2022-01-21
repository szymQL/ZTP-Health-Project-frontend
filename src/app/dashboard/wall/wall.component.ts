import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {ExercisesService} from "../../commons/services/exercises.service";
import {RecipesService} from "../../commons/services/recipes.service";
import {UserDetailsService} from "../../commons/services/user-details.service";
import {UserWeights} from "../../commons/utils/user-weights";
import {FormBuilder} from "@angular/forms";
import {combineLatest} from "rxjs";
import {CustomDataSource} from "../../commons/utils/custom-data-source";

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  private resultsCardTitle = 'Twoje rezultaty';
  private exerciseName = 'Ćwiczenie na dziś';
  private recipeName = 'Przepis na dziś';
  cards: any;
  weights: UserWeights[] = [];
  dataSource: any;

  measurementForm = this.fb.group({
    weight: 0
  })


  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private eservice: ExercisesService, private rservice: RecipesService, private uservice: UserDetailsService) {

  }

  ngOnInit() {
    this.uservice.getUserWeights().subscribe( data => {
      this.weights = data;
      this.weights.sort((a, b) => (new Date(a.createDate as string) < new Date(b.createDate as string)) ? 1 : -1)
      this.dataSource = new CustomDataSource<UserWeights>([...this.weights]);
      this.cdr.detectChanges()
    })

    this.cards = combineLatest([this.eservice.findExerciseForWall(), this.rservice.findRecipeForWall()]).pipe(
      map(([exercise, recipe]) => {
        return [
          {title: this.resultsCardTitle, cols: 1, rows: 2, name: '', description: '' },
          {title: this.exerciseName, cols: 1, rows: 2, name: exercise.name, description: exercise.description },
          {title: this.recipeName, cols: 2, rows: 2, name: recipe.name, description: `Składniki:\n${recipe.ingredients}\nPrzygotowanie:\n${recipe.preparation}` },
        ];
      })
    )
  }

  columns = [
    {
      columnDef: 'timestamp',
      header: 'Data',
      cell: (element: UserWeights) => `${new Date(element.createDate as string).toDateString()}`,
    },
    {
      columnDef: 'weight',
      header: 'Waga',
      cell: (element: UserWeights) => `${element.weight}kg`,
    }
  ];
  displayedColumns = this.columns.map(c => c.columnDef);

  onSubmit() {
    let weight = this.measurementForm.controls['weight'].value
    this.uservice.updateWeights(weight).subscribe(
      success => {
        this.weights = [{id: 0, weight: weight, createDate: new Date().toISOString()}, ...this.weights]
        this.dataSource.setData(this.weights)
        alert(success)},
    err => {
        alert(err.error)
    })
    this.measurementForm.reset()
  }

}


