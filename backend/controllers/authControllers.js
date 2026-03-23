import { User } from "../models/userModel.js";

export const register =  async (req, res) => {
    try {
        const { name, email, password, confirmPassword, contactNumber, role} = req.body;

        const exist = await User.findOne({email : email.toLowerCase()});

        if(exist) return res.status(400).json({message: "Email already exist!"});

        if (password !== confirmPassword){
            return res.status(400).json({message: "Password do not match"});
        }

        await User.create({
            name,
            email,
            password,
            contactNumber,
            role
        })

        res.status(201).json({message: "User registered successfully"});
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}




