import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Exercise} from "../../utils/exercise";
import {Injectable} from "@angular/core";

@Injectable()
export class RecipesService {

  private readonly serverUrl;

  constructor(private httpClient: HttpClient) {
    this.serverUrl = `http://${environment.serverHost}:${environment.serverPort}`
  }

  public findAllRecipes() {
    let path = `${this.serverUrl}/dashboard/recipes`
    return this.httpClient.get<Exercise[]>(path, {observe: 'body',})
  }
}
