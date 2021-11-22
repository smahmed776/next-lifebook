import dbConnect from "../../../../server/db/dbConnect";
import Posts from "../../../../server/schemas/postSchema";

export default async function handleLogin(req, res) {
  await dbConnect();
  if (req.method === "PUT") {
    const { c_id, post_id, text, image } = req.body;
    if (c_id && post_id) {
      try {
        await Posts.findOneAndUpdate(
          { _id: post_id },
          {
            $push: {
              "reactions.comments": {
                  c_id,
                  text,
                  created: Date.now(),
                  image: image && image || null,
                  reactions: {
                      likes: [],
                      replies: []
                  }
              }
            },
          },
          {
            new: true,
          }
        );
        res.status(200).json({
          message: "commented",
        });
        res.end();
      } catch (error) {
        console.log(error);
        res.status(400).json({
          error,
          message: "internal server error",
        });
      }
    } else {
      return res.status(404).json({ message: "Missing Informations!" });
    }
  } else {
    return res.status(405).json({ message: "Invalid Request Method" });
  }
}
