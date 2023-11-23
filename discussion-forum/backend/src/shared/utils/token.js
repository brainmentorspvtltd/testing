import jwt from "jsonwebtoken";
const SECRET = "iamthesecret";
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    },
    SECRET,
    { expiresIn: "1h" }
  ); // 1 hour expiry
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (err) {
    throw err;
  }
};
