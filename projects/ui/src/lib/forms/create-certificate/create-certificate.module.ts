import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CreateCertificateComponent } from './create-certificate.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [CreateCertificateComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslocoModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CreateCertificateModule { }
