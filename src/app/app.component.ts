import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { get } from 'lodash';
import { ICustomerData } from '../interfaces/CustomerData.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private static apiUrl: string = 'https://randomapi.com/api/c7d32c869d445608daea1f6cbf48e599?noinfo&sole';
  private httpClient: HttpClient;
  customerData: ICustomerData[];

  constructor (private http: HttpClient) {
    this.httpClient = http;
  }

  onBtnClick() {
    this.httpClient.get(AppComponent.apiUrl)
      .subscribe(
        responseData => {
          this.customerData = <ICustomerData[]>get(responseData, 'results.customer');
        },
        e => console.log(`Error`),
        () => console.log('Complete')
      );
  }
}