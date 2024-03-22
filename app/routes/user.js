const { Router } = require("express")
const router = Router()
const UserController = require('../controllers/user')

router.get('/byId/:id')
router.get('/all', UserController.FindAll)
router.post('/')
router.patch('/:id')
router.delete('/:id')

module.exports = router 

