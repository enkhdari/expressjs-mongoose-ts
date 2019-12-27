const faker = require('faker')
const ObjectID = require('mongodb').ObjectID

module.exports = [
  {
    _id: new ObjectID('5e0579529430ea01c83c0381'),
    country: faker.address.country(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumber(),
    birthDate: faker.date.past(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
]