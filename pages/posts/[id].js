import { Fragment } from "react";
import Header from "../../components/Header/Header";
import dbConnect from "../../server/db/dbConnect";
import Posts from "../../server/schemas/UserSchema"

export default function PostHandler({user, data}){
    console.log(data, user);
    return (
        <Fragment>
            <Header user={user} />
            <div>Hi there</div>
        </Fragment>
    )
}

export async function getServerSideProps(context){
    await dbConnect();
    const { id } = context.query;
    const getPost = await Posts.findOne({_id: id }, ["author_id"]);
    const formatJson = JSON.stringify(getPost);
    const data = JSON.parse(formatJson);
    if(!data){
        return {
            notFound: true
        }
    }
    return {
        props: {data}
    }
}