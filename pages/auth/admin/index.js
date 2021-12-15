import { Fragment, useEffect } from "react";
import Header from "../../../components/Header/Header";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router"
import SinglePost from "../../../components/SinglePost" ;

export default function AdminHandler({ user, notification }) {
  const history = useRouter()
   useEffect(()=> {
     if(user.type !== "Admin")
     history.push("/");

   })
  if(user.type === "Admin"){
    return (
    <Fragment>
      <Head>
        <title>Admin - Lifebook</title>
      </Head>
      <Header user={user} notificationCount={notification} />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-2 justify-content-center m-0 w-100">
        {/* <SinglePost user={user} post={{post: "text"}} postComments={[{text: "name"}]}/> */}
      </div>
    </Fragment>

    )
  }
  return (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-2 justify-content-center m-0 w-100">
        {/* <SinglePost user={user} post={{post: "text"}} postComments={[{text: "name"}]}/> */}
      </div>

  );
}

// export async function getServerSideProps(context) {
//   const { id } = context.query;
//   const res = await axios.get(
//     `https://lifebooksocial.herokuapp.com/api/auth/v1/singlepost/${id}`,
//     {
//       withCredentials: true,
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//     }
//   );
//   const res_comments = await axios.get(
//     `https://lifebooksocial.herokuapp.com/api/auth/v1/comments/${id}`,
//     {
//       withCredentials: true,
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//     }
//   );
//   const data = {post: res.data?.getPost, comments: res_comments.data};
//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: { data },
//   };
// }
