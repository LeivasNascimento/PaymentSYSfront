import { PaymentDetail } from './payment-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"; //HttpClient is used to make Http request to the server.

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  formData: PaymentDetail= new PaymentDetail(); //formData property can be used for designing the form for CRUD Operations,
  readonly rootURL = 'http://localhost:61309';//'https://localhost:65067/api';
  list : PaymentDetail[]; //list array is used to store all of the records from the API. 

  constructor(private http: HttpClient) { }

  postPaymentDetail() {
    console.log("entrou em postPaymentDetail");
    return this.http.post(`${this.rootURL}/api/Payments/efetuarPagamento`, this.formData);
  }
  putPaymentDetail() {
    return this.http.put(`${this.rootURL}/PaymentDetail/${this.formData.PMId}`, this.formData);
  }
  deletePaymentDetail(id) {
    return this.http.delete(`${this.rootURL}/PaymentDetail/${id}`);
  }

  refreshList() {
    this.http.get(`${this.rootURL}/PaymentDetail/`)
      .toPromise()
      .then(res => this.list = res as PaymentDetail[]);
  }
}