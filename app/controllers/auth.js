import PersonService from '../services/person.js';
import UserService from '../services/user.js';
import AuthService from '../services/auth.js';
import sequelize from '../../db.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const AuthController = {
    async Register(req, res) {
        const { name, email, password } = req.body;
        try {
            const result = await sequelize.transaction(async (tr) => {
                const person = await PersonService.create({ name }, tr);
                const hashedPassword = await bcrypt.hash(password, 10)
                const user = await UserService.register(person.dataValues, { email, hashedPassword }, tr);
                if (!user) {
                    return res.status(400).send('Algo deu errado, não foi possível registrar o usuário');
                }
                return res.status(201).send(user);
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
};

export default AuthController;