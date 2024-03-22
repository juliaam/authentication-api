const UserService = require('../services/user')

    module.exports = {
    async register(req, res) {
        const { name, email, password } = req.body
        try {
            const user = await UserService.register({ name, email, password })
            if(!user) {
                return res.status(400).send('Algo deu errado, não foi possível criar um usuário')
            }
            return res.status(201).send(user)
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
// }

// module.exports = UserController