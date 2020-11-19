import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from './../../shared/payment-detail.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: []
})
export class PaymentDetailFormComponent implements OnInit {

  //Since we’ve the service injected here. we can access it’s property formData in component HTML file for designing the form
  constructor(public service: PaymentDetailService) { }

  ngOnInit() {
    this.resetForm();//vai com parametro nulo

  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();

    this.service.formData = {
      PMId: 0,
      CardOwnerName: '',
      CardNumber: '',
      ExpirationDate: '',
      CVV: ''
    }
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.PMId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);

    
  }

  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }
}
