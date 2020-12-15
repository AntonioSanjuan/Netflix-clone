import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule  } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { UtilService } from '../../util/utils.service';
import { Validator } from '../../util/modules/validators/validatorModule';
import { ResponseValidator } from '../../util/modules/validators/responses/responseValidatorModule';

describe('[IntegrationTest] AuthService', () => {
    let sut: AuthService;
    let utilServiceStub = {} as UtilService;
    let validatorStub = {} as Validator;
    let responseValidatorStub = {} as ResponseValidator;

    beforeEach(() => {
        responseValidatorStub = { isLoginResponseValid : jest.fn() }
        
        validatorStub = { responseValidator : responseValidatorStub }
        utilServiceStub = { validator: validatorStub };
        TestBed.configureTestingModule({
          imports: [ HttpClientTestingModule ],
          providers: [
            AuthService,
            {provide: AuthService, useValue: utilServiceStub}
          ]
        });
        sut = TestBed.inject(AuthService);
        TestBed.inject(utilServiceStub);
      });

    it('', () => {
    });

});
