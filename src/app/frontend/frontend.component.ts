import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mc-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FrontendComponent implements OnInit {

  constructor() {
    // Set Background Picture
    let picNum = Math.floor(Math.random() * 4) + 1;
    let selectedPic = '/assets/img/default-background'+picNum+'.jpg';
    document.body.style.backgroundImage = 'url('+selectedPic+')';
  }

  ngOnInit() {
    
  }

}
