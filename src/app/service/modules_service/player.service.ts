import { Player } from './../../models/player.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:8080/api/basketballers';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http: HttpClient) { }
  getAll(): Observable<Player[]> {
    console.log(baseUrl);
    return this.http.get<Player[]>(baseUrl);
  }
  get(id: any): Observable<Player> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findBylastName(name: any): Observable<Player[]> {
    return this.http.get<Player[]>(`${baseUrl}?lastname=${name}`);
  }
  findByTeam(name: any): Observable<Player[]> {
    return this.http.get<Player[]>(`${baseUrl}?team=${name}`);
  }
}
