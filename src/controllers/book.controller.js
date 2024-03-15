const Book = require('../models/book.model')

exports.createBook = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!name && !description && !price) {
        return res.status(404).json({message:"Invalid book name, description and price"})
        }
        const book = await Book.findOne({ where: { name: name } })
        if (book) {
            return res.status(404).json({message:'this book already'})
        }
        const createBook = await Book.create({ name, description, price })
        return res.status(201).json({message:"create Successfully", book:createBook.name})
    } catch (error) {
        return res.status(500).json({message: 'Server Error', error})
    }
}

exports.selectBook = async (req, res) => {
    try {
        const book = await Book.findAndCountAll()
        if (!book) {
            return res.status(404).json({message:'this book table no data'})
        }
        return res.status(200).json(book)
    } catch (error) {
        return res.status(500).json({message:'Server Error', error})
    }
}
exports.selectOne = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({message:'Invalid Book ID'})
        }
        const book = await Book.findByPk(id)
        if (!book) {
            return res.status(404).json({message:'this book table no data'})
            
        }
        return res.status(200).json(book)
    } catch (error) {
        return res.status(500).json({message:'Server Error', error})
    }
}
exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({message:'Invalid Book ID'})
        }
        const book = await Book.findByPk(id)
        if (!book) {
            return res.status(404).json({message:'this book table no data'})
            
        }
        const deleteBook = await book.destroy()
        return res.status(200).json({message:'delete book success', bookName: deleteBook.name})
    } catch (error) {
        return res.status(500).json({message:'Server Error', error})
    }
}
exports.update = async (req, res) => {
    try {
        const { id } = req.params
        // console.log(id);
        const { name, description, price } = req.body;
        if (!id) {
            return res.status(404).json({message:'Invalid Book ID'})
        }
        const book = await Book.findByPk(id)
        if (!book) {
            return res.status(404).json({message:'this book table no data'})
            
        }
        const dataBook = {
            name, 
            description, 
            price
        }
        const updateBook = await book.update(dataBook)
        return res.status(200).json({message: 'update book success', bookName: updateBook.name})
    } catch (error) {
        return res.status(500).json({message:'Server Error', error})
    }
}