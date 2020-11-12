import { Component, Input, OnInit } from '@angular/core'
import { ContractCertificateModel } from '@services/contract/contract.model'
import { UserService } from '@services/user/user.service'

@Component({
  selector: 'ui-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {
  @Input() grant: ContractCertificateModel = {}

  constructor (public userService: UserService) {}

  ngOnInit (): void {

  }
}
