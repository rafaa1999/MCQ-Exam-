import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http:HttpClient ) { }

  createUser(model:any){
    console.log(model)
    return this.http.post(environment.baseApi + "students",model)
  }

  getUsers(){
    return this.http.get(environment.baseApi + "students")
  }
}

