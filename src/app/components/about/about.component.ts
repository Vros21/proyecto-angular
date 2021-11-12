import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})


export class AboutComponent implements OnInit {

  public title: String;
  public subtitle: String;
  public web: String;

  constructor() {
    this.title = "JM Vilarós Capella";
    this.subtitle = "Desarrollador Web";
    this.web = "jmvc.com";
   }

  ngOnInit(): void {
  }

}
