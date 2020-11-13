import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header.component'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import { RouterModule } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { DialogModule } from '@ui/dialog/dialog.module'
import { CreateCertificateModule } from '@ui/forms/create-certificate/create-certificate.module'

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    PipesModule,
    RouterModule,
    MatButtonModule,
    DialogModule,
    CreateCertificateModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
