import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from  'rxjs/operators'
import { throwError } from 'rxjs';
import * as crypto from 'crypto-js';
import { User } from '../_model/user-model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userSub = new  BehaviorSubject<User>(null)
  users: string=""


  
  constructor(private http: HttpClient,
    private route: Router
    ) { }
  
  login(userId: string, password: string): Observable <any>{

    userId = this.EncriptPassword(userId)
    password = this.EncriptPassword(password)
    
   return this.http.post(
        'http://dev.api.sip.oscillosoft.com.au:83/connect/token',
        { userId, password, }
      )
      .pipe(catchError(this.handleError),tap( resdata=>{
      const expireDate= new Date( new Date().getTime() + +resdata._tokenExpires*1000);
        const user:User = new User(userId, password, resdata.token, expireDate);
       
        console.log(this.users)
        this.userSub.next(user)
        this.users= JSON.stringify(user)
        localStorage.setItem('userData',this.users)
      }
        ))
      
  }
   
  getToken(){
    var i= localStorage.getItem('token')
    return (i)
  }
 
  public getAuthHeader(){
   // const auth = this.getAuthFromLocalStorage();
      
    const httpHeaders = new HttpHeaders({
          Authorization: `Bearer ${this.getToken()}`,
         });
    
    return httpHeaders;
  }
 autoLogin(){
   let userData:{ userId: string, password: string,_token: string, _tokenExpires: Date } = JSON.parse(localStorage.getItem('userData'))
   if(!userData){
     return;
   }
   let user= new User(userData.userId,userData.password,userData._token, new Date(userData._tokenExpires))

   if(user.token){
    this.userSub.next(user)
   }
 }




  EncriptPassword(password:string){

    var key = crypto.enc.Utf8.parse('7061737323313233');
    var iv = crypto.enc.Utf8.parse('7061737323313233');
    var encrypted = crypto.AES.encrypt(crypto.enc.Utf8.parse(password), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7
        });
    return encrypted.toString();
    }
  private handleError(errorRes: HttpErrorResponse){
    let errorMessage=""
        if(!errorRes.error|| !errorRes.error.error)
        { 
          errorMessage="Invalid Username or Password"
          return throwError(errorMessage)
        }
       
        errorMessage ="Wrong UserName or Password"

  }
}
