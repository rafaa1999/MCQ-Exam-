import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user = new Subject()

  constructor(private http:HttpClient ) { }

  createUser(model:any){
    console.log(model)
    return this.http.post(environment.baseApi + "students",model)
  }

  login(model:any){
    return this.http.put(environment.baseApi + "login/1",model)
  }

  getUsers(type:any){
    return this.http.get(environment.baseApi + type)
  }

  getRole(){
    return this.http.get(environment.baseApi + "login/1")
  }

}

