import { Injectable,Injector } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { LoginService } from '../login/login.service';



@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector,
              private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){

    this.loginService.userSub.subscribe()
    let authService = this.injector.get(LoginService)
    let tokenizedReq= req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
