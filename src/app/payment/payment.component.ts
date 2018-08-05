import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormGroup } from "@angular/forms";

import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";

@Component({
  selector: 'mc-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  // Disable Buttons while Loading
  @Input() loading: boolean = false;
  @Output() tokenEmit = new EventEmitter<string>();

  elements: Elements;
  card: StripeElement;
  paymentForm: FormGroup;

  
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
  token: string = ''

  //stripe = Stripe(environment.stripeKey);

  constructor(
    //private fb: FormBuilder,
    private stripeService: StripeService,
    //private _zone: NgZone
  ) { }

  ngOnInit() {
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

  createToken() {
    this.loading = true;
    const name = this.cardHolderName;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          //this.paymentFormErrors.type = 'success';
          //this.paymentFormErrors.message = result.token.toString();
          this.token = result.token.id;
          this.tokenEmit.emit(this.token);
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

}
