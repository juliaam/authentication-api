const { Router } = require("express")
const router = Router()
const UserController = require('../controllers/user')

router.get('/:id', UserController.FindById)
router.get('/', UserController.FindAll)
router.post('/', UserController.Register)
router.patch('/:id', UserController.Update)
router.delete('/:id', UserController.Delete)

module.exports = router 

