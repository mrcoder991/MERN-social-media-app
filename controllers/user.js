import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


import User from '../models/user.js';

dotenv.config();

const JWTSECRET = process.env.JWTSECRET

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "User dosen't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(404).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, JWTSECRET, { expiresIn: '7d' });

        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json({message: 'Something Went Wrong.', error})
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords Don't Match" });
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
        
        const token = jwt.sign({ email: result.email, id: result._id }, JWTSECRET, { expiresIn: '7d' });

        res.status(200).json({result, token})

    } catch (error) {
        res.status(500).json({message: 'Something Went Wrong.', error})
    }
}