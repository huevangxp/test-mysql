const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('huevang-db', 'root', '', {
    host: "localhost",
    dialect: 'mysql',
    port: 3306,
    logging: false
})

sequelize.authenticate().then(() => {
    console.log('Connect Server Successfully');
}).catch ((error) => {
    console.log(error);
})

sequelize.sync()
module.exports = sequelize;