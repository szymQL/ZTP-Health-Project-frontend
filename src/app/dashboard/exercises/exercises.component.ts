import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
import {ExercisesService} from "../services/exercises.service";
import {Exercise} from "../../utils/exercise";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})
export class ExercisesComponent {
  exercisesAsTiles: { id: number, title: string, subtitle: string, description: string, cols: number, rows: number }[] = [];
  exercisesAsCards: Observable<{ title: string; subtitle: string; description: string; cols: number; rows: number; }[]> = new Observable();
  constructor(private breakpointObserver: BreakpointObserver, private service: ExercisesService) {
    service.findAllExercises();
    /*this.service.findAllExercises().subscribe((exercises) => {
      for (let exercise of exercises) {
        this.exercisesAsTiles.push({
          id: exercise.id,
          title: exercise.name,
          subtitle: exercise.exerciseType,
          description: exercise.description,
          cols: 1,
          rows: 1
        })
      }
    })
    this.exercisesAsCards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({matches}) => {
        return this.exercisesAsTiles
      })
    )*/
  }
}
