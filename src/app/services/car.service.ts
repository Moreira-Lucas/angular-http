import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Car } from '../models/car';
import {retry, catchError} from 'rxjs/operators'; 



@Injectable({
  providedIn: 'root'
})
export class CarService {

  url = 'http://localhost:3000/cars'; //api rest fake

  constructor(private httpClient: HttpClient) { }

  httpsOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }
  //listar todos os carros
  getCars(): Observable<Car[]>{
    return this.httpClient.get<Car[]>(this.url)
    .pipe(retry(2),catchError(this.handleError))
  }
  // pegar um carro pelo id
  getCarsById(id: number): Observable<Car>{
    return this.httpClient.get<Car>(`${this.url}/${id}`)
    .pipe(retry(2), catchError(this.handleError));
  }

  //salvar  o carro
  saveCar(car: Car): Observable<Car> {
    return this.httpClient.post<Car>(this.url, JSON.stringify(car), this.httpsOptions).pipe(retry(2),catchError(this.handleError))
  }

  //atualiza um carro
  updateCar(car: Car): Observable<Car>{
    return this.httpClient.put<Car>(`${this.url}/${car.id}`, this.httpsOptions )
    .pipe(retry(1),catchError(this.handleError))
  }

  //deleter um carro
  deleteCar(car: Car): Observable<Car>{
    return this.httpClient.delete<Car>(`${this.url}/${car.id}`, this.httpsOptions)
    .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse){
     let errorMessage = '';
     if(error.error instanceof ErrorEvent){
       //Erro no lado do cliente
       errorMessage = error.error.message;

     }else{
       //Erro ocorreu no lado do servidor
       errorMessage = `Código  do erro: ${error.status}, Mensagem:${error.message}`;
     } 
     console.log(error.message);
     return throwError(errorMessage)
  }
}
