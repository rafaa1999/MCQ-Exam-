import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {

  name = new FormControl()
  questionForm!:FormGroup
  questions:any[] = []
  correctNum:any

  constructor(private fb:FormBuilder,
    private toaster:ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
    this.questionForm = this.fb.group({
      question:['', [Validators.required]],
      answer1:['', [Validators.required]],
      answer2:['', [Validators.required]],
      answer3:['', [Validators.required]],
      answer4:['', [Validators.required]],
      correctAnswer:['']
    })
  }

  submit(){
    if(this.correctNum){
      const model = {
        question:this.questionForm.value.question,
        answer1:this.questionForm.value.answer1,
        answer2:this.questionForm.value.answer2,
        answer3:this.questionForm.value.answer3,
        answer4:this.questionForm.value.answer4,
        correctAnswer:this.questionForm.value[this.correctNum]
      }
      this.questions.push(model)
      this.questionForm.reset()
    }else{
      this.toaster.error("You should pick the right answer");
    }
    console.log(this.questions)
  }

  createQuestion(){
    
  }

  getCorrect(event:any){
    this.correctNum = event.value
    console.log(event.value)
  }

}
