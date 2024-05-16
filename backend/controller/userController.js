const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSignup = async (req, res) => {
    try {
        
        const { firstName, lastName, email, password } = req.body;
        const emailFound = await User.findOne({
            where: {
                email
            },
        })
        if (emailFound) {
            return res.status(400).json({error: 'Email already exist'});
        }

        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)
        const hash = await bcrypt.hash(password, salt)
            await User.create({ firstName, lastName, email, password: hash });
        res.status(200).json({message: 'User Created'})

    } catch (error) {
        console.error('Internal server error: ', error)
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({
        where: {
            email
        }
    })
    if (!user) {
        return res.status(404).json({ error: 'Email not found' })
    }
    const firstName = user.firstName;
    const lastName = user.lastName;
    const userID = user.userId;
    const passwordVerified = await bcrypt.compare(password, user.password)
    
    if (passwordVerified) {
        const token = jwt.sign(user.dataValues ,process.env.SECRET)
        res.status(200).json({token, firstName, lastName, userID })
    } else {
        res.status(401).json({ error: 'Incorrect password' })
    }

}

module.exports = {
    userSignup,
    userLogin,
}