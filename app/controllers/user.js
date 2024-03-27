const UserService = require('../services/user')
const PersonService = require('../services/person')
const sequelize = require('../../db')

module.exports = {
    async Register(req, res) {
        const { name, email, password } = req.body
        try {
            const result = await sequelize.transaction(async (tr) => {
                const person = await PersonService.create({ name }, tr)
                const user = await UserService.register(person, { email, password }, tr)
                if (!user) {
                    return res.status(400).send('Algo deu errado, não foi possível criar um usuário')
                }
                return res.status(201).send(user)
            })
            return result
        }
        catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`)
        }
    },
    async Update(req, res) {
        try {
            const result = await sequelize.transaction(async (tr) => {
                const { id } = req.params
                const { name } = req.body

                const { id_person: idPerson } = await UserService.findById(id)

                await PersonService.update(idPerson, { name }, tr)
                await UserService.update(id, req.body, tr)

                const person = await PersonService.findById(idPerson)
                const user = await UserService.findById(id)

                res.status(201).send({ person, user })
            })
            return result

        } catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`)
        }
    },
    async FindAll(req, res) {
        try {
            const users = await UserService.FindAll()
            res.status(201).send(users)
        } catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`)
        }
    },
    async FindById(req, res) {
        try {
            const { id } = req.params
            const user = await UserService.findAll(id)
            res.status(201).send(user)

        } catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`)
        }
    },
    async Delete(req, res) {
        try {
            const { id } = req.params
            const {id_person: idPerson} = await UserService.findById(+id)

            const result = await sequelize.transaction(async (tr) => {
                const user = await UserService.delete(id, tr)
                const personDeleted = await PersonService.delete(idPerson, tr)

                res.status(201).send({user, personDeleted})
            })
            return result
        } catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`)
        }
    }

}
