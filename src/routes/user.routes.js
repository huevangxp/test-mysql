const controller = require('../controllers/user.controller')

module.exports = (app) => {
    app.post('/signup', controller.signup)
    app.post('/signin', controller.signin)
    app.get('/allUser', controller.getAll)
    app.get('/onlyUser/:id', controller.getOne)
    app.put('/update/:id', controller.update)
    app.delete('/delete/:id', controller.delete)
}