const controller = require('../controllers/book.controller')

module.exports = (app) => {
    app.post('/create-book', controller.createBook)
    app.get('/getAll-book', controller.selectBook)
    app.get('/getOne-book/:id', controller.selectOne)
    app.delete('/delete-book/:id', controller.delete)
    app.put('/update-book/:id', controller.update)
}