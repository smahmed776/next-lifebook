import dbConnect from "../../../../server/db/dbConnect";
import User from "../../../../server/schemas/UserSchema";
import Posts from "../../../../server/schemas/postSchema";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    const {
      author_id,
      author_username,
      author_name,
      author_image,
      post,
      image,
      privacy
    } = req.body;

    if (
      author_id &&
      author_username &&
      author_name &&
      author_image &&
      privacy
    ) {
      if (post || image) {
        try {
          const newPost = await new Posts({
            author_id,
            author_username,
            author_name,
            author_image,
            privacy,
            post: {
              text: post,
              images: image
            },
          });
          await newPost.save();
          await User.findOneAndUpdate(
              {_id: author_id},
              {
                  $push: {
                      "profile.posts": {
                        post_id: newPost._id,
                        author_id,
                        author_username,
                        author_name,
                        author_image,
                        privacy,
                        post: {
                          text: post,
                          images: image
                        },

                      }
                  }
              }
          )

          res
            .status(200)
            .json({ message: "Post Created Successfully", newPost });
        } catch (error) {
          res.status(400).json({ error, errors: ["Could not create Post"] });
        }
    } else {
          res.status(403).json({ error, errors: ["Empty Post"] });
      }
    } else {
      return res.status(404).json({ errors: ["Missing informations!"] });
    }
  } else {
    res.status(404).json({ message: "Invalid method" });
  }
}
