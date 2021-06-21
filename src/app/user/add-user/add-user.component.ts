import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserProfile } from 'src/app/_model/user-profile-model';
import { UserService } from '../user.service';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  formGroup: FormGroup;
  @ViewChild('IDControl', { static: false }) IdRef: ElementRef;
  @ViewChild('nameControl', { static: false }) nameRef: ElementRef;
  @ViewChild('emailControl', { static: false }) emailRef: ElementRef;
  @ViewChild('phoneControl', { static: false }) phoneRef: ElementRef;
  @ViewChild('statusControl', { static: false }) statusRef: ElementRef;
  @ViewChild('adminControl', { static: false }) adminRef: ElementRef;

  userAr:  Observable<UserProfile[]>;
  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }
  private igChangeUser: Subscription;
  userArray: UserProfile[];

  @Output() save: EventEmitter<UserProfile> = new EventEmitter();

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      userId: new FormControl('',[Validators.required]),
      userName : new FormControl('',[Validators.required]),
      emailAddress : new FormControl('',[Validators.required]),
      mobileNumber : new FormControl('',[Validators.required]),
      isActive : new FormControl('',[Validators.required]),
      isAdmin: new FormControl('',[Validators.required]),

    })
  }
  onSubmit(){
  //  this.userService.addUser(this.formGroup)
  
    const ingName = this.nameRef.nativeElement.value;
    const ingID = this.IdRef.nativeElement.value;
    const ingEmail = this.emailRef.nativeElement.value;
    const ingPhone = this.phoneRef.nativeElement.value;
    const ingStatus = true;
    const ingAdmin= true;
    const newUser = new UserProfile(ingName, ingID, ingEmail,ingAdmin,ingStatus,ingPhone);
    
    this.save.emit(newUser);
    this.router.navigate(['users'],{ relativeTo : this.route})
    
    
  }
  
  
}
