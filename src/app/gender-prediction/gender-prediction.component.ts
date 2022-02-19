import { Component, OnInit } from '@angular/core';
import { GenderService } from '../gender.service';

@Component({
  selector: 'app-gender-prediction',
  templateUrl: './gender-prediction.component.html',
  styleUrls: ['./gender-prediction.component.css']
})
export class GenderPredictionComponent implements OnInit {

  name : string = "";
  gender : any = "";
  probability : any = 0;

  constructor(private genderService : GenderService) { }
  ngOnInit(): void {
  }

  getGender(){
    if(this.name== ""){
      return alert("Please enter name to get gender")
    }
    this.genderService.getGender(this.name).subscribe((resp)=>{
      this.gender = resp["gender"]
      this.probability = resp["probability"]*100
    })
  }
}
