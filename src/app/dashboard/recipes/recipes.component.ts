import {Component, OnInit} from '@angular/core';
import {combineLatest} from "rxjs";
import {RecipesService} from "../../commons/services/recipes.service";
import {map} from "rxjs/operators";
import {Recipe} from "../../commons/utils/recipe";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipesAsCards: any;

  constructor(private service: RecipesService) {
  }

  ngOnInit() {
    this.recipesAsCards = combineLatest([this.service.findAllRecipes()]).pipe(
      map(([recipes]) => {
        return recipes.map(this.toCard)
      })
    )
  }

  private toCard(recipe: Recipe) {
    return {title: recipe.name, description: `Składniki:\n${recipe.ingredients}\nPrzygotowanie:\n${recipe.preparation}`}
  }

}
