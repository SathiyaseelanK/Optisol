import { User } from './../../models/user.model';
import { UsersService } from './../../services/users.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'opt-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {
  userForm: FormGroup = new FormGroup({});
  submitText= 'Submit';
  @Output() getUpdatedValue: EventEmitter<boolean> = new EventEmitter(false);
  @Input() formInput: any = null;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService
    ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formInput'].currentValue && Object.keys(changes['formInput'].currentValue).length) {
        this.submitText = 'Edit';
        this.setUserForm();
    } else {
      this.submitText = 'Submit';
    }
  }

  ngOnInit(): void {
    this.buildUserForm()
  }

  private buildUserForm(): void {
    this.userForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['',[Validators.required]],
        address1: ['', Validators.required],
        address2: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', [Validators.required]],
        country: ['', Validators.required],
        qualification: ['', Validators.required],
        comments: ['', Validators.required],
      }
    )
  }

  private setUserForm(): void {
    this.userForm.patchValue(this.formInput)
  }

  get uForm(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    } else {
      if (this.submitText === 'Submit') {
        this.userService.createUser(this.userForm.value).subscribe((res) => {
          console.log('res', res);
          this.getUpdatedValue.emit(true);
        })
      } else if (this.submitText === 'Edit' && this.formInput?._id){
        this.userService.editUser(this.formInput?._id, this.userForm.value).subscribe((res) => {
          this.getUpdatedValue.emit(true);
          this.formInput = null;
        })
      }
      this.userForm.reset();
    }
  }

}
