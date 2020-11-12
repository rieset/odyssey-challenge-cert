import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  map,
  publishReplay,
  refCount,
  repeatWhen,
  switchMap, takeUntil,
  tap
} from 'rxjs/operators'
import { API, AppApiInterface } from '@constants'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import {
  ContractCertificateModel,
  ContractDataModel,
  ContractRawData,
  ContractRawDataEntityId,
  ContractRawDataNumber,
  ContractRawDataString
} from './contract.model'
import { PreloaderService } from '@services/preloader/preloader.service'

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiGetAddressData = new URL('/addresses/data/' + this.api.contractAddress, this.api.rest)

  private contractRefresh$: Subject<null> = new Subject()

  private readonly contractState = this.http.get<Observable<ContractRawData>>(this.apiGetAddressData.href, {
    headers: {
      accept: 'application/json; charset=utf-8'
    }
  }).pipe(
    // @ts-ignore
    repeatWhen(() => this.contractRefresh$),
    map((data: ContractRawData) => {
      return this.prepareData(data)
    }),
    tap((data) => {
      this.preloaderService.load()
      console.log('Origin contract data :: projects/services/src/lib/contract/contract.service.ts: 47\n\n', data)
    }),
    publishReplay(1),
    refCount()
  )

  public readonly stream: Observable<ContractDataModel> = this.contractState.pipe(
    publishReplay(1),
    refCount()
  )

  public readonly streamTasks: Observable<ContractCertificateModel[]> = this.contractState.pipe(map((contract) => {
    console.log('contract', contract)
    if (!contract?.template) {
      return []
    }

    return Object.keys(contract?.template).map((entityKey: string) => {
      return {
        ...contract?.template[entityKey],
        id: entityKey
      }
    })
  }))

  constructor (
      private readonly http: HttpClient,
      private readonly preloaderService: PreloaderService,
      @Inject(API) private readonly api: AppApiInterface
  ) {}

  private group (keys: string[], context: {[s: string]: object}, value: ContractRawDataString|ContractRawDataNumber): void {
    // Todo поправить типизацию, пришлось лезть в контракт и переделывать структуру данных
    // @ts-ignore
    const key: string = keys.shift()

    if (!key) {
      return
    }

    if (!context[key]) {
      context[key] = keys.length === 0 ? value : {}
    }

    // Todo поправить типизацию, пришлось лезть в контракт и переделывать структуру данных
    // @ts-ignore
    return this.group(keys, context[key], value)
  }

  private prepareData (data: ContractRawData): ContractDataModel {
    // Todo поправить типизацию, пришлось лезть в контракт и переделывать структуру данных
    // @ts-ignore
    return data.reduce((orig, item) => {
      const keys = item.key.split('_')
      this.group(keys, orig, item)
      return orig
    }, {})
  }

  public entityById (entityId: ContractRawDataEntityId): Observable<ContractCertificateModel> {
    return this.stream.pipe(map((data) => {
      return data?.template[entityId]
    }))
  }
}
