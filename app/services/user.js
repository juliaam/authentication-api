const User = require('../models/user')

module.exports = {
     async register(person, bodyPerson, tr){
          if(!tr) {
               const user = await User.create({
                    id_person: person.id,
                    email: bodyPerson.email,
                    password: bodyPerson.password,
                    isActive: 1,
                    created_at: new Date()
               })
               return {user, person} 
          }
          const user = await User.create({
               id_person: person.id,
               email: bodyPerson.email,
               password: bodyPerson.password,
               isActive: 1,
               created_at: new Date()
          }, { transaction: tr })
          return {user, person} 
     },
     async FindAll(){
          const users = await User.FindAll()
          return users
     }
}
