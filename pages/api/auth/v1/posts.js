import dbConnect from "../../../../server/db/dbConnect";
import Posts from "../../../../server/schemas/postSchema"


export default async function getUser(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const getPosts = await Posts.find();
    if (getPosts.length > 0) {
      const findPosts = getPosts.reverse()
      res.status(200).json({
        findPosts,
        message: "Posts Found"
      });
    } else {
      res.status(403).json({ message: "No post found" });
    }
  } else {
    res.status(405).json({
      message: "Invalid request method!"
    });
  }
}
