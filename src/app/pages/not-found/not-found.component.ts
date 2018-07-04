import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mc-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private router: Router
  ) {
    if (router.url.includes('/index.php')) {
      let url = router.url.replace('/index.php', '');
      this.router.navigate([url]);
    }
  }

  ngOnInit() {
  }

}
