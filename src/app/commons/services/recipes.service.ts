import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {LocalStorageService} from "../../navigation/services/local-storage.service";
import {Recipe} from "../utils/recipe";

@Injectable()
export class RecipesService {

  private readonly headers;
  private readonly postHeaders;
  private readonly serverUrl;

  constructor(private httpClient: HttpClient, lservice: LocalStorageService) {
    this.serverUrl = `http://${environment.serverHost}:${environment.serverPort}`
    this.headers = new HttpHeaders({Authorization: `Bearer ${lservice.get('token')}`});
    this.postHeaders = new HttpHeaders()
      .set('Authorization', `Bearer ${lservice.get('token')}`)
      .set('Content-Type', 'application/json');
  }

  public findRecipeForWall() {
    let day = (new Date().getUTCDate() % 13) + 1;
    let path = `${this.serverUrl}/dashboard/recipes/id/${day}`;
    return this.httpClient.get<Recipe>(path, {observe: 'body', headers: this.headers, responseType: 'json'});
  }

  public findAllRecipes() {
    let path = `${this.serverUrl}/dashboard/recipes`
    return this.httpClient.get<Recipe[]>(path, {observe: 'body', headers: this.headers, responseType: 'json'})
  }

  public deleteRecipe(id: number) {
    let path = `${this.serverUrl}/dashboard/recipes/${id}`;
    return this.httpClient.delete(path, {observe: 'body', headers: this.headers, responseType: 'text'});
  }

  public addRecipe(recipe: Recipe) {
    let recipeAsJSON = JSON.stringify(recipe);
    let path = `${this.serverUrl}/dashboard/recipes`;
    return this.httpClient.post(path, recipeAsJSON, {observe: 'body', headers: this.postHeaders, responseType: 'text'});
  }
}
