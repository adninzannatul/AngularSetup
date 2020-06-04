import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {DishService} from '../services/dish.service';
import { Dish } from '../Shared/dish';
import { Comment } from './comments';
import {switchMap} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Feedback, ContactType } from '../Shared/feedback';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class dishdetailComponent implements OnInit {
@ViewChild('fform') feedbackFormDirective;

formErrors = {
'author': '',
'rating': '',
'comment': ''
};

validationMessages = {
'author': {
  'required':  'Author name is required.',
  'minlength': 'Author name requires minimum of 2 characters',
  'maxlength': 'Author name should not exceed 10 characters'
},
'comment': {
  'required':  'Message is required.'
 }
};
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;
  
  feedbackForm: FormGroup;
  feedback: Feedback;
  dishcopy: Dish;
  myDate = new Date().toLocaleDateString();

    constructor(private dishservice: DishService, 
              private route: ActivatedRoute, 
              private location: Location,
              private fb: FormBuilder,
              @Inject('BaseURL') private BaseURL) {
              this.createForm();
              }
  
   ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.dishcopy= dish; this.setPrevNext(dish.id); },errmess=> this.errMess=<any>errmess );
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  
  goBack(): void {
    this.location.back();
  }

  user=<Comment>{comment:'',rating:5,date: this.myDate, author:''}; 
  
  
  createForm(): void {
    this.feedbackForm = this.fb.group({
      'author': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)] ],
      'rating': 5,
      'date': this.myDate,
      'comment': ''
    });
    
    this.feedbackForm.valueChanges.subscribe(data=> this.onValueChanged(data));
  
    this.onValueChanged();
  }
  
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  
  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.dishcopy.comments.push(this.user);
    this.dishservice.putDish(this.dishcopy).subscribe(dish => { this.dish = dish; this.dishcopy = dish; }, errmess => {this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.feedbackForm.reset({
      author: '',
      rating: '5',
      comment: ''
    });
    this.feedbackFormDirective.resetForm();
  }
  

}

