import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("f")
  signUpForm!: NgForm;

  suggestedName = 'Superuser';
  defaultQuestion = "pet";
  answer = "";
  genders = ["Male", "Female"];

  submitted = false;
  user = {
    username: "",
    email: "",
    secretQuestion: "",
    answer: "",
    gender: ""
  };

  title = 'forms';

  suggestUserName() {
    // Overrides parts (form controls) of the form
    this.signUpForm.form.patchValue({
      userData: {
        userName: this.suggestedName
      }
    });
  }

  suggestFormValues() {
    // Overrides the entire form (form controls)
    this.signUpForm.form.setValue({
      userData: {
        userName: this.suggestedName,
        email: "super@gmail.com"
      },
      secret: "pet",
      questionAnswer: "Lou",
      gender: "Male"
    });
  }

  /* onSubmit(form: NgForm) {
    console.log(form);
  } */

  onSubmit() {
    this.submitted = true;

    // Extract the form data from form controls
    this.user.username = this.signUpForm.value.userData.userName;
    this.user.email = this.signUpForm.value.userData.email;
    this.user.secretQuestion = this.signUpForm.value.secret;
    this.user.answer = this.signUpForm.value.questionAnswer;
    this.user.gender = this.signUpForm.value.gender;

    // Reset the form when you submit the form
    // You can also pass an object containing all the default values for form controls,
    // result in the resetting the form to these specific values
    this.signUpForm.reset();
  }
}
