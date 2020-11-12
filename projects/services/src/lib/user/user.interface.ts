import { environment } from '../../../../dapp/src/environments/environment'

export enum RoleEnum {
  unauthorized,
  authorized,
  DAOMember,
  workingGroup,
  master
}

export interface UserDataInterface {
    userRole: RoleEnum,
    userAddress: string
}

export interface OtherDataInterface {
  DAOGroupAddress: string[],
  WorkingGroupAddress: string[],
  masterAddress: string
}
