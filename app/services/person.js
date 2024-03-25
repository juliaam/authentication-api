const Person = require('../models/person')

module.exports = {
     async create(body) {
          const person = await Person.create({
               name: body.name
          })

          return { person }
     }
}
