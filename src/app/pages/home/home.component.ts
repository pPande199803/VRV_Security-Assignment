import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Employee } from '../../models/employee';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  allUserData: Employee[] = [];
  isAdmin: boolean = false;
  isUser: boolean = true;
  userForm !: FormGroup;
  checked: boolean = false;
  userId !: number;
  isEdit : boolean = false;
  isAdd: boolean = false;
  searchQuery: string = '';
  isAdminSelected: boolean = false;
  isUserSelected: boolean = false;
  p: number = 1;
  // collection: any[] = someArrayOfThings;

  constructor(private service: MainService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getAllUserData();
    this.isAdmin = false;
    this.isUser = true;
    this.formInit()
    this.isEdit = false;
    this.isAdd = true;
  }

  get userFormControl() {
    return this.userForm.controls;
  }

  formInit() {
    this.isAdd = true;
    this.isEdit = false;
    this.userForm = this.fb.group({
      userName: ['', [Validators.required]],
      userContact: ['', [Validators.required, Validators.pattern(/^[0-9]{3}[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/),
      Validators.minLength(10)
      ]],
      userEmailId: ['', [Validators.required, Validators.email]],
      userType: ['', [Validators.required]],
      role: ['', [Validators.required]],
      userStatus: ['', [Validators.required]],
      permission: this.fb.group({
        read: [false],
        edit: [false],
        delete: [false]
      })
    });
  }

  getAllUserData() {
    this.service.getAllUserData().subscribe((res: Employee[]) => {
      // console.log(res)
      this.allUserData = res
    }, ((error) => {
      alert("Something Went Worong")
    }))
  }

  deleteUser(userId: number) {
    this.service.deleteUserById(userId).subscribe(res => {
      alert(`User Deleted Successfully`);
      this.getAllUserData();
    }, error => {
      alert(`Something Went Worong + ${userId}`)
    })
  }


  formSubmit() {
    if (!this.userForm.valid) {
      alert(`Form Not Valid`)
    }
    this.service.postUserData(this.userForm.value).subscribe((res: Employee) => {
      alert(`Data Added Successfully`);
      this.getAllUserData()
      this.userForm.reset()
      let ref = document.getElementById('close');
      ref?.click();
    }, (error) => {
      alert(`Something Went Worong..`)
    })
  }

  editUserData(user: any) {
    // console.log(user)
    let ref = document.getElementById('openModal');
    ref?.click()
    this.isEdit = true;
    this.isAdd = false;
    this.userId = user.id
    this.userForm.setValue({
      userName: user.userName,
      userContact: user.userContact,
      userEmailId: user.userEmailId,
      userType: user.userType,
      role: user.role,
      userStatus: user.userStatus,
      permission: user.permission
    })
  }

  updateUserData(){
    this.service.updateUserData(this.userId, this.userForm.value).subscribe(res=>{
      alert(`User Data Updated SuccessFully`);
      this.getAllUserData();
      let ref = document.getElementById('close');
      ref?.click();
      this.userForm.reset();
    },error=>{
      alert(`Something Went Worong..`)
    })
  }

  // Get the filtered data based on the search query
  filteredData() {
    if(this.searchQuery.trim() == ''){
     this.getAllUserData()
    }else{
      this.allUserData = this.allUserData.filter(item =>
        item.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

}
