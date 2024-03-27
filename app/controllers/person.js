const PersonService = require('../services/person')

module.exports = {
    async create(req, res) {
        const { name } = req.body
        try {
            const person = await PersonService.create({ name })
            if (!person) {
                return res.status(400).send('Algo deu errado, não foi possível criar uma pessoa')
            }
            return res.status(201).send(person)
        }
        catch (error) {
            res.status(400).send({ message: error.message })
        }
    },
    async Update(req, res) {
        const { name } = req.body
        try {
            const person = await PersonService.update(id, {name})
            if (!person) {
                return res.status(400).send('Algo deu errado, não foi possível criar uma pessoa')
            }
            return res.status(201).send(person)
        }
        catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`)
        }
    }
    // async FindAll(req, res) {
    //     try {
    //         const users = UserService.FindAll()
    //         res.status(201).send(users)
    //     } catch (error) {
    //         res.status(400).send('Não foi possível')
    //     }
    // },
    // async FindById(req, res) {
    // }


}
