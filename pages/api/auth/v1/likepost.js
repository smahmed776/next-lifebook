import dbConnect from "../../../../server/db/dbConnect";
import Posts from "../../../../server/schemas/postSchema";

export default async function handleLogin(req, res) {
  await dbConnect();
  if (req.method === "PUT") {
    const { user_id, post_id } = req.body;
    if (user_id && post_id) {
      try {
        const checkReaction = await Posts.findOne({ _id: post_id });
        if (checkReaction.reactions.likes.includes(user_id)) {
          res.status(200).json({ message: "already liked" });
        } else {
          await Posts.findOneAndUpdate(
            { _id: post_id },
            {
              $push: {
                "reactions.likes": user_id
              }
            },
            {
              new: true
            }
          );
          res.status(200).json({
            message: "liked"
          })
          res.end()
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
