import dbConnect from "../../../../server/db/dbConnect";
import User from "../../../../server/schemas/UserSchema";

export default async function notification(req, res) {
  if (req.method === "GET") {
    await dbConnect();
    const authHeader = req.headers["authorization"];
    const buddy_id = authHeader && authHeader.split(" ")[1];
    const buddy_id_2 = authHeader && authHeader.split(" ")[2];
    if (buddy_id !== "undefined" && buddy_id_2 !== "undefined") {
      const userinfo = await User.findOne({ _id: buddy_id }, [
        "name",
        "username",
      ]);
      const userinfo_2 = await User.findOne({ _id: buddy_id_2 }, [
        "name",
        "username",
      ]);
      res.status(200).json({
        users: [
          {
            name: userinfo.name,
            username: userinfo.username,
          },
          {
            name: userinfo_2.name,
            username: userinfo_2.username,
          },
        ],
      });
    } else {
      const userinfo = await User.findOne({ _id: buddy_id }, [
        "name",
        "username",
      ]);
      res.status(200).json({
        users: [
          {
            name: userinfo.name,
            username: userinfo.username,
          },
        ],
      });
    }
  } else {
    return res.status(400).json({ message: "Invalid Request Method" });
  }
}
