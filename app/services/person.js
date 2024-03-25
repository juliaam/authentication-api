const Person = require('../models/person')

module.exports = {
     async create(body, tr) {
          if(!tr) {
               const person = await Person.create({
                    name: body.name
               })
               return person
          }
          const person = await Person.create({
               name: body.name
          }, { transaction: tr });
          return person
     }
}
