import User from "../../../../../server/schemas/UserSchema"
import dbConnect from "../../../../../server/db/dbConnect"

export default async function userimage(req, res){
    if(req.method === "GET"){
        const { id } = req.query;
        if(id){
            await dbConnect()
            const findUser = await User.findOne({_id: id }, ["profile.profileImage"]);
            if(findUser){
                res.status(200).json(findUser)
            }
        }
    } else {
        res.status(403).json({message: "Invalid request method"})
    }
}