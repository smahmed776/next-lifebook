import Head from "next/head";
import { Fragment } from "react";
import ProfilePage from "../../components/Sections/profile/ProfilePage"
import Header from "../../components/Header/Header"
import dbConnect from "../../server/db/dbConnect";
import User from "../../server/schemas/UserSchema";

export default function SingleProfile(props) {

  return (
    <Fragment>
      <Head>
        <title>
          {`${props.data.name.firstName} ${props.data.name.lastName} - Lifebook`}
        </title>
      </Head>
      {props.user && <Header user={props.user} />}
      <ProfilePage user={props.user} data={props.data} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  const { id } = context.query;
  const getUser = await User.findOne({ username: id }, [
    "name",
    "profile",
    "friends",
    "followers",
  ]);

  if (getUser) {
    const formatJson = JSON.stringify(getUser);
    const data = JSON.parse(formatJson);
    return {
      props: { data },
    };
  } else {
    if (id.length > 20) {
      const res = await User.findOne({ _id: id }, [
        "name",
        "profile",
        "friends",
        "followers",
      ]);
      if (!res) {
        return {
          notFound: true,
        };
      }
      const formatJson = JSON.stringify(res);
      const data = JSON.parse(formatJson);
      return {
        props: { data },
      };
    } else {
      return {
        notFound: true,
      };
    }
  }
}
