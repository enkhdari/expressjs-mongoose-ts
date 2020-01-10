export class BaseController {

  returnData(data) {
    return { success : true , data }
  }

  returnSuccess(success: boolean) {
    return { success }
  }

  returnError(error) {
    return { success: false, error }
  }

}