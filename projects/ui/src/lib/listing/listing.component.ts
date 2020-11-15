import { Component, Inject, OnInit } from '@angular/core'
import { CERTS, CERTS_PROVIDERS } from './listing.providers'
import { ContractCertificateModel } from '@services/contract/contract.model'
import { LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'
import { BehaviorSubject, combineLatest, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  providers: CERTS_PROVIDERS
})
export class ListingComponent implements OnInit {
  private current$ = new BehaviorSubject<number>(0);

  public view$: Observable<ContractCertificateModel> = combineLatest([this.certs.data$, this.current$])
    .pipe(
      map(([list, current]) => {
        return {
          ...list[current]
        }
      })
    )

  constructor (
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
      @Inject(CERTS) public readonly certs: LoadingWrapperModel<ContractCertificateModel[]>
  ) { }

  ngOnInit (): void {}

  trackByFn (index: number) {
    return index
  }

  setCurrentCard (index: number) {
    this.current$.next(index)
  }
}
