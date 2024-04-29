import PersonService from '../services/person.js';
import UserService from '../services/user.js';
import AuthService from '../services/auth.js';
import TokenService from '../services/token.js'
import sequelize from '../../db.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js';
import { sendEmail } from '../services/mail.js'

const AuthController = {
    async Register(req, res) {
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
                const route = `${process.env.BASE_URL}/api/auth/verify/${userId}/${token.token}`

                const message = route;
                await sendEmail(user.user.email, "Verifique seu email", message);

                return res.status(201).send('Um email foi enviado pra sua conta, por favor, verifique');
            });
            return result;
        } catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`);
        }
    },
    async Login(req, res) {
        const { emailBody, password } = req.body;
        try {
            const user = await AuthService.findByEmail(emailBody)
            const userAllowed = await bcrypt.compare(user.password, emailBody)
            if (userAllowed) {
                const token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 300 // expires in 5min
                });
                return res.status(201.).send({ auth: true, token: token });
            }
        } catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`);
        }
    },
    async LogOut() {
        return res.status(200).send({ auth: false, token: null })
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

            res.send({message: "Email verificado com sucesso!"});
        } catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`);
        }
    }
};

export default AuthController;