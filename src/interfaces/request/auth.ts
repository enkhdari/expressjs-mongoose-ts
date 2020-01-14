import { Required } from "@tsed/common"

export class LoginRequest {
  @Required()
  email: string

  @Required()
  password: string
}
