import User from '../models/user.js';

export default {
     async findByEmail(email) {
          const user = await User.findOne({
               where: {
                    email: email
               }
          });
          return user;
     }
};
