const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Email received:", email);
  console.log("Password received:", password);

  if (email !== DEMO_USER.email) {
    console.log("Email mismatch");
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const validPassword = await bcrypt.compare(
    password,
    DEMO_USER.passwordHash
  );

  console.log("Password valid:", validPassword);

  if (!validPassword) {
    console.log("Password mismatch");
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // ...rest of your code
};