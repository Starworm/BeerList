import {Component, Input, OnInit} from '@angular/core';
import {BeerInterface} from "../../interfaces/beer.interface";

/** Component for displaying beer element*/
@Component({
  selector: 'app-beer-item',
  templateUrl: './beer-item.component.html',
  styleUrls: ['./beer-item.component.scss']
})
export class BeerItemComponent implements OnInit {

  /** beer element for displaying in the component */
  @Input() beerEl: BeerInterface;
  /** 'id' of beer element in beer array */
  @Input() beerLocalId: number;
  /** 'id' of clicked beer element */
  @Input() clickedBeerId: number;

  constructor() { }

  ngOnInit(): void {

  }
}
