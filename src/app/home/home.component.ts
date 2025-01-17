import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../Shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../Shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../Shared/leader';
import { LeaderService } from '../services/leader.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  dishErrMess: string;
  promotion: Promotion;
  leader: Leader;
  
  constructor(private dishservice: DishService, private promotionservice: PromotionService, private leaderService: LeaderService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish=> this.dish = dish, errmess =>this.dishErrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
    
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader);
  }
  
 
}
