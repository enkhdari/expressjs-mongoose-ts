const faker = require('faker')
const ObjectID = require('mongodb').ObjectID

module.exports = [
  {
    _id: new ObjectID('5e05809df2b4dc2d840377a3'),
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    personId: new ObjectID('5e0579529430ea01c83c0381'),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
]