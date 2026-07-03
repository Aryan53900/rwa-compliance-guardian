const login = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === "admin@guardian.ai" &&
    password === "admin123"
  ) {
    return res.json({
      success: true,
      token: "demo-token",
      user: {
        name: "Admin",
        email,
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
};