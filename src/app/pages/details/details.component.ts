import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Employee } from '../../models/employee';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  userId : any;
  user:any;


  constructor( private route : ActivatedRoute, private service : MainService ){}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    // console.log(this.userId);
    this.getUserDataById()
  }

  getUserDataById(){
    this.service.getAllUserData().subscribe((res:Employee[])=>{
      // console.log(res)
      this.user = res.filter(x=>x.id == this.userId)
      // console.log(this.user)
    })
  }

}
