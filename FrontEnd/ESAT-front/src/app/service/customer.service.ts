import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { CustomerHdrDto, CustomerResponseDto } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getAll(): Observable<CustomerResponseDto> {
    return this.http.get<CustomerResponseDto>(`${this.baseUrl}GetAll`).pipe(
      map((response: CustomerResponseDto) => {
        // Assuming the response from the API is already in the correct format
        return response;
      })
    );
  }

  save(customer: CustomerHdrDto): Observable<any> {
    return this.http.post(`${this.baseUrl}Save`, customer);
  }

  getById(id: number): Observable<CustomerHdrDto> {
    return this.http.get<CustomerHdrDto>(`${this.baseUrl}GetById/${id}`);
  }
}
