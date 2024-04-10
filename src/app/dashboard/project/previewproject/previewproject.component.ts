import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../core/project.service';
import { DatePipe } from '@angular/common';
import { KanbanComponent } from './kanban/kanban.component';

@Component({
  selector: 'app-previewproject',
  standalone: true,
  imports: [DatePipe,KanbanComponent],
  templateUrl: './previewproject.component.html',
  styleUrl: './previewproject.component.css'
})
export class PreviewprojectComponent implements OnInit {
  
   id : any ; 
   project : any ; 



  constructor( private activatedRoute : ActivatedRoute , private projectService:ProjectService  ){}
  
  ngOnInit(): void {
    
    this.getproject() ; 
  }







getproject(){
  this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.projectService.getprojectById(this.id).subscribe({
      next: (res: any)=>{
        this.project = res ; 
      },error :(err)=>{console.log('error geting the project from back : '+err);
      }
    });
}










}
