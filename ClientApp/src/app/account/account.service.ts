import { User } from './../Shared/Components/Models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../Shared/Components/Models/register';
import { environment } from 'src/environments/environment.development';
import { Login } from '../Shared/Components/Models/login';
import { identity, ReplaySubject, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable();

  constructor(private http: HttpClient, private router: Router ) { }

  refreshUser(jwt: string | null){
    if(jwt === null){
      this.userSource.next(null);
      return of(undefined);     
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this.http.get<User>(`${environment.appUrl}/api/account/refresh-user-token`, {headers}).pipe(
      map((user: User) => {
          if(user){
            this.setUser(user);
          }
        })
      )
    }

  login(model: Login){
   return this.http.post<User>(`${environment.appUrl}/api/account/login`, model).pipe(
      map((user: User) => {
        if(user){
          this.setUser(user);
          return user;
        }
        return null;
      })
    );  
  }

  logout(){
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl('/');
  }
  register(model: Register){
    return this.http.post(`${environment.appUrl}/api/account/register`, model);
  }

  getJWT(){
    const key = localStorage.getItem(environment.userKey);
    if(key){
      const user: User = JSON.parse(key);
      return user;
    }else{
      return null; 
    }
  }
  private setUser(user: User){
    localStorage.setItem(environment.appUrl, JSON.stringify(user));
    this.userSource.next(user);
  } 
}

