import UserService from '../services/user.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const AuthController = {
    async Login(req, res) {
        const { email, password} = req.body;
        try {
            const user = await UserService.findByEmail(email)
            console.log(password, user.password)
            const userAllowed = await bcrypt.compare(password, user.password)

            if (!userAllowed) {
               return res.status(403).send(`Acesso negado`)
            }

            const token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: 900 // expires in 5min
            });

            return res.status(201.).send({ auth: true, token: token });
        } catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`);
        }
    },
    async LogOut() {
        return res.status(200).send({ auth: false, token: null })
    },
};

export default AuthController;