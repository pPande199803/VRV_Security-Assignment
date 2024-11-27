import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  baseUrl = "http://localhost:3000"

  constructor( private http : HttpClient ) { }

  postUserData(data:Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.baseUrl}/userDetails`,data)
  }

  updateUserData(id:number, data:Employee){
    return this.http.put(`${this.baseUrl}/userDetails/`+id, data)
  }

  getAllUserData() : Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.baseUrl}/userDetails`)
  }

  deleteUserById(userId:number){
    return this.http.delete(`${this.baseUrl}/userDetails/`+ userId)
  }

}
