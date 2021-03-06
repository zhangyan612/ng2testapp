import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs'
import { catchError, tap, map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:57602/api/';
  //private apiUrl = 'https://my-json-server.typicode.com/zhangyan612/jsonfile/'

  private header = new HttpHeaders({'Content-Type':  'application/json'})
  private httpOptions = {
    headers: this.header
  };

  constructor(private http: HttpClient) { }

  getAll(url: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + url).pipe(
        tap(data => console.log('server returns: '+ JSON.stringify(data))),
        catchError(this.handleError)
    );
  }

  getExternal(url: string): Observable<any[]> {
    return this.http.get<any[]>(url).pipe(
        tap(data => console.log('server returns: '+ JSON.stringify(data))),
        catchError(this.handleError)
    );
  }

  getById(url: string, id: number): Observable<any> {
    let params = new HttpParams().set("id", id.toString());
    
    return this.http.get<any>(this.apiUrl + url, {params}).pipe(
        tap(data => console.log('server returns: '+ JSON.stringify(data))),
        catchError(this.handleError)
    );
  }

  getFilter(url: string, name: string, value: string): Observable<any> {
    let params = new HttpParams().set(name, value);
    
    return this.http.get<any>(this.apiUrl + url, {params}).pipe(
        tap(data => console.log('server returns: '+ JSON.stringify(data))),
        catchError(this.handleError)
    );
  }

  create(url: string, data: any): Observable<any> {
    let bodyString = JSON.stringify(data);
    return this.http.post(this.apiUrl + url, bodyString, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  saveList(url: string, data: any): Observable<any> {
    let bodyString = JSON.stringify(data);
    return this.http.post(this.apiUrl + url + "/list", bodyString, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  update(url: string, id: number, data: any): Observable<any> {
    let bodyString = JSON.stringify(data);
    return this.http.put<any>(this.apiUrl + url + '/' + id, bodyString, this.httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  delete(url: string): Observable<any> {
    return this.http.delete(this.apiUrl + url, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage = ''
    if (err.error instanceof ErrorEvent){
        errorMessage ='An error occured: ' + err.error.message;
    } else{
        errorMessage = 'server returned code ' + err.status + ', error message is: ' + err.error.message;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
