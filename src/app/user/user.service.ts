import { Injectable, Inject } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { User } from "./user";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(
    @Inject("BASE_API_URL") private baseApiUrl: number,
    private httpClient: HttpClient
  ) {}
 
  get<T>(id: string) {
    return this.httpClient.get<T>(`${this.baseApiUrl}users/${id}`);
  }

  find<T>(keyword, pageNumber, pageSize) {
    return this.httpClient.get<T>(`${this.baseApiUrl}users/find`,
      {
        params: { keyword, pageNumber, pageSize }
      });
  }

  save<T>(user: User) {
    if (user.id) {
      return this.httpClient.put<T>(`${this.baseApiUrl}users/${user.id}`, user);
    } else {
      return this.httpClient.post<T>(`${this.baseApiUrl}users`, user);
    }
  }
}
