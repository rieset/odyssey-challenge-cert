import { Inject, Injectable } from '@angular/core'
import { OtherDataInterface, RoleEnum, UserDataInterface } from '@services/user/user.interface'
import { SignerService } from '@services/signer/signer.service'
import { ContractService } from '@services/contract/contract.service'
import { BehaviorSubject, combineLatest, Observable } from 'rxjs'
import { map, take, tap } from 'rxjs/operators'
import { API, AppApiInterface } from '@constants'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userData$ = new BehaviorSubject<UserDataInterface>({
    userRole: RoleEnum.unauthorized,
    userAddress: ''
  })

  constructor (
    @Inject(API) private readonly api: AppApiInterface,
    private signerService: SignerService,
    private contractService: ContractService
  ) {
    combineLatest([
      this.signerService.user,
      this.contractService.stream
    ]).pipe(map(([user, contract]) => {
      console.log('User', user)

      if (user.address) {
        let role = RoleEnum.authorized

        if (contract?.working?.members?.value.indexOf(';' + user.address)) {
          role = RoleEnum.workingGroup
        }

        if (contract?.dao?.members?.value.indexOf(';' + user.address)) {
          role = RoleEnum.DAOMember
        }

        if (this.api.contractAddress === user.address) {
          role = RoleEnum.master
        }

        return {
          userAddress: user.address,
          userRole: role
        }
      }

      return {
        userRole: RoleEnum.unauthorized,
        userAddress: ''
      }
    }))
      .subscribe((user: UserDataInterface) => {
        this.userData$.next(user)
      })
  }

  public get user (): Observable<UserDataInterface> {
    return this.userData$.pipe()
  }

  public login () {
    return this.signerService.login()
  }

  public logout () {
    return this.signerService.logout()
      .pipe(tap(() => {
        this.userData$.next({
          userRole: RoleEnum.unauthorized,
          userAddress: ''
        })
      }))
  }
}
