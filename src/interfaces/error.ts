class CustomError extends Error {
  status: number
  translate: boolean

  constructor (message, translate = false, status = 400) {
    super(message)
    this.status = status
  }
}
export default CustomError
