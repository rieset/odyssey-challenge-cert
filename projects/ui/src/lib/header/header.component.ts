import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core'
import {
  APP_CONSTANTS,
  AppConstantsInterface
} from '@constants'
import { SignerService } from '@services/signer/signer.service'
import { SignerUser } from '@services/signer/signer.model'
import { Observable, of } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { translate } from '@ngneat/transloco'
import { Router } from '@angular/router'
import { UserService } from '@services/user/user.service'
import { RoleEnum, UserDataInterface } from '@services/user/user.interface'
import { Location } from '@angular/common'

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public readonly user$: Observable<UserDataInterface> = this.userService.user
  public RoleEnum = RoleEnum;

  constructor (
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    private snackBar: MatSnackBar,
    public router: Router,
    public userService: UserService,
    private location: Location
  ) {}

  ngOnInit (): void {}

  signupHandler () {
    this.userService.login().subscribe(() => {
    }, (error) => {
      this.snackBar.open(error, translate('messages.ok'))
    })
  }

  logoutHandler () {
    this.userService.logout().subscribe(() => {
    }, (error) => {
      this.snackBar.open(error, translate('messages.ok'))
    })
  }

  goBack (): void {
    this.location.back()
  }
}
