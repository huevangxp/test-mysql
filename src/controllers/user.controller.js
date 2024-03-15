const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username && !password) {
            return res.status(404).json({message:"Invalid username and password"})
        }

        const checkUsername = await User.findOne({ where: { username: username } })
        if (checkUsername) {
            return res.status(404).json({message: "this username already!"})
        }

        const changePass = await bcrypt.hash(password, 10)
        if (!changePass) {
            return res.status(404).json({message: 'this password not change'})
        }
        
        const newData = {
            username: username,
            password: changePass
        }

        console.log(newData);

        await User.create(newData);
        return res.status(201).json({message:"create successfully"})
    } catch (error) {
        return res.status(500).json({message: 'Server Error', error})
    }
}

exports.signin = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username && !password) {
            return res.status(404).json({message:"Invalid username and password"})
        }

        const user = await User.findOne({ where: { username: username } })
        if (!user) {
            return res.status(404).json({ message: "Invalid User" })
        }

        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) {
            return res.status(404).json({message:'Password Inccorect'})
        }
        const users = {
            username: user.username
        }
        const token = await jwt.sign(users, 'huevang-token', {expiresIn: '7d'})
        
        return res.status(200).json({ message:"login success", token : token})
    } catch (error) {
        return res.status(500).json({message:"Server Error", error})
    }
}

exports.getOne = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({message:"Invalid User ID"})
        }
        const getUser = await User.findByPk(id)
        if (!getUser) {
            return res.status(404).json({message:"this user not found"})
        }
        return res.status(200).json({users:getUser})
    } catch (error) {
        return res.status(500).json({message:'Server Error', error})
    }
}

exports.getAll = async (req, res) => {
    try {
        const getAll = await User.findAndCountAll()
        if (!getAll) {
            return res.status(404).json({ message:"this table no user data "})
        }
        return res.status(200).json({message:'select all users', users: getAll})
    } catch (error) {
        return res.status(500).json({message:"Server Error", error})
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;

        if (!id) {
            return res.status(404).json({ message: "Invalid User ID" })
        }
        if (!username && !password) {
            return res.status(404).json({ message: "Invalid Username and password" })
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "this user not found" })
        }
        const newPassword = await bcrypt.hash(password, 10)
        if (!newPassword) {
            return res.status(404).json({ message: "Invalid Password" })
        }

        const newData = {
            username: username,
            password: newPassword
        }
        await user.update(newData)
        return res.status(201).json({message: 'update success', username: user.username})
    } catch (error) {
        return res.status(500).json({message: 'Server Error', error})
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
           return res.status(404).json({message: 'Invalid User ID'})
        } 
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message:"this user not found"})
        }
        await user.destroy();

        return res.status(200).json({message:'delete success', username: user.username})
    } catch (error) {
        return res.status(500).json({message:"Server Error", error})
    }
}