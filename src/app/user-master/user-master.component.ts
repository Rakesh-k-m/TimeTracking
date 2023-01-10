import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
// import { Chart } from 'chart.js';
// import { registerables } from 'chart.js';
// Chart.register(...registerables);

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  
  styleUrls: ['./user-master.component.css'],
})
export class UserMasterComponent implements OnInit {
  userList: any[]=[]
  userDataSource:any[]=[]
  constructor(private httpClient: HttpClient) {
  this.getData();
  
  }

  ctx :any;
  config: any;
  chartData:number[] = [];
  chartDatalabels : any [] = [];
  ngOnInit(): void {

    this.chartData.push(1);
    this.chartData.push(2);
    this.chartData.push(3);

    this.chartDatalabels.push('A');
    this.chartDatalabels.push('B');
    this.chartDatalabels.push('C');

    this.ctx = document.getElementById('myChart');
    this.config = {
      type: 'pie',
      options :{

      },
      data:{
        labels:this.chartDatalabels,
        datasets: [{
          label:'Chart Data',
          data: this.chartData,
        }],
      }
    }
// const myChart = new Chart(this.ctx, this.config);
   }

  // how to change the null value as anonymous in angular?
  sumObj() {
    let newArr: any[] = [];
    console.log('userList',this.userList);
    
    this.userList.forEach((obj:any) => {
      
      if(obj.EmployeeName in newArr) {
        let totalHours=this.dateDiff(obj);
        newArr[obj.EmployeeName] += totalHours;
      }else {
        let totalHours=this.dateDiff(obj);
        newArr[obj.EmployeeName] = totalHours;
      }
    });
    for(var prop in newArr) {
      // if(prop!=='null'){
        // return 'Anonumous';
      // this.userDataSource.push({EmployeeName:prop, TotalTime: newArr[prop]});
      // }else if(prop==='null'){
      //   return 'null';
      // }
       
      this.userDataSource.push({EmployeeName:prop, TotalTime: newArr[prop]});
      
     }
   
    // console.log(this.userDataSource);
    
    return this.userDataSource;
  }
 

//  Importing the data from the json server

  getData() {
    this.httpClient
      .get(
        'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=='
      )
      .subscribe((result: any) => {
        this.userList = result;
        this.sumObj();
      });
  }

  // Calculating the Time of a Employee

  dateDiff(dataDate: any) {
    const dateS = new Date(dataDate.StarTimeUtc);
    dateS.toLocaleString();
    const dateE = new Date(dataDate.EndTimeUtc);
    dateE.toLocaleString();

    var duration = moment.duration(
      moment(dateE, 'DD/MM/YYYY HH:mm:ss').diff(
        moment(dateS, 'DD/MM/YYYY HH:mm:ss')
      )
    );
    var hours = duration.hours();
    return hours;
  }

  percentageDiff(){
    let value = 0;
    this.userList.forEach((obj:any) => {
      value += obj.TotalTime;
    })
    return Math.round(this.userList.length/value*100);
  }

  timePercent(){
    let num = 0;


  }

  
}
