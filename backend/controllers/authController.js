const bcrypt = require("bcrypt");

// Demo user
// Replace the password hash with your actual hash later.
const DEMO_USER = {
    email: "admin@example.com",
    passwordHash: "$2b$10/..." // <-- Replace with your real bcrypt hash
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Email:", email);

        if (email !== DEMO_USER.email) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            DEMO_USER.passwordHash
        );

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        return res.json({
            success: true,
            message: "Login Successful"
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    login
};