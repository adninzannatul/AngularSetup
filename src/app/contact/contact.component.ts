import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Feedback, ContactType } from '../Shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

@ViewChild('fform') feedbackFormDirective;

formErrors = {
'firstname': '',
'lastname': '',
'telnum': '',
'email': ''
};

validationMessages = {
'firstname': {
  'required': 'First name is required.',
  'minlength': 'first name requires minimum of 2 characters',
  'maxlength': 'first name should not exceed 10 characters'
},
'lastname': {
  'required': 'Last name is required.',
  'minlength': 'last name requires minimum of 2 characters',
  'maxlength': 'last name should not exceed 10 characters'
},
'telnum': {
'required': 'Telephone number is required.',
'pattern': 'Should include only numbers',
},
'email': {
'required': 'Email is required.',
'email': 'Email not in valid form',
}
};

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

   createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
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
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }
  

}
