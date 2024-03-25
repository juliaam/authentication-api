const UserService = require('../services/user')
const PersonService = require('../services/person')
const sequelize = require('../../db')

module.exports = {
    async register(req, res) {
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
            res.status(400).send({ message: error.message })
        }
    },
    async FindAll(req, res) {
        try {
            const users = UserService.FindAll()
            res.status(201).send(users)
        } catch (error) {
            res.status(400).send('Não foi possível')
        }
    },
    async FindById(req, res) {
    }


}
