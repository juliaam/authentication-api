const User = require('../models/user')
const Person = require('../models/person')

module.exports = {
     async register(person, bodyPerson){
          const user = await User.create({
               id_person: person.id,
               email: bodyPerson.email,
               password: bodyPerson.password,
          })

          return {user, person} 
          
     },
     async FindAll(){
          const users = await User.FindAll()
          return users
     }
}
