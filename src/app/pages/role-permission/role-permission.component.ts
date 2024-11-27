import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainService } from '../../services/main.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-role-permission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  templateUrl: './role-permission.component.html',
  styleUrl: './role-permission.component.css'
})
export class RolePermissionComponent implements OnInit {


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
Object: any;

  constructor( private service : MainService, private fb : FormBuilder ){}

  ngOnInit() {
    this.getAllUserData();
    this.formInit();
  }

  formInit() {
    this.userForm = this.fb.group({
      userName: [''],
      userContact: [''],
      userEmailId: [''],
      userType: [''],
      role: [''],
      userStatus: [''],
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

  filteredData() {
    if(this.searchQuery.trim() == ''){
     this.getAllUserData()
    }else{
      this.allUserData = this.allUserData.filter(item =>
        item.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  updateUserRole(){
    this.service.updateUserData(this.userId, this.userForm.value).subscribe(res=>{
      alert(`Role Updated SuccessFully`);
      this.getAllUserData();
      let ref = document.getElementById('close');
      ref?.click();
      this.userForm.reset();
    },error=>{
      alert(`Something Went Worong..`)
    })
  }

  getPermissionKeys() {
    return ['read', 'edit', 'delete'];
  }


}
