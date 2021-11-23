import cookie from "cookie";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../server/db/dbConnect"
import User from "../../../../server/schemas/UserSchema"

const JWT_SECRET = "salksfhklaskdjfkshalkjfjlasdlfs";

export default async function updateuser(req, res) {
  if (req.method === "PUT") {
    await dbConnect();
    const isCookie = cookie.parse(req.headers.cookie);
    const jsonToken = isCookie && isCookie.lifebook_auth_token;
    if (jsonToken) {
      let decode;
      await jwt.verify(jsonToken, JWT_SECRET, (err, data) => {
        if (err){
          return res.status(403).json({
            message: "invalid web token"
          });}
        decode = data;
      });
      const { image, type } = req.body;

      if (type === "profilepic") {
        await User.findOneAndUpdate(
          { _id: decode.id },
          {
            $set: {
              "profile.profileImage": image
            }, 
            $push : {
                "profile.allProfileImages": image
            }
          },
          { new: true }
        );
        res.status(200).json({
          message: "Profile Picture changed!"
        });
      }
      if (type === "coverpic") {
        await User.findOneAndUpdate(
          { _id: decode.id },
          {
            $set: {
              "profile.coverImage": image
            }
          },
          { new: true }
        );
        res.status(200).json({
          message: "Cover Picture changed!"
        });
      }
    } else {
      res.status(403).json({
        message: "No web token found!"
      });
    }
  } else {
    return res.status(400).json({ message: "Invalid Request Method" });
  }
}
