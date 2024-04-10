import { Component, OnInit, ViewChild } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UserService } from '../../core/user.service';
import { ProjectService } from '../../core/project.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
} from 'ng-apexcharts';
import { BoardService } from '../../core/board.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public user: any;
  public projects: any;
  public users: any;
  public boards: any;
  public completed = 0;
  public inprogress = 0;
  public inhold = 0;
  public backlog = 0;

  public history: any; // used for apex chart

  constructor(
    private userservice: UserService,
    private projectservice: ProjectService,
    private boardservice: BoardService
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Backlog',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
        {
          name: 'In Progress',
          data: [25, 20, 10, 33, 4, 8, 28, 25, 66],
        },
        {
          name: 'Completed',
          data: [40, 50, 20, 15, 28, 8, 16, 40, 5],
        },
        {
          name: 'In Hold',
          data: [1, 4, 3, 14, 4, 4, 6, 8, 12],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Task Evolution By Month',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ],
      },
    };
  }

  ngOnInit() {

    //history ready to be used by chart TODO 
    this.gethistory();
    this.getActiveUser();
    this.getprojectsnumber();
    this.getUserNumber();
    this.getboard();
    this.countTasks(this.boards);
    
    
    
  }

  getActiveUser() {
    this.userservice.getUserById('6611482a95ea0c5a9af704a4').subscribe({
      next: (res) => {
        this.user = res;        
      },
    });
  }

  getUserNumber() {
    this.userservice.getUsers().subscribe({
      next: (res) => {
        this.users = res;
        console.log(res);
      },
    });
  }

  getprojectsnumber() {
    this.projectservice.getprojects().subscribe({
      next: (res) => {
        this.projects = res;
      },
    });
  }

  getboard() {
    this.boardservice.getboards().subscribe({
      next: (res) => {
        this.boards = res;
        console.log(res);
      },
    });
  }

  countTasks(data: any) {
    let completed = 0;
    let inprogress = 0;
    let backlog = 0;
    let inhold = 0;

    data.forEach((item: any) => {
      completed += item.completed.length;
      inprogress += item.inprogress.length;
      backlog += item.backlog.length;
      inhold += item.inhold.length;
    });

    this.completed = completed;
    this.backlog = backlog;
    this.inhold = inhold;
    this.inprogress = inprogress;
  }

  gethistory() {    
    this.boardservice.gethistoiry().subscribe({
      next: (res) => {
        
        this.history = res;
        console.log('history get from back is : '+(res));
      }
     
    });
  }

  //end
}
