import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Question } from '../question';
import { QuestionService } from '../question.service';
@Component({
  selector: 'app-take-exam',
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})

export class TakeExamComponent implements OnInit {
  myForm:FormGroup;
  allQuestion: Array <Question> = new Array();

  mssg1 = "";
  mssg2 = "";
  mssg3 = "";
  mssg4 = "";
  totalMssg:string = "";


  constructor(public form:FormBuilder, public examSer:QuestionService) {    // build form dynamically creating DI
      this.myForm=form.group({});
   }

  ngOnInit(): void {
    this.examSer.loadQuestion().subscribe(result=> {
      // console.log(result);
      for(let q of result){
        // console.log(q);
        this.allQuestion.push(q);
        // console.log(this.allQuestion);
      }
      console.log(this.allQuestion);
      this.allQuestion.forEach(q=> {
        // console.log(q);
        this.myForm?.addControl(q.question,this.form.control(""));
                                //user:new FormControl();
                                //q.question
      })
    })
  }

  submit(){
    let numbCorrect:number = 0;
    for(let q of this.allQuestion){
      let qNumb = q.question;

      let results = this.myForm.controls[qNumb].value;
      if (results === q.correctAns ){
        numbCorrect++;
      }


    }
    this.totalMssg = "You answered " + numbCorrect + " questions correctly!";
  }
  
}
