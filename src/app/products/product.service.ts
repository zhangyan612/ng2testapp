import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs'
import { catchError, tap, map } from 'rxjs/operators'

import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'http://localhost:57602/api/product';

    constructor(private http: HttpClient){}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('server returns: '+ JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<IProduct> {
        return this.getProducts().pipe(map((products: IProduct[]) => products.find(p => p.productId === id)));
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