import dbConnect from "../../../../server/db/dbConnect";
import jwt from "jsonwebtoken";
import User from "../../../../server/schemas/UserSchema";
import cookie from "cookie";

const JWT_SECRET = "salksfhklaskdjfkshalkjfjlasdlfs";

export default async function getUser(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const isCookie = req.headers.cookie && cookie.parse(req.headers.cookie);
    const jsonToken = isCookie && isCookie.lifebook_auth_token;
    if (jsonToken) {
      let decode = {};
      await jwt.verify(jsonToken, JWT_SECRET, (err, data) => {
        if (err) {
          const options = {
            secure: process.env.NODE_ENV !== "development",
            httpOnly: true,
            sameSite: "strict",
            path: "/",
            maxAge: 1
          };
          res.setHeader(
            "set-cookie",
            cookie.serialize("lifebook_auth_token", "invalid token", options)
          );
          res.status(404).json({
            message: "invalid web token"
          });
        }
        decode = data;
      });

      if (decode) {
        const findUser = await User.findById(decode.id, [
          "email",
          "username",
          "name.firstName",
          "name.lastName",
          "_id",
          "profile.profileImage",
          "profile.coverImage"
        ]);
        res.status(200).json({
          findUser,
          message: "User Found"
        });
      }
    } else {
      res.status(401).json({
        message: "No web token found!"
      });
    }
  } else {
    res.status(405).json({
      message: "Invalid request method!"
    });
  }
}
