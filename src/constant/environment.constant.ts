export const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017/yourDbName'
export const PORT = process.env.PORT || 3000
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || 1440 // in minutes