import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private apiService: ApiService) { }

  public getUsers(): Observable<User[]> {
    return this.apiService.get(environment.userEndPoint);
  }

  public getUserById(id: string): Observable<User> {
    return this.apiService.get(`${environment.userEndPoint}/${id}`);
  }

  public createUser(body: User): Observable<User[]> {
    return this.apiService.post(`${environment.userEndPoint}`, body);
  }

  public editUser(id: string, body: User): Observable<User[]> {
    return this.apiService.put(`${environment.userEndPoint}/${id}`, body);
  }

  public deleteUser(id: string): Observable<User> {
    return this.apiService.delete(`${environment.userEndPoint}/${id}`);
  }

}
