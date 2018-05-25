import { Component, OnInit, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";

@Component({
  selector: 'mc-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  elements: Elements;
  card: StripeElement;
  paymentForm: FormGroup;

  // Disable Buttons while Loading
  loading: boolean = false;
  // Handle errors
  paymentFormErrors = {
    type: 'success',
    message: ``
  };

  cardHolderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  message: string;

  //stripe = Stripe(environment.stripeKey);

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private _zone: NgZone
  ) { }

  ngOnInit() {
    // TODO Add API call to get the stripe public key so it is not stored on the codebase
    this.stripeService.elements()
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                //color: '#31325F',
                lineHeight: '1.5',
                //fontWeight: 300,
                fontSize: '16px',
                /*'::placeholder': {
                  color: '#CFD7E0'
                }*/
              }
            }
          });
          this.card.mount('#card-element');
        }
      });

  }

  submitPayment() {
    this.loading = true;
    const name = this.cardHolderName;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token);
          this.paymentFormErrors.type = 'success';
          this.paymentFormErrors.message = result.token.toString();
          this.loading = false;
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
          this.paymentFormErrors.type = 'danger';
          this.paymentFormErrors.message = result.error.message;
          this.loading = false;
        }
      });
  }

  getToken(event) {
    this.loading = true;
    console.log('hi');
    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
    }, (status: number, response: any) => {

      // Wrapping inside the Angular zone
      this._zone.run(() => {
        if (status === 200) {
          this.message = `Success! Card token ${response.card.id}.`;
        } else {
          this.message = response.error.message;
        }
      });
    });
  }

}
