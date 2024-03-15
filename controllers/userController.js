const userModel = require('../models/userModels')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userModel({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Registered successfully", success: true });
    } catch (error) {
        console.error("Error in registerController:", error);
        res.status(500).json({ success: false, message: "Error in registerController" });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password", success: false });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ message: "Logged in successfully", success: true, token });
    } catch (error) {
        console.error("Error in loginController:", error);
        res.status(500).json({ success: false, message: "Error in loginController" });
    }
};

module.exports = {registerController, loginController};