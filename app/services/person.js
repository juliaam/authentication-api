import Person from '../models/person.js';

export default {
     async create(body, tr) {
          if (!tr) {
               const person = await Person.create({
                    name: body.name
               });
               return person;
          }
          const person = await Person.create({
               name: body.name
          }, { transaction: tr });
          return person;
     },
     async update(id, body, tr) {
          if (!tr) {
               const person = await Person.update(body, {
                    where: {
                         id: id
                    }
               });
               return person;
          }
          const person = await Person.update(body, {
               where: {
                    id: id
               }
          }, { transaction: tr });
          return person;
     },
     async findById(id) {
          const person = await Person.findOne({
               where: {
                    id: id
               }
          });
          return person;
     },
     async findAll() {
          const people = await Person.findAndCountAll();
          return people;
     },
     async delete(id, tr) {
          if (!tr) {
               const person = await Person.destroy({
                    where: {
                         id: id
                    }
               });
               return person;
          }
          const person = await Person.destroy({
               where: {
                    id: id
               }
          }, { transaction: tr });
          return person;
     }
};
