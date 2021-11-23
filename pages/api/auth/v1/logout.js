import cookie from 'cookie'

export default async function handleLogout(req, res){
    if(req.method === 'DELETE'){
        const options = {
            secure: process.env.NODE_ENV !== "development",
            httpOnly: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60
          };
        res.setHeader(
            "set-cookie",
            cookie.serialize("lifebook_auth_token", "esuys.sljfslfj.slkfjlskdfjlksfj", options)
          );
        res.end()
    } else {
        res.status(403).json({message: "Invalid request method!"})
    }
}