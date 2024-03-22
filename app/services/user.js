const User = require('../models/user')
const Person = require('../models/person')

module.exports = {
     async register(body){
          const person = await Person.create({
               name: body.name
          })
          const user = await User.create({
               id_person: person.id,
               email: body.email,
               password: body.password,
          })

          return {user, person} 
          
     },
     async FindAll(){
          const users = await User.FindAll()
          return users
     }
}
