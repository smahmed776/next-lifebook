import dbConnect from "../../../../server/db/dbConnect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../../server/schemas/UserSchema";
import cookie from "cookie";

const JWT_SECRET = "salksfhklaskdjfkshalkjfjlasdlfs";

const jwtToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET);
};

const sendToken = (user, statusCode, req, res) => {
  const token = jwtToken(user._id);
  const options = {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60
  };
  res.setHeader(
    "set-cookie",
    cookie.serialize("lifebook_auth_token", token, options)
  );

  res.status(statusCode).json({
    message: "Logged in!"
  });
  res.end();
};

export default async function handleLogin(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (email && password) {
      try {
        const findUser = await User.findOne({ email }).select("+password");

        if (!findUser)
          return res.status(400).json({ message: `User doesn't exist!` });
        const compare = await bcrypt.compare(password, findUser.password);

        if (compare) {
          sendToken(findUser, 200, req, res);
        } else {
          return res.status(401).json({ message: "Password invalid" });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({
          error,
          message: "internal server error"
        });
      }
    } else {
      return res.status(404).json({ message: "Missing Informations!" });
    }
  } else {
    return res.status(405).json({ message: "Invalid Request Method" });
  }
}
