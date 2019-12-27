declare namespace Express {
  interface Request {
    user: any
    isAuthenticated()
  }
}