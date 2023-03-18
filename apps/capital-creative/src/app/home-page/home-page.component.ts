import { Component, OnInit } from '@angular/core';
import { ApiService } from '@trogon-energy/core';

@Component({
  selector: 'trogon-energy-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  projects : any[] = []
  constructor(private service : ApiService) {}

  ngOnInit(): void {
    this.getProjects()
  }


  getProjects(){
    this.service.getFromUrl('/Project').subscribe({
      next: (res) => {
      this.projects = res?.data
      }
    })
  }
}
