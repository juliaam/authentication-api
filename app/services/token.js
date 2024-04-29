import TokenConfirm from '../models/tokenconfirm.js'
import CryptoJS from 'crypto-js'

export default {
    async create(userId, tr) {
        const randomBytes = CryptoJS.lib.WordArray.random(16);
        const setToken = randomBytes.toString(CryptoJS.enc.Hex)
        if (!tr) {
            const token = await TokenConfirm.create({
                id_user: userId,
                token: setToken
            });
            return token;
        }
        const token = await TokenConfirm.create({
            id_user: userId,
            token: setToken
        }, { transaction: tr });
        return token;
    },
    async findById(id) {
        const token = await TokenConfirm.findOne({
            where: {
                id: id
            }
        })
        return token
    },
    async findByToken(token) {
        const result = await TokenConfirm.findOne({
            where: {
                token: token
            }
        })
        return result
    },
    async delete(id) {
        const token = await TokenConfirm.destroy({
            where: {
                id: id
            }
        })
        return token
    }
};
