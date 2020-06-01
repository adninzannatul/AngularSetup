import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../Shared/dish';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class dishdetailComponent implements OnInit {

  @Input()  
  dish: Dish;
  
  constructor() { }

  ngOnInit(): void {
  }

}

