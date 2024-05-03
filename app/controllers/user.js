import UserService from '../services/user.js';
import PersonService from '../services/person.js';
import TokenService from '../services/token.js';
import sequelize from '../../db.js';
import User from '../models/user.js';
import { sendEmail } from '../services/mail.js'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'

const UserController = {
    async Register(req, res) {
        const errors = validationResult(req)

        if (errors.isEmpty()) {
            try {
                const { name, email, password } = req.body;
                const userVerified = await User.findOne({
                    where: {
                        email: email,
                        isVerified: 1
                    }
                })
                if (userVerified) return res.status(400).send("Usuário com esse email já existe!");
                const result = await sequelize.transaction(async (tr) => {
                    const person = await PersonService.create({ name }, tr);
                    const hashedPassword = await bcrypt.hash(password, 10)

                    const user = await UserService.register(person.dataValues, { email, hashedPassword }, tr);
                    const userId = user.user.id
                    if (!user) {
                        return res.status(400).send('Algo deu errado, não foi possível registrar o usuário');
                    }
                    const token = await TokenService.create(userId, tr)
                    const route = `${process.env.BASE_URL}/api/users/verify/${userId}/${token.token}`

                    const message = route;
                    await sendEmail(user.user.email, "Verifique seu email", message);

                    return res.status(201).send('Um email foi enviado pra sua conta, por favor, verifique');
                });
                return result;
            } catch (error) {
                res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`);
            }
        }
        res.status(422).json({ errors: errors.array() })
    },
    async Verify(req, res) {
        const { id, token } = req.params
        try {
            const userFind = await UserService.findById(id)
            if (!userFind) return res.status(400).send("Link inválido!");

            const tokenFind = await TokenService.findByToken(token)
            if (!tokenFind) return res.status(400).send("Link inválido!");

            await UserService.update(id, { isVerified: true })
            await TokenService.delete(tokenFind.id)

            res.send({ message: "Email verificado com sucesso!" });
        } catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`);
        }
    },
    async Update(req, res) {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            try {
                const result = await sequelize.transaction(async (tr) => {
                    const { id } = req.params;
                    const { name } = req.body;

                    const { id_person: idPerson } = await UserService.findById(id);

                    await PersonService.update(idPerson, { name }, tr);
                    await UserService.update(id, req.body, tr);

                    const person = await PersonService.findById(idPerson);
                    const user = await UserService.findById(id);

                    res.status(201).send({ person, user });
                });
                return result;
            } catch (error) {
                res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`);
            }
        }
        res.status(422).json({ errors: errors.array() })
    },
    async FindAll(req, res) {
        try {
            const users = await UserService.findAll();
            res.status(201).send(users);
        } catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`);
        }
    },
    async FindById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.findById(+id);
            if (!user) {
                res.status(404).send('Não foi possível encontrar esse usuário')
                return
            }
            res.status(201).send(user);

        } catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`);
        }
    },
    async Delete(req, res) {
        try {
            const { id } = req.params;
            const { id_person: idPerson, isVerified } = await UserService.findById(+id);

            const result = await sequelize.transaction(async (tr) => {
                if (!isVerified) {
                    await TokenService.delete(id)
                }

                const user = await UserService.delete(id, tr);
                const personDeleted = await PersonService.delete(idPerson, tr);

                res.status(201).send({ user, personDeleted });
            });
            return result;
        } catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`);
        }
    }
};

export default UserController;