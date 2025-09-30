import User from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const TOKEN_EXPIRES = "1d"

const createToken = (userId) => {
    return jwt.sign({
        id: userId
    }, JWT_SECRET_KEY, { expiresIn: TOKEN_EXPIRES })
}

// Register Fnc
export async function registerUser(req, res) {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required !!!"
        })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials !!!"
        })
    }

    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password must be above of 8 characters !!!"
        })
    }

    try {
        if (await User.findOne({ email })) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPass = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPass
        })
        const token = createToken(user._id);


        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

// Login Fnc
export async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password required"
        })
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials!!!"
            })
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials!!!"
            })
        }

        const token = createToken(user._id)

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {

        console.log(err);
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }

}


// Get Current user

export async function getCurrentUser(req, res) {
    try {
        const user = await User.findById(req.user._id).select("name email")

        if (!user) {
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        res.json({
            success: true,
            user
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "server error!!!"
        })
    }
}


// Update user profile
export async function updateProfile(req, res) {
    const { name, email } = req.body

    if (!name || !email || !validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Valid name and email required"
        })
    }

    try {

        const exists = await User.findOne({
            email, _id: {
                $ne: req.user.id
            }
        })

        if (!exists) {
            return res.status(409).json({
                success: false,
                message: "Email already in use by another account"
            })
        }

        const user = await User.findOneAndUpdate(
            req.user.id,
            { name, email },
            { new: true, runValidators: true, select: "name email" }
        )

        res.json({ success: true, user })

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error!!!" })
    }
}

// Change password function
export async function updatePassword(req, res) {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword || newPassword.length > 8) {
        return res.json(400).json({ success: false, message: "Password invalid or too short" })
    }

    try {
        const user = await User.findById(req.user.id).select("password")
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" })
        }

        const match = await bcrypt.compare(currentPassword, user.password)
        if (!match) {
            return res.status(401).json({ success: false, message: "Current password incorrect" })
        }

        user.password = await bcrypt.hash(newPassword, 10)

        await user.save()
        res.json({ success: true, message: "Password changed" })

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "server error!!" })
    }

}