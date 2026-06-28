const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Demo user
const DEMO_USER = {
  id: 1,
  email: "admin@guardian.ai",
  passwordHash: bcrypt.hashSync("admin123", 10),
  name: "Aryan Suthar",
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (email !== DEMO_USER.email) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const validPassword = await bcrypt.compare(
    password,
    DEMO_USER.passwordHash
  );

  if (!validPassword) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: DEMO_USER.id,
      email: DEMO_USER.email,
      name: DEMO_USER.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );

  res.json({
    success: true,
    token,
    user: {
      name: DEMO_USER.name,
      email: DEMO_USER.email,
    },
  });
};

module.exports = {
  login,
};