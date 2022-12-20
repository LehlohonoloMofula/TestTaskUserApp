import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(@Inject('BASE_API_URL') private baseApiUrl: string,
    private httpClient: HttpClient) { }

  get<T>(id: string) {
    return this.httpClient.get<T>(`${this.baseApiUrl}users/${id}`);
  }

  save<T>(user: User) {
    if (user.id) {
      return this.httpClient.put<T>(`${this.baseApiUrl}users/${user.id}`, user);
    } else {
      return this.httpClient.post<T>(`${this.baseApiUrl}users`, user);
    }
  }

}