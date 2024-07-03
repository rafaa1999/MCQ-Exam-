import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm!:FormGroup
  students:any[] = []

  constructor(private fb:FormBuilder,
    private service:AuthService,
    private router:Router,
    private toster:ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getStudents();
  }

  createForm(){
    this.userForm = this.fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]]
    })
  }

  getStudents(){
    this.service.getUsers("students").subscribe((data:any) => {
      this.students = data
      console.log(this.students)
    },err => {
      console.log(err);
    })
  }

  submit(){
    const model = {
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password
    }

    let index = this.students.findIndex(item => item.email == this.userForm.value.email)

    if(index !== -1){
      this.toster.error("Email already exists","", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton:true
      })
    }else{
      this.service.createUser(model).subscribe((res:any) => {
        this.toster.success("Student account is added successfully","", {
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
