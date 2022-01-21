import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersAdminService} from "../../commons/services/users-admin.service";
import {User} from "../../commons/utils/response";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {

  displayedColumns: string[] = ['id', 'email', 'firstName', 'delete'];
  data: User[] = [];
  dataSource = new MatTableDataSource([]);

  constructor(private service: UsersAdminService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.service.getAllUsers().subscribe(
      source => {
        this.data = source;
        this.dataSource = new MatTableDataSource<User>(source);
        this.paginator._intl.itemsPerPageLabel = 'Użytkowników na stronę: '
        this.dataSource.paginator = this.paginator;
      },
      err => alert(err.message)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(id: number) {
    this.service.deleteUser(id).subscribe(
      success => alert(success),
      err => alert(err.message)
    );
    this.data = this.data.filter(user => user.id != id);
    this.dataSource = new MatTableDataSource(this.data);
  }

}
