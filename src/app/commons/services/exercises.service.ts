import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Exercise} from "../utils/exercise";
import {LocalStorageService} from "../../navigation/services/local-storage.service";

@Injectable()
export class ExercisesService {

  private readonly headers;
  private readonly postHeaders;
  private readonly serverUrl;

  constructor(private httpClient: HttpClient, private lservice: LocalStorageService) {
    this.serverUrl = `http://${environment.serverHost}:${environment.serverPort}`;
    this.headers = new HttpHeaders({Authorization: `Bearer ${lservice.get('token')}`});
    this.postHeaders = new HttpHeaders()
      .set('Authorization', `Bearer ${lservice.get('token')}`)
      .set('Content-Type', 'application/json');
  }

  public findExerciseForWall() {
    let day = new Date().getUTCDate();
    let path = `${this.serverUrl}/dashboard/exercises/id/${day}`;
    return this.httpClient.get<Exercise>(path, {observe: 'body', headers: this.headers, responseType: 'json'});
  }

  public findAllExercises() {
    let path = `${this.serverUrl}/dashboard/exercises`;
    return this.httpClient.get<Exercise[]>(path, {observe: 'body', headers: this.headers, responseType: 'json'});
  }

  public deleteExercise(id: number) {
    let path = `${this.serverUrl}/dashboard/exercises/${id}`;
    return this.httpClient.delete(path, {observe: 'body', headers: this.headers, responseType: 'text'});
  }

  public addExercise(exercise: Exercise) {
    let exerciseAsJSON = JSON.stringify(exercise);
    let path = `${this.serverUrl}/dashboard/exercises`;
    return this.httpClient.post(path, exerciseAsJSON, {observe: 'body', headers: this.postHeaders, responseType: 'text'});
  }

}
