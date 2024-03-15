const { DataTypes, UUIDV4 } = require('sequelize')
const sequelize = require('../configs/db')

const Books = sequelize.define('books', {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

module.exports = Books;