import User from '../models/user.js';

export default {
     async register(person, bodyPerson, tr) {
          if (!tr) {
               const user = await User.create({
                    id_person: person.id,
                    email: bodyPerson.email,
                    password: bodyPerson.hashedPassword,
                    isVerified: 0,
                    created_at: new Date()
               });
               return { user, person };
          }
          const user = await User.create({
               id_person: person.id,
               email: bodyPerson.email,
               password: bodyPerson.hashedPassword,
               isVerified: 0,
               created_at: new Date()
          }, { transaction: tr });
          return { user, person };
     },
     async findAll() {
          const users = await User.findAndCountAll();
          return users;
     },
     async findById(id) {
          try {
               const user = await User.findOne({
                    where: {
                         id: id
                    }
               });
               return user;
          } catch (error) {
               return error;
          }
     },
     async update(id, body, tr) {
          if (!tr) {
               const user = await User.update(body, {
                    where: {
                         id: id
                    }
               });
          }
          const user = await User.update(body, {
               where: {
                    id: id
               }
          }, { transaction: tr });
          return user;
     },
     async delete(id, tr) {
          if (!tr) {
               const user = await User.destroy({
                    where: {
                         id: id
                    }
               });
               return user;
          }
          const user = await User.destroy({
               where: {
                    id: id
               }
          }, { transaction: tr });
          return user;
     }
};
