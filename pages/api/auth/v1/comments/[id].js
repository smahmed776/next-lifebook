import dbConnect from "../../../../../server/db/dbConnect";
import Posts from "../../../../../server/schemas/postSchema";
import User from "../../../../../server/schemas/UserSchema";

export default async function handlecomment(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    const { id } = req.query;
    if (id) {
      try {
        const findPost = await Posts.findOne({ _id: id }, ["reactions.comments"]);
        if(findPost){
            let userArr = [];
            for (let index = 0; index < findPost.reactions.comments.length; index++) {
              const element = findPost.reactions.comments[index];
              const findUser = await User.findOne({ _id: element.c_id });
              if(findUser){
                  userArr.push({
                    name: findUser.name,
                    image: findUser.profile.profileImage,
                    text: element.text,
                    created: element.created,
                    c_id: element.c_id
                    
                  });
              }
            }
            res.status(200).json(userArr);
        } else {
            res.status(200).json([])
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({
          error,
          message: "internal server error"
        });
      }
    }
  } else {
    return res.status(405).json({ message: "Invalid Request Method" });
  }
}
