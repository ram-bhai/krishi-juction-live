import { TestBed } from '@angular/core/testing';

import { ContractFarmingService } from './contract-farming.service';

describe('ContractFarmingService', () => {
  let service: ContractFarmingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractFarmingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
