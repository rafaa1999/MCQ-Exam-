import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup
  users:any[] = []
  type:string = "students"

  constructor(private fb:FormBuilder,
    private service:AuthService,
    private router:Router,
    private toster:ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.createForm()
  }

  getRole(event:any){
    this.type =  event.value
    this.getUsers();
  }

  createForm(){
    this.loginForm = this.fb.group({
      type:[this.type],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    })
  }

  getUsers(){
    this.service.getUsers(this.type).subscribe((data:any) => {
      this.users = data
      console.log(this.users)
    },err => {
      console.log(err);
    })
  }
  
  submit(){
    
    let index = this.users.findIndex(item => item.email == this.loginForm.value.email && item.password == this.loginForm.value.password)

    if(index == -1){
      this.toster.error("Email or Password is incorrect","", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton:true
      })
    }else{
      const model = {
        username: this.users[index].username,
        role: this.type
      }
      this.service.login(model).subscribe((res:any) => {
        this.toster.success("Login is successfully done","", {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut:5000,
          closeButton:true
        })
        this.router.navigate(['/subjects'])
      },err => {
        console.log(err)
      })
    }

  }


}
