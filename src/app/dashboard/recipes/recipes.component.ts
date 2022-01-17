import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {Observable} from "rxjs";
import {ExercisesService} from "../services/exercises.service";
import {RecipesService} from "../services/recipes.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {

  recipesAsTiles: { id: number, title: string, subtitle: string, description: string, cols: number, rows: number }[] = [];
  recipesAsCards: Observable<{ title: string; subtitle: string; description: string; cols: number; rows: number; }[]>;

  constructor(private breakpointObserver: BreakpointObserver, private service: RecipesService) {
    this.service.findAllRecipes().subscribe((recipes) => {
      for (let recipe of recipes) {
        this.recipesAsTiles.push({
          id: recipe.id,
          title: recipe.name,
          subtitle: recipe.exerciseType,
          description: recipe.description,
          cols: 1,
          rows: 1
        })
      }
    })
    this.recipesAsCards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({matches}) => {
        return this.recipesAsTiles
      })
    )
  }
}
