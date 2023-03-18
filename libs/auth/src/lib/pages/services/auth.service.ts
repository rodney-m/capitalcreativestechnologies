import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: any): any{
    return this.http.post<any>(`https://zusa-api.onrender.com/api/v1/Account/login`, user)
  }
}
