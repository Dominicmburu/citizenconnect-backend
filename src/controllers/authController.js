const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const { sendWelcomeEmail } = require("../services/notificationService")
const {
  hashPassword,
  generateSalt,
  comparePassword,
} = require("../services/encryptionService");
const { JWT_SECRET } = require("../config/jwt");
const { COOKIE_NAME } = require("../config/config");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const existingUserUsername = await prisma.user.findUnique({
      where: { username },
    });
    
    if (existingUserUsername)
      return res.status(400).json({ message: "Username is already taken" });

    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "CITIZEN",
        // role: "ADMIN",
        salt,
      },
    });

    await sendWelcomeEmail(newUser.email, newUser.username);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isValidPassword = comparePassword(password, user.password, user.salt);
    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Login successful", token,
      // user: {
      //   id: user.id,
      //   username: user.username,
      //   email: user.email,
      //   role: user.role,
      //   createdAt: user.createdAt,
      //   updatedAt: user.updatedAt,
      // },
     });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login", });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };
