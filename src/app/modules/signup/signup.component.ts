import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { CustomValidator } from '../../shared/validators/Custom.validators';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { IUserModel } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public registrationForm: FormGroup;
  public successMessage: string;
  public authMessage: string;
  public authMessageSub: Subscription;
  public failMessage: string;
  public userRegistrationData: IUserModel = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: 0,
    city: '',
  };
  public passwordFieldTextType = false;
  public confirmPasswordFieldTextType = false;
  public otpPreferenceValue: string;
  public submitButtonStatus = false;
  public validationMessages = {
    firstName: {
      required: 'First Name required.',
      minlength: 'First Name must be greater than 2 characters.',
      maxlength: 'First Name must be less than 20 characters.',
    },
    lastName: {
      required: 'Last Name required.',
      minlength: 'Last Name must be greater than 2 characters.',
      maxlength: 'Last Name must be less than 20 characters.',
    },
    password: {
      required: 'Password required.',
      minlength: 'Password will contain atleast 6 characters.',
      maxlength: 'Password should not be greater than 15 characters.',
      passwordValidationSyError: "Can't contain this symbol, only[ ! @ # _ - ]",
      passwordValidationError:
        'Password should be contain 1 capital, 1 small, 1 numeric and 1 symbol character.',
    },
    confirmPassword: {
      matchPasswordError: "Confirm Password doesn't match",
    },
    email: {
      required: 'Email is required.',
      email: 'Enter a valid email id.',
      uniqueEmailAsyncError: 'Email already taken',
    },
    phone: {
      required: 'Phone is required.',
      minlength: 'Phone number should be 10 digits.',
      maxlength: 'Phone number should be 10 digits.',
    },

    city: {
      required: 'City is required.',
    },
  };

  public formErrors = {
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    city: '',
  };
  public isLoading = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.registrationFormCreation();
    // This observable will triggered each an every value insertion in form field
    // and it will call the logValidation() method.
    this.subscription.add(
      this.registrationForm.valueChanges.subscribe((value) =>
        this.logValidationErrors(this.registrationForm)
      )
    );
    // This subscription will watch both value in pwd or cnfmPwd and triggered the validation.
    this.subscription.add(
      this.registrationForm.controls.password.valueChanges.subscribe((value) =>
        this.registrationForm.controls.confirmPassword.updateValueAndValidity()
      )
    );
  }

  // This is form control creation method
  public registrationFormCreation(): void {
    this.registrationForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          CustomValidator.passwordValidation,
          Validators.maxLength(15),
        ],
      ],
      confirmPassword: ['', CustomValidator.matchPassword],
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      email: new FormControl(
        '',
        [Validators.required, Validators.email],
        CustomValidator.uniqueEmailAsync(this.userService)
      ),
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        postalCode: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
          ],
        ],
      }),
    });
  }

  // This method is implemented for logging the error of every form elemenet
  public logValidationErrors(group: FormGroup = this.registrationForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (
        abstractControl &&
        abstractControl.errors &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] = messages[errorKey];
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  public togglePasswordFieldTextType(): void {
    this.passwordFieldTextType = !this.passwordFieldTextType;
  }

  public toggleConfirmPasswordFieldTextType(): void {
    this.confirmPasswordFieldTextType = !this.confirmPasswordFieldTextType;
  }

  // This is method will help to submit the form after clicking the submit button.
  public onSubmit(event: Event): void {
    event.preventDefault();
    if (this.registrationForm.valid) {
      this.submitButtonStatus = true;
      this.isLoading = true;
      const userData = this.mapFormValueToUserModel();
      this.userRegistrationData.firstName = userData.firstName;
      this.userRegistrationData.lastName = userData.lastName;

      this.userRegistrationData.email = userData.email;
      this.userRegistrationData.password = userData.password;
      this.userRegistrationData.phone = +userData.phone;
      this.userRegistrationData.city = userData.city;
      console.log('UserData', this.userRegistrationData);
      this.successMessage = '';
      this.failMessage = '';
      if (this.userRegistrationData) {
        this.subscription.add(
          this.userService.signUp(this.userRegistrationData).subscribe(
            (resData) => {
              this.successMessage =
                'Successfully Registered. Please verify your email';
              this.isLoading = false;
              this.registrationForm.reset();
              this.authMessage = '';
              console.log('Respose form sinup: ', resData);
            },
            (resError) => {
              this.failMessage = resError;
              this.isLoading = false;
              this.submitButtonStatus = false;
              this.authMessage = '';
              console.log('Error form sinup: ', resError);
            }
          )
        );
      }
    }
  }
  // This method will map form value to class property
  public mapFormValueToUserModel(): any {
    const userRegistrationData = Object.assign({}, this.registrationForm.value);
    delete userRegistrationData.confirmPassword;
    return userRegistrationData;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
