import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { validatePassword } from '../Validator/passwordValidators';
import { CommonModule } from '@angular/common';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
alert: boolean=false
  // api = 'http://localhost:3000/customer/register'

  registerForm !:FormGroup

  // http = inject(HttpClient)

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private authService : AuthService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    // console.log(this.newUser.gender);

    this.registerForm = this.fb.group({
      userName: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      phoneNo: ['', Validators.required],
      password: ['',Validators.required],
      gender: ['',Validators.required],
      confirmPassword:['',Validators.required]
    },
    {
      validators: validatePassword('password','confirmPassword')
    });
  }

  register() {
    
    console.log(this.registerForm.value);
    this.authService.registerService(this.registerForm.value).subscribe({
      next: (res: any) => {
      console.log(res);
      
      if(res.status === 201)
      {
        this.toast.success({detail:"Success Message",summary:res.msg,duration:5000})
        this.router.navigate(['login']);
      }
      else if(res.status === 400)
      {
        this.toast.error({detail:"Error Message",summary:res.msg,duration:15000})
      }
      },
      error: (error: any) => {
          console.log(error);
          this.toast.warning({detail:"Warning Message",summary:error.error.msg,duration:5000})
            console.error(error);
          }
    })
}

closeAlert(){
  this.alert=false
}

}


    // console.log("aaa...");
    //  console.log(this.registerForm.value);
     
    
    // if (this.registerForm.value.confirmPassword === this.registerForm.value.password) {
      // this.http.post(this.api, this.registerForm.value).subscribe({
      //   next: (res: any) => {
      //     this.router.navigate(['login']);
      //   },
      //   error: (error: any) => {
      //     console.error(error);
      //   }
      // })
    // }
    // else{
    //     console.log("Password not Match...");
    // }
