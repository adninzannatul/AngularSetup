import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {DishService} from '../services/dish.service';
import { Dish } from '../Shared/dish';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class dishdetailComponent implements OnInit {
   
  dish: Dish;
  
  constructor(private dishservice: DishService, 
              private route: ActivatedRoute, 
              private location: Location) {}
  
  ngOnInit(): void {
  const id = this.route.snapshot.params['id'];
  this.dish = this.dishservice.getDish(id);
  }
  
  goBack(): void {
    this.location.back();
  }

}

