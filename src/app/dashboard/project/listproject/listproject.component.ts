import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../../core/project.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-listproject',
  standalone: true,
  imports: [RouterModule,DatePipe],
  templateUrl: './listproject.component.html',
  styleUrl: './listproject.component.css',
})
export class ListprojectComponent implements OnInit {
  projects: any;
   
  constructor(private _project: ProjectService  ) {}

  ngOnInit(): void {
    this.getprojects();

  }

  getprojects() {
    this._project.getprojects().subscribe({
      next: (res) => {
        console.log(res);
        this.projects = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  delete(id: any) {
    Swal.fire({
      position: 'center',
      title: 'Do you want to delete this project',
      showDenyButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this._project.deleteproject(id).subscribe({
          next: (res) => {
            console.log(res);
            Swal.fire('Deleted!');
            this.ngOnInit();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }




  //end of project doc
}
