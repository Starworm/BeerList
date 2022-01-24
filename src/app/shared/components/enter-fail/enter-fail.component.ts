import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

/** Component for fail screen if user is younger than necessary */
@Component({
  selector: 'app-enter-fail',
  templateUrl: './enter-fail.component.html',
  styleUrls: ['./enter-fail.component.scss']
})
export class EnterFailComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * navigates to entrance page
   */
  public goBack(): void {
    this.router.navigate(['/']);
  }
}
