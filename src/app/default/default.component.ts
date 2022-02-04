import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

sideBarOpen = true;


@Output() toggleSideBarForMe: EventEmitter<any> =new EventEmitter()
 
   constructor() { }
 
  ngOnInit(): void {
  }
 sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

  

}
