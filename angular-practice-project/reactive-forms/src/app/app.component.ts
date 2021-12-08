import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-forms';

  genders = ['male', 'female'];
  signUpForm!: FormGroup;
  forbiddenUserNames = ['Luke', 'Pier'];

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male', Validators.required),
      'health': new FormControl('healthy'),
      'describeHealth': new FormControl(null, Validators.required),
      'hobbies': new FormArray([]) // Array of Form Controls
    });

    // Reacting to value changes (either entire form or part of the form such as formGroup or formControl)
    /* this.signUpForm.valueChanges.subscribe(
      (value) => console.log(value)
    ); */

    // Reacting to status changes (either entire form or part of the form such as formGroup or formControl)
    this.signUpForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }


  onSubmit() {
    console.log(this.signUpForm.value);

    // Reset the form
    this.signUpForm.reset({
      'userData': {
        'username': '',
        'email': '' 
      },
      'gender': 'male',
      'hobbies': []
    });
  }

  checkForValidNestedFormControl(controlName: string) {
    return !(this.signUpForm.get(controlName) as FormControl).valid
        && (this.signUpForm.get(controlName) as FormControl).touched;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signUpForm.get('hobbies') as FormArray).push(control);
  }

  get hobbiesControls() {
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }

  // Custom Validator
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    } 

    return {};
  }

  // Encounter a specific error, then display the required error message in the text tag
  displayNestedErrorMessage(controlName: string, error: string) {
    return (this.signUpForm.get(controlName)?.getError(error) as FormControl);
  }

  // Custom async validator
  forbiddenEmails(control: AbstractControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }

  onSetDefaultEmail() {
    // Update parts of the form
    this.signUpForm.patchValue({
      'userData': {
        'email': 'test@mail.com'
      }
    });
  }

  onSetDefaultFormValues() {
    // Override the entire form
    this.signUpForm.setValue({
      'userData': {
        'username': 'User',
        'email': 'user@gmail.com'
      },
      'gender': 'male',
      'health': 'healthy',
      'describeHealth': 'Good Shape',
      'hobbies': []
    });
  }

  getHealthResponseControl() {
    return (this.signUpForm.get('describeHealth') as FormControl);
  }

  getHealthResponseValue() {
    return (this.signUpForm.get('describeHealth') as FormControl).value;
  }
}
