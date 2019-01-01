import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from './http.service';
import { ShippingInfo, Address } from 'src/app/shared/models/shipping-info';

describe('HttpService', () => {
  let authService: HttpService;

  beforeEach(() => {
    authService = new HttpService();
  });

  it('should call sendData and return Observable result', () => {    
    let data = new ShippingInfo();

    let fromAddress = new Address()
    fromAddress.name = 'from-name'
    fromAddress.street = 'from-street'
    fromAddress.city = 'from-city'
    fromAddress.state = 'from-state'
    fromAddress.zip = 'from-zip';

    let toAddress  = new Address();
    toAddress.name = 'to-name'
    toAddress.street = 'to-street'
    toAddress.city = 'to-city'
    toAddress.state = 'to-state'
    toAddress.zip = 'to-zip';

    data.from = fromAddress;
    data.to   = toAddress;
    data.weight = 100;
    data.shippingOption = 1

    authService.sendData(data).toPromise().then((res) => {
      expect(res).toBeTruthy();
    });
  });
});
