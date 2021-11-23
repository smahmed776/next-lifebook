import dbConnect from "../../../../../server/db/dbConnect";
import Posts from "../../../../../server/schemas/postSchema";
import User from "../../../../../server/schemas/UserSchema";

export default async function handleDeletePost(req, res) {
  await dbConnect();
  if (req.method === "DELETE") {
    const { id } = req.query;
    if (id) {
      try {
        const deletePost = await Posts.findOneAndDelete({ _id: id });
        if (deletePost) {
          await User.updateOne(
            { _id: deletePost.author_id },
            {
              $pull: {
                "profile.posts": {post_id: deletePost._id.toString()},
              },
            },
            {
              new: true,
              safe: true,
            }
          );
          res.status(200);
          res.end();
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({
          error,
          message: "internal server error",
        });
      }
    }
  } else {
    return res.status(405).json({ message: "Invalid Request Method" });
  }
}
