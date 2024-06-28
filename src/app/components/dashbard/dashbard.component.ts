import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashbard',
  standalone: true,
  imports: [],
  templateUrl: './dashbard.component.html',
  styleUrl: './dashbard.component.css'
})

export class DashbardComponent implements OnInit{

  username : string | undefined;

  constructor(public router: Router) {
  }


  ngOnInit(): void {
  }

}
