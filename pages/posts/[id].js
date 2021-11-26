import { Fragment, useEffect } from "react";
import API from "../../components/API/API";
import Header from "../../components/Header/Header";
import axios from "axios";
import Post from "../../components/Sections/newsfeed/Post";
import GetPosts from "../../components/Sections/newsfeed/GetPosts";

export default function PostHandler({ user, data }) {
  console.log(data);
  return (
    <Fragment>
      <Header user={user} />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-content-center m-0 w-100">
        <GetPosts user={user} post={data} />
      </div>
      {/* <Post data={data} user={user}/> */}
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await axios.get(
    `http://localhost:5000/api/auth/v1/singlepost/${id}`,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  const data = res.data?.getPost;
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };
}
