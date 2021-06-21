import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { LoginService } from "../login/login.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(private authService: LoginService,
                private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, 
                router: RouterStateSnapshot )
                :Observable<boolean| UrlTree>| Promise<boolean>|boolean{
                       return this.authService.userSub.pipe(
                           take(1),
                           map(user=>{
                           const isAuth= this.authService.getToken()
                           if(isAuth){
                               return true;
                           }
                           
                           return this.router.createUrlTree([''])
                           
                       }
                       ))
                }

}