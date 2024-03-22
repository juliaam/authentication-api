const User = require('../models/user')

module.exports = {
     async register(body){
          const user = await User.findOne({
               where: {
                    id: dto.id
               }
          })
          if (user) {
               throw new Error('User already exists')
          }
     },
     async FindAll(){
          const users = await User.FindAll()
          return users
     }
}
