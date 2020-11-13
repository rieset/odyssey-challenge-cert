import { Component, Inject, OnInit } from '@angular/core'
import {
  FormBuilder, FormControl, FormGroup, FormGroupDirective,
  Validators
} from '@angular/forms'
import { StateMatcher } from '@libs/state-matcher/state-matcher'
import { DialogParams, DIALOG_DATA } from '@ui/dialog/dialog.tokens'
import { SignerService } from '@services/signer/signer.service'
import { ContractService } from '@services/contract/contract.service'
import { BehaviorSubject } from 'rxjs'
import { IWithApiMixin, IWithId } from '@waves/ts-types'

@Component({
  selector: 'ui-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrls: ['./create-certificate.component.scss']
})
export class CreateCertificateComponent {
  public transactionId$: BehaviorSubject<string> = new BehaviorSubject('');

  public matcher = new StateMatcher();

  public form: FormGroup;

  public details: FormGroup;

  constructor (
      private readonly fb: FormBuilder,
      @Inject(DIALOG_DATA) public params: DialogParams,
      private contractService: ContractService
  ) {
    this.form = this.fb.group({
      title: [null, [Validators.required]]
    })

    this.details = this.fb.group({
      description: [null, [Validators.required]],
      author: [null, [Validators.required]],
      company: [null, [Validators.required]],
      link: [null]
    })

    console.log('params', params)
  }

  close () {
    this.transactionId$.next('')
    this.params.dialogRef.close()
  }

  create () {
    this.contractService.createCertificate(this.form.get('title')?.value)
      .subscribe((data) => {
        console.log('Data result after transaction', data)
        // @ts-ignore
        const dt = data as IWithId
        this.transactionId$.next(dt?.id || '')
      })
  }

  update () {
    this.contractService.certificateDescription(
      this.transactionId$.getValue(),
        this.details.get('description')?.value,
        this.details.get('author')?.value,
        this.details.get('company')?.value,
        this.details.get('link')?.value
    )
      .subscribe((data) => {
        console.log('Data result after transaction update description', data)
        this.contractService.refresh()
        this.close()
      })
  }
}
