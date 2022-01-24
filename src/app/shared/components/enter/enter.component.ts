import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

/** Component for entrance page  */
@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss']
})
export class EnterComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * navigates to main page with list of beers
   */
  public goToSite(): void {
    this.router.navigate(['/home']);
  }
}
