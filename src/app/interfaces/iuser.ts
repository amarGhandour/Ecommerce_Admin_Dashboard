import {Role} from "./role";

export interface IUser {

  id: string,
  name: string,
  email: string,
  active: boolean
  role: Role,
  token?: string
}
