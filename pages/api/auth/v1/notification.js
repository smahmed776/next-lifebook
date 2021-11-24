import cookie from "cookie";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../server/db/dbConnect";
import Notification from "../../../../server/schemas/NotificationSchema";

const JWT_SECRET = "salksfhklaskdjfkshalkjfjlasdlfs";

export default async function notification(req, res) {
  if (req.method === "GET") {
    await dbConnect();
    const isCookie = cookie.parse(req.headers.cookie);
    const jsonToken = isCookie && isCookie.lifebook_auth_token;
    if (jsonToken) {
      let decode;
      await jwt.verify(jsonToken, JWT_SECRET, (err, data) => {
        if (err) {
          return res.status(403).json({
            message: "invalid web token",
          });
        }
        decode = data;
      });
      if (decode) {
        const getNotification = await Notification.findOne({ user_id: decode.id });
        if (getNotification) {
          res.status(200).json(getNotification);
        }
      }
    } else {
      res.status(403).json({
        message: "No web token found!",
      });
    }
  } else {
    return res.status(400).json({ message: "Invalid Request Method" });
  }
}
