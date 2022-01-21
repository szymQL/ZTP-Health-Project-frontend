import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
import {ExercisesService} from "../../commons/services/exercises.service";
import {Exercise} from "../../commons/utils/exercise";
import {combineLatest, Observable} from 'rxjs';
import {Recipe} from "../../commons/utils/recipe";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent implements OnInit {

  exercisesAsCards: any;

  constructor(private breakpointObserver: BreakpointObserver, private service: ExercisesService) {
  }

  ngOnInit() {
    this.exercisesAsCards = combineLatest([this.service.findAllExercises()]).pipe(
      map(([exercises]) => {
        return exercises.map(this.toCard)
      })
    )
  }

  private toCard(exercise: Exercise) {
    return {title: exercise.name, description: exercise.description}
  }

}
