import { Injectable } from '@angular/core';

import { Validator } from './modules/validators/validatorModule';
@Injectable({
  providedIn: 'root'
})

export class UtilService {
  constructor() {}
  public validator: Validator = new Validator();

}
