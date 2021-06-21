import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LoginService } from './login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  error: string= null;
  private loggedIn = new BehaviorSubject<boolean>(localStorage.getItem("isLoggedIn") === "true");
  

  constructor(private authservice: LoginService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formInit()
   
  }
  formInit(){
    this.formGroup = new FormGroup({
      userId : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required])
    })
    
  }
  onSubmit(){
    
    if(this.formGroup.valid)
    this.authservice.login(this.formGroup.value.userId, this.formGroup.value.password).subscribe(
      resData=>{
        if(resData.success) 
        {
        
        localStorage.setItem("isLoggedIn", "true");
          
        localStorage.setItem('token',resData.token)
        this.router.navigate(['users'],{ relativeTo : this.route})
        this.loggedIn.next(true);
        
       }  
       else{
        alert('Wrong Username or Password') }
      },
        errorMessage=>{
          this.error =errorMessage
          
        }
    )
    
  }
 
   formControl(){
     return this.formGroup.controls
   }

}
