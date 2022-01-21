import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ExercisesService} from "../../commons/services/exercises.service";
import {Exercise} from "../../commons/utils/exercise";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-exercises-admin',
  templateUrl: './exercises-admin.component.html',
  styleUrls: ['./exercises-admin.component.css']
})
export class ExercisesAdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'exerciseType', 'delete'];
  data: Exercise[] = [];
  dataSource = new MatTableDataSource([])
  measurementForm = this.fb.group({
    name: ['', Validators.required],
    exerciseType: ['', Validators.required],
    description: ['', Validators.required]
  })

  constructor(private service: ExercisesService, private fb: FormBuilder) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.service.findAllExercises().subscribe(
      source => {
        this.data = source;
        this.dataSource = new MatTableDataSource<Exercise>(source);
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
    this.service.deleteExercise(id).subscribe(
      success => {
        this.data = this.data.filter(exercise => exercise.id != id);
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        alert(success);
      },
      err => alert(err.message)
    );
  }

  onSubmit() {
    let exercise: Exercise = {
      name: this.measurementForm.controls['name'].value,
      exerciseType: this.measurementForm.controls['exerciseType'].value,
      description: this.measurementForm.controls['description'].value
    };
    this.service.addExercise(exercise).subscribe(
      success => {
        this.data = [exercise, ...this.data]
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
      || this.measurementForm.controls['exerciseType'].hasError('required')
      || this.measurementForm.controls['description'].hasError('required'))
  }
}
