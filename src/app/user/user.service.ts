import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { UserProfile } from '../_model/user-profile-model';

@Injectable({
  providedIn: 'root'
})
export class UserService  extends BehaviorSubject<any[]> {
  userAdded = new Subject<UserProfile[]>();
  userSubAdd = new  BehaviorSubject<UserProfile>(null)
  
  private data: any[] = [];

  private userArray: UserProfile[]=[
    new UserProfile('iplanlion','iplanlion','iplanlion@gmail.com',true,true,"8892344333")
  ]
  
  constructor(private authToken: LoginService,
              private http: HttpClient) { super([]); }

  

  getUserData(action: string = '', data?: any): Observable<UserProfile[]> {
    const header = this.authToken.getAuthHeader();
    var url = "http://dev.api.sip.oscillosoft.com.au:83/api/User/GetUserList";
    return this.http
      .get(`${url}`, { headers: header })
      .pipe(map(res => <any[]>res)
      
      );
     
  }

  addUser(data?: any): Observable<any> {
    const header = this.authToken.getAuthHeader();
    console.log(data)
  
    var url = "http://dev.api.sip.oscillosoft.com.au:83/api/User/AddUser";
     return this.http.post(`${url}`,data,{ headers: header }).pipe(
      catchError(error => {
        return throwError(error);
      }),tap( resdata=>{
          const userAdd:UserProfile = new UserProfile(resdata.userId, resdata.userName,resdata.emailAddress,resdata.mobileNumber,resdata.isAdmin, resdata.isActive );
         
          this.userSubAdd.next(userAdd)
         // console.log(userAdd)
          localStorage.setItem('userProfile',JSON.stringify(userAdd))
          console.log(JSON.stringify(userAdd))
  })
     )
   //  this.userArray.push(user)
  //  this.userAdded.next(this.userArray.slice());
}
 
editUser(userId: string){
  const header = this.authToken.getAuthHeader();
  var url = "http://dev.api.sip.oscillosoft.com.au:83/api/User/AddUser";
  return this.http.get(`${url}`, {headers: header})
}
 
 
private handleError(errorRes: HttpErrorResponse){
  let errorMessage=""
      if(!errorRes.error|| !errorRes.error.error)
      { 
        errorMessage="Error"
        return throwError(errorMessage)
      }
     
      errorMessage ="Error!"

}

 
 // addUser(user: UserProfile){
   // this.userArray.push(user)
  //  this.userAdded.next(this.userArray.slice());
 // }
 
}
