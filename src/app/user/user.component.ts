import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';
import { UserProfile } from '../_model/user-profile-model';
import { AddUserComponent } from './add-user/add-user.component';
import { UserService } from './user.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

//import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('add', { static: false }) addRef: ElementRef;
  private userSub: Subscription;
  isAuthenticated = false;
 // userArray: UserProfile[];
  userArr: Observable<UserProfile[]>;
  res: any
  id: string;
  private igChangeUser: Subscription;

  constructor(private authService: LoginService,
              private userService: UserService,
              public matdialog: MatDialog ,
              public route: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userSub= this.authService.userSub.subscribe(user=>{
      this.isAuthenticated=!!this.authService.getToken()
    })

    this.userArr = this.userService.getUserData();
    //this.userArr.pipe(take(+this.id)).subscribe(data=>(
     // console.log(data)
   // ))
  }

  userAdd(newUser: UserProfile){
   
    this.userArr=this.userService.addUser(newUser);
   
 }
 
  onCreate(){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "60%";
    let dialogMat = this.matdialog.open(AddUserComponent,dialogConfig)
    console.log(this.id)
    dialogMat.componentInstance.save.subscribe(res => {
      this.res=res
      console.log(res)
      this.userAdd(res)
      
      
    })
    
}

onLogout() {
  localStorage.removeItem('token');
  localStorage.clear();
 
      this.router.navigate(['login']);

}
  

  /*bsModalRef: BsModalRef;

 loadModal() {
    const initialState = {
      title: 'Appointments'
    };

    this.bsModalRef = this.modalService.show(AddUserComponent);

    this.bsModalRef.content.save.subscribe(data => {
      console.log('Child component\'s event was triggered', data);
    });
  }*/
  onEdit(userId: string){
    this.onCreate()
    this.userService.editUser(userId)
  }
 
  ngOnDestroy(){
    this.userSub.unsubscribe()
   // this.igChangeUser.unsubscribe()
  }
  
}
