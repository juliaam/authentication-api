import PersonService from '../services/person.js';

const PersonController = {
    async Create(req, res) {
        const { name } = req.body;
        try {
            const person = await PersonService.create({ name });
            if (!person) {
                return res.status(400).send('Algo deu errado, não foi possível criar uma pessoa');
            }
            return res.status(201).send(person);
        }
        catch (error) {
            res.status(400).send({ message: error.message });
        }
    },

    async Update(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const person = await PersonService.update(id, { name });
            if (!person) {
                return res.status(400).send('Algo deu errado, não foi possível atualizar a pessoa');
            }
            return res.status(201).send(person);
        }
        catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`);
        }
    },

    async FindAll(req, res) {
        try {
            const people = await PersonService.findAll();
            res.status(201).send(people);
        } catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`);
        }
    },

    async FindById(req, res) {
        try {
            const { id } = req.params;
            const person = await PersonService.findById(id);
            if (!person) {
                throw new Error(`Não foi possível encontrar essa pessoa`);
            }
            res.status(201).send(person);
        } catch (error) {
            res.status(400).send(`Algo deu errado com essa requisição, error: ${error.message}`);
        }
    }
};

export default PersonController;
