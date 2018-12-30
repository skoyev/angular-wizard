import { Injectable } from '@angular/core';
import { Subscriber, Observable, Subject } from 'rxjs';
import { ShippingInfo } from 'src/app/shared/models/shipping-info';

@Injectable()
export class HttpService {
  constructor() {}

  sendData(shipping:ShippingInfo): Observable<any> {
    const response = new Subject();

    // immitate back end call
    setTimeout(() => {
        console.log(`Shipping data http request is: ${JSON.stringify(shipping)}`)
        response.next(true);    
    }, 3000)

    return response.asObservable();
  }
}