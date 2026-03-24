import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register =  async (req, res) => {
    try {
        const { name, email, password, confirmPassword, contactNumber, role} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const lowerCaseEmail = email.toLowerCase();

        const exist = await User.findOne({email : lowerCaseEmail});

        if(exist) return res.status(400).json({message: "Email already exist!"});

        if (password !== confirmPassword){
            return res.status(400).json({message: "Password do not match"});
        }

        await User.create({
            name,
            email: lowerCaseEmail,
            password,
            contactNumber,
            role
        })

        res.status(201).json({message: "User registered successfully"});
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


export const login = async (req, res) => {
    try {
        const { email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const lowerCaseEmail = email.toLowerCase();

        const user = await User.findOne({email : lowerCaseEmail});

        if(!user){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "3h"}
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
};

export const logout = (req, res) => {
    try {
        res.status(200).json({ message: "Logged out successfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}




